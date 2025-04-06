package org.example.cinemamax_server.controller;

import jakarta.mail.MessagingException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.cinemamax_server.dto.request.ContactRequest;
import org.example.cinemamax_server.dto.response.ApiResponse;
import org.example.cinemamax_server.exception.AppException;
import org.example.cinemamax_server.exception.ErrorCode;
import org.example.cinemamax_server.service.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ContactController {
    EmailService emailService;

    @PostMapping("/contact")
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<?> sendEmail(@RequestBody ContactRequest request, Authentication authentication) throws MessagingException {
        if (request == null ||
                request.getName() == null || request.getName().trim().isEmpty() ||
                request.getEmail() == null || request.getEmail().trim().isEmpty() ||
                request.getSubject() == null || request.getSubject().trim().isEmpty() ||
                request.getMessage() == null || request.getMessage().trim().isEmpty()) {
            throw new AppException(ErrorCode.DATA_NOT_COMPLETE);
        }

        // Check if the user is authenticated
        if (authentication == null || authentication.getName() == null) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        try {
            emailService.sendContactEmail(request);
            return ApiResponse.builder()
                    .result("Email đã được gửi thành công!")
                    .build();
        } catch (MessagingException e) {
            throw new AppException(ErrorCode.EMAIL_SEND_FAILED);
        }
    }
}
