package org.example.cinemamax_server.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;
import java.util.logging.Level;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UpdateUserByIdResponse {
    int id;
    String userName;
    String email;
    String fullName;
    String thumbnail;
    String status;
    String subscriptionName;
    String roles;
}
