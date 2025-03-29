package org.example.cinemamax_server.scheduler;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.example.cinemamax_server.service.UserSubscriptionsService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;

@Component
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Data
public class SubscriptionScheduler {

    UserSubscriptionsService userSubscriptionService;

    public SubscriptionScheduler(UserSubscriptionsService userSubscriptionService) {
        this.userSubscriptionService = userSubscriptionService;
    }

    // Chạy lúc 00:00 mỗi ngày để cập nhật gói hết hạn
    @Scheduled(cron = "0 0 0 * * ?")
    public void checkExpiredSubscriptions() {
        userSubscriptionService.updateExpiredSubscriptions();
    }
}

