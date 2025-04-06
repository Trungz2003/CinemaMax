package org.example.cinemamax_server.configuration;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.example.cinemamax_server.constant.PredefinedRole;
import org.example.cinemamax_server.entity.Role;
import org.example.cinemamax_server.entity.Subscriptions;
import org.example.cinemamax_server.entity.User;
import org.example.cinemamax_server.entity.UserSubscriptions;
import org.example.cinemamax_server.exception.AppException;
import org.example.cinemamax_server.exception.ErrorCode;
import org.example.cinemamax_server.repository.RoleRepository;
import org.example.cinemamax_server.repository.SubscriptionsRepository;
import org.example.cinemamax_server.repository.UserRepository;
import org.example.cinemamax_server.repository.UserSubscriptionRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;

import static org.example.cinemamax_server.enums.Status.ACTIVE;

@Slf4j
@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ApplicationInitConfig {
    PasswordEncoder passwordEncoder;
    UserSubscriptionRepository userSubscriptionRepository;
    SubscriptionsRepository subscriptionsRepository;

    @Value("${admin.email}")
    @NonFinal
    String adminEmail;

    @Value("${admin.password}")
    @NonFinal
    String adminPassword;

    @Value("${admin.username}")
    @NonFinal
    String adminUsername;

    @Bean
    @Transactional
    ApplicationRunner applicationRunner(UserRepository userRepository, RoleRepository roleRepository) {
        return args -> {
            if (userRepository.findByEmail(adminEmail).isEmpty()) {
                log.info("Admin user does not exist. Creating default admin...");

                roleRepository.save(Role.builder()
                        .name(PredefinedRole.USER_ROLE)
                        .description("User role")
                        .build());

                Role adminRole = roleRepository.save(Role.builder()
                        .name(PredefinedRole.ADMIN_ROLE)
                        .description("Admin role")
                        .build());

                var roles = new HashSet<Role>();
                roles.add(adminRole);

                User user = User.builder()
                        .email(adminEmail)
                        .password(passwordEncoder.encode(adminPassword))
                        .userName(adminUsername)
                        .roles(roles)
                        .enabled(true)
                        .status(ACTIVE)
                        .createdAt(LocalDateTime.now())
                        .build();

                userRepository.save(user);

                Subscriptions subscription = subscriptionsRepository.findByName("Cinematic")
                        .orElseThrow(() -> new AppException(ErrorCode.SUBSCRIPTION_NOT_FOUND));

                LocalDateTime startDate = LocalDateTime.now();
                LocalDateTime endDate = startDate.plusDays(subscription.getDuration());

                UserSubscriptions userSubscription = UserSubscriptions.builder()
                        .user(user)
                        .subscription(subscription)
                        .startDate(startDate)
                        .endDate(endDate)
                        .status(UserSubscriptions.Status.ACTIVE)
                        .build();

                userSubscriptionRepository.save(userSubscription);
            } else {
                log.info("Admin user already exists. Skipping initialization.");
            }
        };
    }
}
