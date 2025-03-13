package org.example.cinemamax_server.controller;

import com.nimbusds.jose.JOSEException;
import io.micrometer.common.util.StringUtils;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.cinemamax_server.dto.request.AuthenticationRequest;
import org.example.cinemamax_server.dto.request.IntrospectRequest;
import org.example.cinemamax_server.dto.request.LogoutRequest;
import org.example.cinemamax_server.dto.request.RefreshRequest;
import org.example.cinemamax_server.dto.response.ApiResponse;
import org.example.cinemamax_server.dto.response.AuthenticationResponse;
import org.example.cinemamax_server.dto.response.IntrospectResponse;
import org.example.cinemamax_server.exception.AppException;
import org.example.cinemamax_server.exception.ErrorCode;
import org.example.cinemamax_server.service.AuthenticationService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.text.ParseException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {

    AuthenticationService service;
    @PostMapping("/login")
    ApiResponse<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request)
            throws ParseException, JOSEException {
        if (StringUtils.isEmpty(request.getEmail()) ||
                StringUtils.isEmpty(request.getPassword())) {
            throw new AppException(ErrorCode.DATA_NOT_COMPLETE);
        }
        var result = service.authenticate(request);
        return ApiResponse.<AuthenticationResponse>builder().result(result).build();
    }


    @PostMapping("/introspect")
    public ApiResponse<IntrospectResponse> authenticate(@RequestHeader("Authorization") String authorizationHeader)
            throws ParseException, JOSEException {
        // Loại bỏ tiền tố "Bearer " để lấy token thực
        String token = authorizationHeader.replace("Bearer ", "");

        // Gọi hàm introspect với token
        var result = service.introspect(new IntrospectRequest(token));

        return ApiResponse.<IntrospectResponse>builder().result(result).build();
    }

//    @PostMapping("/logout")
//    ApiResponse<Void> logout(@RequestBody LogoutRequest request) throws ParseException, JOSEException {
//        service.logout(request);
//        return ApiResponse.<Void>builder().build();
//    }

    @PostMapping("/logout")
    public ApiResponse<Void> logout(HttpServletRequest request) throws ParseException, JOSEException {
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tiêu đề ủy quyền bị thiếu hoặc không hợp lệ");
        }

        String token = authHeader.substring(7); // Cắt bỏ "Bearer "
        // Tạo đối tượng LogoutRequest
        LogoutRequest logoutRequest = new LogoutRequest(token);
        service.logout(logoutRequest);

        return ApiResponse.<Void>builder()
                .message("Logged out successfully")
                .code(HttpStatus.OK.value())
                .build();
    }



    @PostMapping("/refresh")
    public ApiResponse<AuthenticationResponse> refreshToken(HttpServletRequest request)
            throws ParseException, JOSEException {
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing or invalid Authorization header");
        }

        String refreshToken = authHeader.substring(7); // Cắt bỏ "Bearer "
        RefreshRequest refreshRequest = new RefreshRequest(refreshToken);
        var result = service.refreshToken(refreshRequest); // Gọi service với refresh token

        return ApiResponse.<AuthenticationResponse>builder().result(result).build();
    }

}
