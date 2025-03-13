package org.example.cinemamax_server.service;


import lombok.AccessLevel;
import lombok.Builder;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.cinemamax_server.dto.response.RoleResponse;
import org.example.cinemamax_server.entity.Role;
import org.example.cinemamax_server.repository.RoleRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Builder
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleService {
    RoleRepository roleRepository;
    @PreAuthorize("hasRole('ADMIN')")
    public List<RoleResponse> getRole() {
        List<Role> roles = roleRepository.findAll();

        // Chuyển đổi danh sách Role thành RoleResponse
        return roles.stream()
                .map(role -> new RoleResponse(role.getName()))
                .toList();
    }
}
