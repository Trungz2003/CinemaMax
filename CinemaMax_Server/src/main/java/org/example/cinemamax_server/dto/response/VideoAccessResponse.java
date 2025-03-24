package org.example.cinemamax_server.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.cinemamax_server.entity.Subscriptions;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class VideoAccessResponse {
    IntrospectResponse introspectResponse;
    Subscriptions subscriptions;
}
