package org.example.cinemamax_server.repository;

import org.example.cinemamax_server.entity.UserSubscriptions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserSubscriptionRepository extends JpaRepository<UserSubscriptions, Integer> {
    void deleteByUserId(int userId);

    Optional<UserSubscriptions> findByUserId(Long userId);

    // Tìm gói đăng ký đang hoạt động của user
    Optional<UserSubscriptions> findByUserIdAndStatus(Long userId, UserSubscriptions.Status status);

    List<UserSubscriptions> findByEndDateBeforeAndStatus(LocalDateTime endDate, UserSubscriptions.Status status);
}