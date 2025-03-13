package org.example.cinemamax_server.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.cinemamax_server.dto.response.ApiResponse;
import org.example.cinemamax_server.dto.response.NameSubscriptionResponse;
import org.example.cinemamax_server.dto.response.RoleResponse;
import org.example.cinemamax_server.entity.Subscriptions;
import org.example.cinemamax_server.service.SubscriptionsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SubscriptionController {
    SubscriptionsService subscriptionsService;

    @GetMapping("/admin/subscription")
    public ApiResponse<List<NameSubscriptionResponse>> getRoles() {
        // Gọi service để tạo người dùng mới
        List<NameSubscriptionResponse> role = subscriptionsService.getAllSubscriptions();
        return ApiResponse.<List<NameSubscriptionResponse>>builder()
                .message("Lấy danh sách các gói đăng kí thành công")
                .result(role)
                .build();
    }
}
