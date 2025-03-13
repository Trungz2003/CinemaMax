package org.example.cinemamax_server.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AdminAddUserRequest {
    @Email(message = "Email không hợp lệ")
    @NotBlank(message = "Email không được để trống")
    String email;

    @NotBlank(message = "Password không được để trống")
    String password;

    @NotBlank(message = "Subscription không được để trống")
    String subscription;

    @NotBlank(message = "Role không được để trống")
    String role;

}
