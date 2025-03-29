package org.example.cinemamax_server.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class PaymentRequestDTO {
    String name;
    String email;
    String packageName;
    String paymentMethod;
}
