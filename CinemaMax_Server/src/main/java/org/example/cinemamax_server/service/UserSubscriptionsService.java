package org.example.cinemamax_server.service;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.cinemamax_server.entity.Subscriptions;
import org.example.cinemamax_server.entity.User;
import org.example.cinemamax_server.entity.UserSubscriptions;
import org.example.cinemamax_server.exception.AppException;
import org.example.cinemamax_server.exception.ErrorCode;
import org.example.cinemamax_server.repository.UserSubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
@Data
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserSubscriptionsService {
    UserSubscriptionRepository userSubscriptionRepository;
    SubscriptionsService subscriptionsService;

    public boolean addUserSubscriptions(User user) {
        UserSubscriptions userAdd = new UserSubscriptions();
        userAdd.setUser(user);
        Subscriptions subscriptions = subscriptionsService.getSubscriptionsFree(1);
        userAdd.setSubscription(subscriptions);
        userAdd.setStartDate(LocalDateTime.now());
        userAdd.setEndDate(LocalDateTime.now().plusDays(7));
        userAdd.setStatus(UserSubscriptions.Status.ACTIVE);

        // Lưu vào DB
        UserSubscriptions savedUserSubscription = userSubscriptionRepository.save(userAdd);

        // Kiểm tra nếu lưu thành công (có ID)
        return savedUserSubscription.getId() != null;
    }

    public UserSubscriptions getActiveSubscription(Long userId) {
        return userSubscriptionRepository.findByUserIdAndStatus(userId, UserSubscriptions.Status.ACTIVE)
                .orElseThrow(() -> new AppException(ErrorCode.SUBSCRIPTION_NOT_FOUND));
    }

    // Cập nhật trạng thái subscription hết hạn
    @Transactional
    public void updateExpiredSubscriptions() {
        List<UserSubscriptions> expiredSubscriptions =
                userSubscriptionRepository.findByEndDateBeforeAndStatus(LocalDateTime.now(), UserSubscriptions.Status.ACTIVE);
        for (UserSubscriptions sub : expiredSubscriptions) {
            sub.setStatus(UserSubscriptions.Status.EXPIRED);
            userSubscriptionRepository.save(sub);
            System.out.println("Cập nhật gói hết hạn: " + sub.getId());
        }
    }



}
