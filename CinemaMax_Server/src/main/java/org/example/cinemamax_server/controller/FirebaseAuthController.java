package org.example.cinemamax_server.controller;

import com.nimbusds.jose.JOSEException;
import io.micrometer.common.util.StringUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.cinemamax_server.dto.request.AuthenticationRequest;
import org.example.cinemamax_server.dto.request.UserRequest;
import org.example.cinemamax_server.dto.response.ApiResponse;
import org.example.cinemamax_server.dto.response.AuthenticationResponse;
import org.example.cinemamax_server.dto.response.UserResponse;
import org.example.cinemamax_server.exception.AppException;
import org.example.cinemamax_server.exception.ErrorCode;
import org.example.cinemamax_server.service.AuthenticationService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FirebaseAuthController {
    AuthenticationService service;

    @PostMapping("/login-gg")
    ApiResponse<UserResponse> authenticate(@RequestBody UserRequest request)
            throws Exception {
        var result = service.loginWithGG(request.getToken());
        return ApiResponse.<UserResponse>builder().result(result).build();
    }
}
