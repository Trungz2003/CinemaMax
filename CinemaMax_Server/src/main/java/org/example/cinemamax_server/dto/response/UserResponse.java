
package org.example.cinemamax_server.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.cinemamax_server.entity.Role;
import org.example.cinemamax_server.enums.Status;

import java.time.LocalDate;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserResponse {
    String email;
    String fullName;
    String password;
    Status status;
    String thumbnail;
    String token;
    String userName;
    Role role;
}
