package org.example.cinemamax_server.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.cinemamax_server.dto.response.ApiResponse;
import org.example.cinemamax_server.dto.response.RoleResponse;
import org.example.cinemamax_server.service.RoleService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RolesController {
    RoleService roleService;
    @GetMapping("/admin/role")
    public ApiResponse<List<RoleResponse>> getRoles() {
        // Gọi service để tạo người dùng mới
        List<RoleResponse> role = roleService.getRole();
        return ApiResponse.<List<RoleResponse>>builder()
                .message("Lấy danh sách role thành công")
                .result(role)
                .build();
    }
}
