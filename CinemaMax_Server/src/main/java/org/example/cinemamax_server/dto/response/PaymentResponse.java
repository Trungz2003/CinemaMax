package org.example.cinemamax_server.dto.response;

import com.paypal.api.payments.Payment;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class PaymentResponse {
    String id;
    String state;
    String createTime;
    String updateTime;

    // Constructor nhận Payment
    public PaymentResponse(Payment payment) {
        this.id = payment.getId();
        this.state = payment.getState();
        this.createTime = payment.getCreateTime();
        this.updateTime = payment.getUpdateTime();
    }
}
