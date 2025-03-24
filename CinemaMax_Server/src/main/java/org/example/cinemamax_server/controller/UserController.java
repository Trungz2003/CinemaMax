package org.example.cinemamax_server.controller;

import com.google.api.gax.rpc.ApiException;
import io.micrometer.common.util.StringUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.cinemamax_server.dto.request.*;
import org.example.cinemamax_server.dto.response.*;
import org.example.cinemamax_server.entity.User;
import org.example.cinemamax_server.enums.Status;
import org.example.cinemamax_server.exception.AppException;
import org.example.cinemamax_server.exception.ErrorCode;
import org.example.cinemamax_server.service.UserService;
import org.example.cinemamax_server.service.UserSubscriptionsService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
    UserService service;
    private final UserService userService;


    //1
    @PostMapping("/users/add")
    public ApiResponse<UserResponse> createUser(@RequestBody UserRequest request) {

        // Kiểm tra xem provider có null không. Nếu không có provider, kiểm tra các trường bắt buộc.
        if(request.getProvider() == null){
            if (StringUtils.isEmpty(request.getUserName()) ||
                    StringUtils.isEmpty(request.getEmail()) ||
                    StringUtils.isEmpty(request.getPassword())) {
                throw new AppException(ErrorCode.DATA_NOT_COMPLETE); // Ném ngoại lệ nếu thiếu dữ liệu
            }
        }

        // Gọi service để tạo người dùng mới
        UserResponse userResponse = service.createUser(request);

        // Tạo ApiResponse với mã lỗi 1000 và thông báo đăng ký thành công
        ApiResponse<UserResponse> response = ApiResponse.<UserResponse>builder()
                .code(1000)
                .message("Đăng ký thành công, vui lòng kiểm tra email để kích hoạt tài khoản!")
                .result(userResponse)
                .build();

        return response;
    }

    @PostMapping("/admin/add")
    public ApiResponse<Boolean> adminCreateUser(@RequestBody AdminAddUserRequest request) {
        // Gọi service để tạo người dùng mới
        var response = service.adminCreateUser(request);

        // Tạo ApiResponse với mã lỗi 1000 và thông báo đăng ký thành công
        return ApiResponse.<Boolean>builder()
                .message("Đăng ký thành công tài khoản!")
                .result(response)
                .build();
    }

    @GetMapping("/users")
    public ApiResponse<DataUserAdminResponse> getAllUser() {
        return ApiResponse.<DataUserAdminResponse>builder()
                .code(1000) // Mã code mặc định
                .result(service.getAllUsers()) // Lấy danh sách UserResponse từ service
                .build();
    }

    @GetMapping("/admin/info/{email}")
    public ApiResponse<InfoAdminMenuResponse> getAdminMenu(@PathVariable String email) {
        var response = userService.getInfoAdminMenu(email);
        return  ApiResponse.<InfoAdminMenuResponse>builder()
                .message("Lấy thông tin user thành công!")
                .result(response)
                .build();
    }

    @GetMapping("user/userProfile")
    public ApiResponse<ProfileResponse> getUserProfile(Authentication authentication) {
        String email = authentication.getName(); // Lấy email từ JWT token

        ProfileResponse user = service.getUserProfile(email);
        return ApiResponse.<ProfileResponse>builder()
                .result(user)
                .build();
    }


    @DeleteMapping("/admin/{userId}")
    ApiResponse<String> deleteUser(@PathVariable int userId) {
        service.deleteUser(userId);
        return ApiResponse.<String>builder().result("User has been deleted").build();
    }

    @PutMapping("/admin/{userId}")
    ApiResponse<UpdateUserByIdResponse> adminUpdateUser(@PathVariable int userId, @RequestBody UserUpdateRequest request) {
        return ApiResponse.<UpdateUserByIdResponse>builder()
                .result(service.adminUpdateUser(userId, request))
                .build();
    }

    @PutMapping("/user")
    ApiResponse<UpdateUserByIdResponse> userUpdateUser(@RequestBody UserUpdateRequest request,
                                                       Authentication authentication) {
        String emailFromToken = authentication.getName(); // Lấy email từ JWT token
        String emailFromRequest = request.getEmail(); // Lấy email từ request
        // Kiểm tra email trong request có khớp với email từ token không
        if (!emailFromToken.equals(emailFromRequest)) {
            throw new AppException(ErrorCode.EMAIL_NOT_MATCH);
        }
        return ApiResponse.<UpdateUserByIdResponse>builder()
                .result(service.userUpdateUser(emailFromRequest, request))
                .build();
    }

    @GetMapping("/admin/userDetails/{id}")
    public ApiResponse<UserDetailsResponse> getUserDetails(@PathVariable int id) {
        UserDetailsResponse response = service.getUserDetails(id);
        return ApiResponse.<UserDetailsResponse>builder()
                .message("Lấy thông tin user thành công")
                .result(response)
                .build();
    }

    @GetMapping("/users/verify-email")
    public ResponseEntity<String> verifyEmail(@RequestParam String email) {
        // Chỉ gọi userRepository.findByEmail(email) 1 lần duy nhất
        User user = service.getUserLocal(email);

        return service.verifyUser(user);
    }

    @PutMapping("/admin/status/{userId}")
    ApiResponse<Status> updateUserStatus(@PathVariable int userId){
        return ApiResponse.<Status>builder()
                .result(service.Status(userId))
                .build();
    }

    // API reset mật khẩu
    @PostMapping("/users/reset-password")
    public ApiResponse<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        boolean isPassword = service.resetPassword(request.getEmail());  // Gọi service để reset mật khẩu

        if (isPassword) {
            // Gửi email chứa mật khẩu mới (có thể thêm một service gửi email vào đây)
            return ApiResponse.<String>builder()
                    .code(1000)
                    .message("Mật khẩu mới đã được gửi đến email của bạn.")
                    .result("True")
                    .build();
        } else {
            return ApiResponse.<String>builder()
                    .code(400)
                    .message("Email không tồn tại hoặc chưa được kích hoạt trong hệ thống!")
                    .result("Failed")
                    .build();
        }
    }

    @PutMapping("/update-password/{userId}")
    public ApiResponse<Boolean> updateUserPassword(
            @PathVariable int userId,
            @RequestBody UpdatePasswordRequest request) {

        var status = service.updatePassword(userId, request.getPasswordOld(), request.getPasswordNew());

        return ApiResponse.<Boolean>builder()
                .result(status)
                .build();
    }

    @PostMapping("/admin/sendAllEmail")
    public ApiResponse<Boolean> sendNotification(@RequestBody SendMailUpdateRequest request) {
        var status = userService.sendUpdateAlluser(request); // Lấy danh sách email từ DB

        return ApiResponse.<Boolean>builder()
                .result(status)
                .build();
    }

}
