package org.example.cinemamax_server.service;
import com.google.firebase.auth.FirebaseToken;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.example.cinemamax_server.constant.PredefinedRole;
import org.example.cinemamax_server.dto.request.*;
import org.example.cinemamax_server.dto.response.AuthenticationResponse;
import org.example.cinemamax_server.dto.response.IntrospectResponse;
import org.example.cinemamax_server.dto.response.UserResponse;
import org.example.cinemamax_server.entity.*;
import org.example.cinemamax_server.enums.Status;
import org.example.cinemamax_server.exception.AppException;
import org.example.cinemamax_server.exception.ErrorCode;
import org.example.cinemamax_server.mapper.UserMapper;
import org.example.cinemamax_server.repository.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.server.ResponseStatusException;

import java.text.ParseException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
    UserRepository repository;
    InvalidatedTokenRepository invalidatedTokenRepository;
    UserMapper userMapper;
    RoleRepository roleRepository;
    FirebaseAuthService firebaseAuthService;
    SubscriptionsRepository subscriptionsRepository;
    UserSubscriptionRepository userSubscriptionRepository;

    @NonFinal
    @Value("${jwt.valid-duration}")
    protected long VALID_DURATION;

    @NonFinal
    @Value("${jwt.signerkey}")
    protected String SIGNER_KEY;

    @NonFinal
    @Value("${jwt.refreshable-duration}")
    protected long REFRESHABLE_DURATION;

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        var user = repository
                .findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        if(user.getEnabled() == false){
            throw new AppException(ErrorCode.USER_NOT_ACTIVATED);
        }

        // 🔹 Kiểm tra trạng thái
        if (user.getStatus() != Status.ACTIVE) {
            throw new AppException(ErrorCode.ACCOUNT_LOCKED);
        }

        boolean authenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());

        if (!authenticated) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        if (user.getToken() != null) {
            try {
                var signToken = verifyToken(user.getToken(), true);
                String jit = signToken.getJWTClaimsSet().getJWTID();
                Date expiryTime = signToken.getJWTClaimsSet().getExpirationTime();

                InvalidatedToken invalidatedToken =
                        InvalidatedToken.builder().id(jit).expiryTime(expiryTime).build();

                if (!invalidatedTokenRepository.existsById(jit)) {
                    invalidatedTokenRepository.save(invalidatedToken);
                    log.info("Token cũ {} đã bị vô hiệu hóa.", jit);
                }
            } catch (AppException | ParseException | JOSEException e) {
                log.error("Lỗi khi vô hiệu hóa token cũ.", e);
            }
        }

        var token = generateToken(user);
        user.setToken(token);
        repository.save(user); // 🔹 Lưu token vào database

        return AuthenticationResponse.builder()
                .authenticate(authenticated)
                .token(token)
                .build();
    }

    public UserResponse loginWithGG(String idToken) throws Exception {
        // Xác thực token Firebase
        FirebaseToken decodedToken = firebaseAuthService.verifyToken(idToken);
        String email = decodedToken.getEmail();
        String thumbnail = decodedToken.getPicture();
        String userName = (String) decodedToken.getClaims().get("name");

        // Kiểm tra xem email đã tồn tại chưa
        Optional<User> existingUser = repository.findByEmail(email);

        User user;
        if (existingUser.isPresent()) {
            user = existingUser.get();

            // Nếu provider là "system", không cho phép đăng nhập qua Google
            if ("system".equals(user.getProvider())) {
                throw new AppException(ErrorCode.EMAIL_REGISTERED_WITH_SYSTEM);
            }

            // Nếu provider là "google", cập nhật lại tài khoản
            if ("google".equals(user.getProvider())) {
                // Cập nhật thông tin nếu cần
                user.setThumbnail(thumbnail);
                user.setUserName(userName);
                user.setEnabled(true); // Đảm bảo người dùng có thể đăng nhập
                repository.save(user);
            }
        } else {
            // Nếu người dùng chưa tồn tại, tạo mới
            user = new User();
            user.setEmail(email);
            user.setProvider("google");
            user.setThumbnail(thumbnail);
            user.setUserName(userName);
            user.setEnabled(true);
            user.setCreatedAt(LocalDateTime.now());
            user.setStatus(Status.ACTIVE);


            // Tạo roles cho người dùng
            HashSet<Role> roles = new HashSet<>();
            roleRepository.findById(PredefinedRole.USER_ROLE).ifPresent(roles::add);
            user.setRoles(roles);

            // Tạo token của server
            String serverToken = generateToken(user);
            user.setToken(serverToken);

            try {
                repository.save(user);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }

            Subscriptions subscription = subscriptionsRepository.findByName("Free")
                    .orElseThrow(() -> new AppException(ErrorCode.SUBSCRIPTION_NOT_FOUND));

            LocalDateTime startDate = LocalDateTime.now();
            LocalDateTime endDate = startDate.plusDays(subscription.getDuration());

            UserSubscriptions userSubscription = UserSubscriptions.builder()
                    .user(user)
                    .subscription(subscription)
                    .startDate(startDate)
                    .endDate(endDate)
                    .status(UserSubscriptions.Status.ACTIVE)
                    .build();

            userSubscriptionRepository.save(userSubscription);
        }

        // Chuyển đổi User sang UserResponse
        return userMapper.toUserResponse(user);
    }



    private String generateToken(User user) {
        // Khởi tạo thuật toán bằng thuật toán mã hóa HS512
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        // Set các dữ liệu public ra cho người dùng
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getEmail()) // email
                .issuer("StreamPhim.net") // domain
                .issueTime(new Date()) // Thời gian tạo token
                .expirationTime(
                        new Date( // Thời gian tồn tại của token
                                Instant.now()
                                        .plus(VALID_DURATION, ChronoUnit.SECONDS)
                                        .toEpochMilli()))
                .jwtID(UUID.randomUUID().toString()) // id của token
                .claim("scope", buildScope(user)) // chức vụ của token
                .build();

        // Lớp đại diện cho nội dung token muốn truyền tải và chữ kí mã hóa
        // chuyển đổi jwtClaimsSet thành dạng json
        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        // Đại diện cho một jwt đã được kí, bao gồm thuật toán mã hóa và cách chứa token đã được kí
        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            // Kí jwt bằng thuật toán HMAC sử dụng key đã cài đặt trong application.properties
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            // Tuần tự hóa jwsObject thành 1 chuỗi string
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("Cannot create token", e);
            throw new RuntimeException(e);
        }
    }

    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException {
        var token = request.getToken();
        boolean isValid = true;

        try {
            verifyToken(token, false);
            log.info("try");
        } catch (AppException e) {
            isValid = false;
            log.info("catch");
        }
        return IntrospectResponse.builder().valid(isValid).build();
    }

    public void logout(LogoutRequest request) throws ParseException, JOSEException {
        try {

            // gửi vào hàm kiểm tra token 1 đoạn token còn thời gian
            // nếu token hợp lệ -> gán vào biến signToken
            var signToken = verifyToken(request.getToken(), true);

            // Lấy ra JWTID và thời gian tồn tại còn lại của token
            String jit = signToken.getJWTClaimsSet().getJWTID();
            Date expiryTime = signToken.getJWTClaimsSet().getExpirationTime();

            // Khởi tạo đối tượng invalidatedToken chứa các thuộc tính như jit và expiryTime
            InvalidatedToken invalidatedToken =
                    InvalidatedToken.builder().id(jit).expiryTime(expiryTime).build();

            if (invalidatedTokenRepository.existsById(jit)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token đã bị vô hiệu hóa.");
            }
            invalidatedTokenRepository.save(invalidatedToken);
        } catch (AppException exception) {
            throw exception;
        }
    }

    public AuthenticationResponse refreshToken(RefreshRequest request) throws ParseException, JOSEException {
        // Xác thực token còn hiệu lực
        var signedJWT = verifyToken(request.getToken(), true);

        // Lấy ra id và thời gian hết hạn của token
        var jit = signedJWT.getJWTClaimsSet().getJWTID();
        var expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        // Khởi tạo đối tượng invalidatedToken chứa các thuộc tính như id và thời gian hết hạn
        InvalidatedToken invalidatedToken =
                InvalidatedToken.builder().id(jit).expiryTime(expiryTime).build();

        // Lưu vào trong database
        invalidatedTokenRepository.save(invalidatedToken);

        // Lấy tên của email trong token
        var email = signedJWT.getJWTClaimsSet().getSubject();

        // Lấy user bằng phương thức tìm kiếm theo email
        var user =
                repository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));

        // Tạo 1 token mới
        var token = generateToken(user);

        // Trả về đối tượng AuthenticationResponse có các thuộc tính token(mới tạo) và authenticate(true)
        return AuthenticationResponse.builder().token(token).authenticate(true).build();
    }

    private SignedJWT verifyToken(String token, boolean isRefresh) throws JOSEException, ParseException {
        // Tạo đối tượng jwsVerifier với một khóa bí mật(Khóa chữ kí của jwt)
        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());

        // Chuyển đổi chuỗi token thành đối tượng SingnedJWT đại diện cho jwt đã kí
        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expiryTime =
                (isRefresh) // Nếu isRefresh bằng true Thời gian tính được cộng thêm dựa trên "REFRESHABLE_DURATION"
                        ? new Date(signedJWT
                        .getJWTClaimsSet()
                        .getIssueTime()
                        .toInstant()
                        .plus(REFRESHABLE_DURATION, ChronoUnit.SECONDS)
                        .toEpochMilli())
                        : signedJWT
                        .getJWTClaimsSet()
                        .getExpirationTime(); // ngược lại thời gian hết hạn là thời gian gốc của token

        // xác minh jwt với khóa bí mật, nếu token hợp lệ, chữ kí khớp thì trả về true
        var verified = signedJWT.verify(verifier);

        // Nếu token không hợp lệ hoặc thời gian hết hạn
        if (!(verified && expiryTime.after(new Date()))) throw new AppException(ErrorCode.UNAUTHENTICATED);

        // Kiểm tra xem JWTID có tồn tại trong bảng invalidatedToken
        if (invalidatedTokenRepository.existsById(signedJWT.getJWTClaimsSet().getJWTID()))
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        // Trả ra đối tượng signedJWT
        return signedJWT;
    }
    private String buildScope(User user) {
        StringJoiner stringJoiner = new StringJoiner(" ");

        if (!CollectionUtils.isEmpty(user.getRoles()))
            user.getRoles().forEach(role -> {
                stringJoiner.add("ROLE_" + role.getName());
                if (!CollectionUtils.isEmpty(role.getPermissions()))
                    role.getPermissions().forEach(permission -> stringJoiner.add(permission.getName()));
            });

        return stringJoiner.toString();
    }
}
