package org.example.cinemamax_server.repository;

import org.example.cinemamax_server.dto.response.DashboardStatisticsResponse;
import org.example.cinemamax_server.dto.response.GetUserByIdResponse;
import org.example.cinemamax_server.dto.response.UserStatisticsResponse;
import org.example.cinemamax_server.dto.response.UserSummaryResponse;
import org.example.cinemamax_server.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.password = :password WHERE u.email = :email")
    void updatePassword(@Param("email") String email, @Param("password") String password);

    @Query(value = """
        SELECT 
            u.id AS Id,
            u.full_name AS name,
            u.email AS email,
            u.user_name AS username,
            u.status AS status,
            DATE(u.created_at) AS creationDate,
            s.name AS pricingPlan,
            COUNT(DISTINCT c.id) AS comments,
            COUNT(DISTINCT r.id) AS reviews
        FROM users u
        LEFT JOIN user_subscriptions us ON u.id = us.user_id
        LEFT JOIN subscriptions s ON us.subscription_id = s.id
        LEFT JOIN comments c ON u.id = c.user_id
        LEFT JOIN ratings r ON u.id = r.user_id
        GROUP BY u.id, s.id
        """, nativeQuery = true)
    List<UserSummaryResponse> findAllUsersWithDetails();

    @Query(value = """
    SELECT
       u.id AS id,
       u.user_name AS userName,
       u.email AS email,
       u.full_name AS fullName,
       u.thumbnail AS thumbnail,
       u.status AS status,
       COALESCE(u.status, 'INACTIVE') AS status, -- Nếu status NULL thì gán INACTIVE
       COALESCE(s.name, 'No Subscription') AS subscriptionName,
       COALESCE(GROUP_CONCAT(ur.roles_name), 'User') AS role
    FROM users u
    LEFT JOIN user_subscriptions us ON u.id = us.user_id
    LEFT JOIN subscriptions s ON us.subscription_id = s.id
    LEFT JOIN users_roles ur ON u.id = ur.user_id
    WHERE u.id = :id
    GROUP BY u.id, u.user_name, u.email, u.full_name, u.thumbnail, s.name
    """, nativeQuery = true)
    Optional<GetUserByIdResponse> getUserById(@Param("id") int id);

    int countByIdNotNull();

    @Query("""
    SELECT new org.example.cinemamax_server.dto.response.DashboardStatisticsResponse(
        (SELECT COUNT(u) FROM User u),
        (SELECT COUNT(u) FROM User u WHERE MONTH(u.createdAt) = MONTH(CURRENT_DATE) 
                                      AND YEAR(u.createdAt) = YEAR(CURRENT_DATE)),

        (SELECT COUNT(m) FROM Movies m),
        (SELECT COUNT(m) FROM Movies m WHERE MONTH(m.createdAt) = MONTH(CURRENT_DATE) 
                                        AND YEAR(m.createdAt) = YEAR(CURRENT_DATE)),

        (SELECT COUNT(r) FROM Ratings r),
        (SELECT COUNT(r) FROM Ratings r WHERE MONTH(r.createdAt) = MONTH(CURRENT_DATE) 
                                         AND YEAR(r.createdAt) = YEAR(CURRENT_DATE))
    )
""")
    DashboardStatisticsResponse getDashboardStatistics();


    @Query(value = """
        SELECT id, full_name, email, user_name 
        FROM users 
        ORDER BY created_at DESC 
        LIMIT 5
    """, nativeQuery = true)
    List<Object[]> findLatestUsers();

    @Query("SELECT u.email FROM User u WHERE u.enabled = true") // Chỉ lấy email đã kích hoạt
    List<String> findAllActiveEmails();

}
