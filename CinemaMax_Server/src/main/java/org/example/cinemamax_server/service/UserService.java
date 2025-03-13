package org.example.cinemamax_server.service;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.cinemamax_server.constant.PredefinedRole;
import org.example.cinemamax_server.dto.request.AdminAddUserRequest;
import org.example.cinemamax_server.dto.request.SendMailUpdateRequest;
import org.example.cinemamax_server.dto.request.UserRequest;
import org.example.cinemamax_server.dto.request.UserUpdateRequest;
import org.example.cinemamax_server.dto.response.*;
import org.example.cinemamax_server.entity.*;
import org.example.cinemamax_server.enums.Status;
import org.example.cinemamax_server.exception.AppException;
import org.example.cinemamax_server.exception.ErrorCode;
import org.example.cinemamax_server.mapper.UserMapper;
import org.example.cinemamax_server.repository.*;
import org.example.cinemamax_server.utils.PasswordUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Builder
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    UserRepository userRepository;
    RoleRepository roleRepository;
    UserMapper userMapper;
    PasswordEncoder passwordEncoder;
    UserSubscriptionRepository userSubscriptionRepository;
    PaymentsRepository paymentsRepository;
    RatingsRepository ratingsRepository;
    FavoritesRepository favoritesRepository;
    CommentRepository commentRepository;
    SubscriptionsRepository subscriptionRepository;
    EmailService emailService;
    UserSubscriptionsService userSubscriptionsService;
    FirebaseStorageService firebaseStorageService;
    CloudinaryService cloudinaryService;

    public UserResponse createUser(UserRequest request) {

        // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu chưa
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_ALREADY_EXISTS); // Hoặc một mã lỗi phù hợp
        }

        // Tiến hành tạo người dùng mới
        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setStatus(Status.ACTIVE);

        HashSet<Role> roles = new HashSet<>();
        roleRepository.findById(PredefinedRole.USER_ROLE).ifPresent(roles::add);

        user.setRoles(roles);
        user.setEnabled(false);
        user.setCreatedAt(LocalDateTime.now());

        try {
            user = userRepository.save(user);
        } catch (DataIntegrityViolationException exception) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        // Gửi email xác thực ngay sau khi đăng ký
        String verificationLink = "http://localhost:8081/users/verify-email?email=" + user.getEmail();
        // Gửi email xác thực với nội dung HTML
        String emailContent = "<html><body>"
                + "<p>Chào bạn,</p>"
                + "<p>Nhấn vào <a href=\"" + verificationLink + "\">đây</a> để xác thực tài khoản của bạn.</p>"
                + "<p>Cảm ơn bạn đã đăng ký!</p>"
                + "</body></html>";
        emailService.sendEmail(user.getEmail(), "Xác thực tài khoản", emailContent);
        return userMapper.toUserResponse(user);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public boolean adminCreateUser(AdminAddUserRequest request) {
        // Kiểm tra xem email đã tồn tại chưa
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_ALREADY_EXISTS);
        }

        // Tạo user mới
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setStatus(Status.ACTIVE);

        // Xử lý role
        HashSet<Role> roles = new HashSet<>();
        if ("USER".equalsIgnoreCase(request.getRole())) {
            roleRepository.findById(PredefinedRole.USER_ROLE).ifPresent(roles::add);
        } else if ("ADMIN".equalsIgnoreCase(request.getRole())) {
            roleRepository.findById(PredefinedRole.ADMIN_ROLE).ifPresent(roles::add);
        } else {
            throw new AppException(ErrorCode.ROLE_NOT_FOUND);
        }
        user.setRoles(roles);
        user.setEnabled(true);
        user.setProvider("system");
        user.setCreatedAt(LocalDateTime.now());

        // Lưu user trước để lấy userId
        try {
            user = userRepository.save(user);  // ✅ Lưu user và nhận userId
        } catch (DataIntegrityViolationException exception) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        // ✅ Sau khi có userId, xử lý Subscription
        if (request.getSubscription() != null && !request.getSubscription().isEmpty()) {
            Subscriptions subscription = subscriptionRepository.findByName(request.getSubscription())
                    .orElseThrow(() -> new AppException(ErrorCode.SUBSCRIPTION_NOT_FOUND));

            LocalDateTime startDate = LocalDateTime.now();
            LocalDateTime endDate = startDate.plusDays(subscription.getDuration());

            UserSubscriptions userSubscription = UserSubscriptions.builder()
                    .user(user)  // Gán user đã lưu vào
                    .subscription(subscription)
                    .startDate(startDate)
                    .endDate(endDate)
                    .status(UserSubscriptions.Status.ACTIVE)
                    .build();

            userSubscriptionRepository.save(userSubscription);
        }

        return true;
    }


    @PreAuthorize("hasRole('ADMIN')")
    public DataUserAdminResponse getAllUsers() {
        List<UserSummaryResponse> lstUser = userRepository.findAllUsersWithDetails();
        int total = userRepository.countByIdNotNull();
        return new DataUserAdminResponse(lstUser, total);
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(int userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info("Authorities of the authenticated user: {}", authentication.getAuthorities());
        userSubscriptionRepository.deleteByUserId(userId);
        commentRepository.deleteByUserId(userId);
        ratingsRepository.deleteByUserId(userId);
        favoritesRepository.deleteByUserId(userId);
        paymentsRepository.deleteByUserId(userId);
        userRepository.deleteById(userId);
    }

    //@PostAuthorize("hasRole('ROLE_ADMIN') or returnObject.email == authentication.name")
    @PreAuthorize("hasRole('ADMIN')")
    public UpdateUserByIdResponse adminUpdateUser(int userId, UserUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        if (request.getFullName() != null && !request.getFullName().isEmpty()) {
            user.setFullName(request.getFullName());
        }

        if (request.getUserName() != null && !request.getUserName().isEmpty()) {
            user.setUserName(request.getUserName());
        }

        if (request.getThumbnail() != null && !request.getThumbnail().isEmpty()) {
            String oldThumbnail = user.getThumbnail();
            String newThumbnail = request.getThumbnail();
            if (!newThumbnail.equals(oldThumbnail)) {
                if (oldThumbnail != null && !oldThumbnail.isEmpty()) {
                    cloudinaryService.deleteImageByUrl(oldThumbnail);
                }
                user.setThumbnail(newThumbnail);
            }
        }

        // Khai báo biến userSubscription ngoài khối if
        UserSubscriptions userSubscription = userSubscriptionRepository.findByUserId(user.getId()).orElse(null);

        if (request.getSubscription() != null && !request.getSubscription().isEmpty()) {
            Subscriptions subscription = subscriptionRepository.findByName(request.getSubscription())
                    .orElseThrow(() -> new AppException(ErrorCode.SUBSCRIPTION_NOT_FOUND));

            LocalDateTime startDate = LocalDateTime.now();
            LocalDateTime endDate = startDate.plusDays(subscription.getDuration());

            if (userSubscription == null) {
                userSubscription = UserSubscriptions.builder()
                        .user(user)
                        .subscription(subscription)
                        .startDate(startDate)
                        .endDate(endDate)
                        .status(UserSubscriptions.Status.ACTIVE)
                        .build();
            } else {
                userSubscription.setSubscription(subscription);
                userSubscription.setStartDate(startDate);
                userSubscription.setEndDate(endDate);
                userSubscription.setStatus(UserSubscriptions.Status.ACTIVE);
            }

            userSubscriptionRepository.save(userSubscription);
        }

        if (request.getRole() != null && !request.getRole().isEmpty()) {
            Role newRole = roleRepository.findByName(request.getRole());
            if (newRole == null) {
                throw new AppException(ErrorCode.ROLE_NOT_FOUND);
            }

            roleRepository.updateUserRole(user.getId(), newRole.getName());

            // 🔥 Load lại user sau khi cập nhật role
            user = userRepository.findById(userId)
                    .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        }



        UpdateUserByIdResponse response = UpdateUserByIdResponse.builder()
                .id(user.getId().intValue())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .userName(user.getUserName())
                .status(user.getStatus().toString())
                .thumbnail(user.getThumbnail())
                .subscriptionName(userSubscription != null ? userSubscription.getSubscription().getName() : "Free") // Luôn có giá trị "Free"
                .roles(user.getRoles().stream().findFirst().map(Role::getName).orElse(null))
                .build();


        userRepository.save(user);
        return response;
    }

    public UserResponse getMyInfo() {
        var context = SecurityContextHolder.getContext();
        String email = context.getAuthentication().getName();

        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        return userMapper.toUserResponse(user);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public GetUserByIdResponse getUser(int id) {
        return userRepository.getUserById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }

    @PreAuthorize("hasRole('ADMIN')")
    public UserDetailsResponse getUserDetails(int userId) {
        GetUserByIdResponse user = userRepository.getUserById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        List<GetCommentByUserIdResponse> comments = commentRepository.findComments(userId);
        List<GetReviewsByUserIdResponse> reviews = ratingsRepository.findRevews(userId);

        return new UserDetailsResponse(user, reviews, comments);
    }

    public User getUserLocal(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }

    public ResponseEntity<String> verifyUser(User user) {
        if (user == null) {
            return createErrorResponse("Email không hợp lệ!");
        }
        // Kiểm tra nếu user đã xác thực trước đó
        if (Boolean.TRUE.equals(user.getEnabled())) {
            return createErrorResponse("Email đã được xác thực trước đó!");
        }

        // Đăng ký gói Free trước khi kích hoạt tài khoản
        boolean subscriptionAdded = userSubscriptionsService.addUserSubscriptions(user);

        if (!subscriptionAdded) {
            return ResponseEntity.internalServerError().body("Lỗi khi thêm gói Free!");
        }

        // Chỉ xác thực sau khi mọi thứ thành công
        user.setEnabled(true);
        userRepository.save(user);

        return createSuccessResponse();
    }


    public boolean resetPassword(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            if(user.get().getEnabled() == null || user.get().getEnabled() == false) {
                return false;
            }
            String newPassword = PasswordUtils.generateRandomPassword();  // Tạo mật khẩu ngẫu nhiên
            String passwordEncoded = passwordEncoder.encode(newPassword);
            userRepository.updatePassword(email, passwordEncoded);  // Cập nhật mật khẩu vào DB

            // Gửi email chứa mật khẩu mới
            String emailContent = "<html><body>"
                    + "<p>Chào bạn,</p>"
                    + "<p>Mật khẩu mới của bạn là: <strong>" + newPassword + "</strong></p>"
                    + "<p>Vui lòng sử dụng mật khẩu này để đăng nhập vào tài khoản của bạn.</p>"
                    + "<p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>"
                    + "</body></html>";

            emailService.sendEmail(user.get().getEmail(), "Mật khẩu mới", emailContent);  // Gửi email
            return true;  // Trả về mật khẩu mới để gửi email cho người dùng
        }
        return false;
    }

    public boolean updatePassword(int id, String oldPassword, String newPassword) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentEmail = authentication.getName();

        Optional<User> userOptional = userRepository.findById(id);
        if (!userOptional.isPresent()) {
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }

        User user = userOptional.get();

        // Kiểm tra nếu tài khoản là hệ thống, không cho đổi mật khẩu
        if (!"system".equalsIgnoreCase(user.getProvider())) {
            throw new AppException(ErrorCode.ACCOUNT_IS_NOT_SYSTEM_ACCOUNT);
        }

        // Kiểm tra quyền: chỉ ADMIN hoặc chủ tài khoản mới được đổi mật khẩu
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (!isAdmin && !user.getEmail().equals(currentEmail)) {
            throw new AppException(ErrorCode.RESOURCE_NOT_ALLOWED);
        }

        // Kiểm tra mật khẩu cũ
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new AppException(ErrorCode.INCORRECT_PASSWORD);
        }

        // Mã hóa mật khẩu mới và cập nhật
        String encodedNewPassword = passwordEncoder.encode(newPassword);
        userRepository.updatePassword(user.getEmail(), encodedNewPassword);

        return true;
    }

    @PostAuthorize("hasRole('ADMIN')")
    public Status Status(int id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        user.setStatus(user.getStatus() == Status.ACTIVE ? Status.INACTIVE : Status.ACTIVE);

        userRepository.save(user); // Lưu vào DB
        return user.getStatus(); // Trả về trạng thái mới
    }

    @PreAuthorize("hasRole('ADMIN')")
    public InfoAdminMenuResponse getInfoAdminMenu(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (!user.isPresent()) {
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        }
        // Assuming User entity has fields getName(), getRole(), and getImg()
        User userEntity = user.get();
        return new InfoAdminMenuResponse(
                userEntity.getUserName(),
                userEntity.getRoles(),
                userEntity.getThumbnail()
        );
    }

    @PreAuthorize("hasRole('ADMIN')")
    public boolean sendUpdateAlluser(SendMailUpdateRequest request) {
        List<String> emailList = userRepository.findAllActiveEmails();
        if (emailList.isEmpty()) {
            return false; // Không có email hợp lệ thì không gửi
        }

        // Nội dung email
        String emailContent = "<html><body>"
                + "<h1>Thông báo cập nhật website!</h1>"
                + "<p>" + request.getContent() + "</p>"
                + "<p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>"
                + "</body></html>";

        // Gửi email cho tất cả user
        emailService.sendEmails(emailList, request.getTitle(), emailContent);
        return true;
    }


    // Hàm tạo phản hồi thành công
    private ResponseEntity<String> createSuccessResponse() {
        String successHtml = "<html><head>"
                + "<meta charset='UTF-8'>"
                + "<script>"
                + "alert('Xác thực thành công! Bạn sẽ được chuyển đến trang đăng nhập.');"
                + "setTimeout(function() { window.location.href = 'http://127.0.0.1:5173/signin'; });"
                + "</script>"
                + "</head><body>"
                + "<h2>Xác thực thành công! Đang chuyển hướng đến trang đăng nhập...</h2>"
                + "</body></html>";

        return ResponseEntity.ok()
                .contentType(MediaType.TEXT_HTML)
                .body(successHtml);
    }

    private ResponseEntity<String> createErrorResponse(String message) {
        String errorHtml = "<html><head>"
                + "<meta charset='UTF-8'>"
                + "<script>"
                + "alert('" + message + "');"
                + "setTimeout(function() { window.location.href = 'http://127.0.0.1:5173/signin'; });"
                + "</script>"
                + "</head><body>"
                + "<h2>" + message + " Đang chuyển hướng...</h2>"
                + "</body></html>";

        return ResponseEntity.badRequest()
                .contentType(MediaType.TEXT_HTML)
                .body(errorHtml);
    }

}
