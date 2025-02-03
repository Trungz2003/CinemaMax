package org.example.cinemamax_server.controller;

import io.micrometer.common.util.StringUtils;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.cinemamax_server.dto.request.UserRequest;
import org.example.cinemamax_server.dto.response.ApiResponse;
import org.example.cinemamax_server.dto.response.UserResponse;
import org.example.cinemamax_server.exception.AppException;
import org.example.cinemamax_server.exception.ErrorCode;
import org.example.cinemamax_server.repository.UserRepository;
import org.example.cinemamax_server.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {
    UserService service;

    @PostMapping("/add")
    ApiResponse<UserResponse> createUser(@RequestBody UserRequest request) {

        if (StringUtils.isEmpty(request.getUserName()) ||
                StringUtils.isEmpty(request.getEmail()) ||
                StringUtils.isEmpty(request.getPassword())) {
            throw new AppException(ErrorCode.DATA_NOT_COMPLETE);
        }

        // Gọi service để tạo người dùng
        UserResponse userResponse = service.createUser(request);


        // Tạo ApiResponse với message và code mặc định là 1000
        ApiResponse<UserResponse> response = ApiResponse.<UserResponse>builder()
                .code(1000)
                .message("Success")
                .result(userResponse)
                .build();

        return response;
    }

    @GetMapping
    public ApiResponse<List<UserResponse>> getAllUser() {
        return ApiResponse.<List<UserResponse>>builder()
                .code(1000) // Mã code mặc định
                .result(service.getAllUsers()) // Lấy danh sách UserResponse từ service
                .build();
    }
}
