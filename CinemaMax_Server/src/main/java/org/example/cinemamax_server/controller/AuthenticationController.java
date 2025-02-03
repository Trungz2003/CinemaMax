package org.example.cinemamax_server.controller;

import com.nimbusds.jose.JOSEException;
import io.micrometer.common.util.StringUtils;
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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/logout")
    ApiResponse<Void> logout(@RequestBody LogoutRequest request) throws ParseException, JOSEException {
        service.logout(request);
        return ApiResponse.<Void>builder().build();
    }

    @PostMapping("/refresh")
    ApiResponse<AuthenticationResponse> authenticate(@RequestBody RefreshRequest request)
            throws ParseException, JOSEException {
        var result = service.refreshToken(request);
        return ApiResponse.<AuthenticationResponse>builder().result(result).build();
    }
}
