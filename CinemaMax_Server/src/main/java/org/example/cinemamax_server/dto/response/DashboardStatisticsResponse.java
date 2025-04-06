package org.example.cinemamax_server.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class DashboardStatisticsResponse {
    int totalUsers;
    int newUsersThisMonth;
    int totalMovies;
    int newMoviesThisMonth;
    int totalRatings;
    int newRatingsThisMonth;

    int totalViews; // Tổng lượt xem của tất cả các tháng
    double growthPercentage; // % tăng trưởng

    public DashboardStatisticsResponse(Long totalUsers, Long newUsersThisMonth,
                                       Long totalMovies, Long newMoviesThisMonth,
                                       Long totalRatings, Long newRatingsThisMonth,
                                       Long totalViews) {
        this.totalUsers = totalUsers.intValue();
        this.newUsersThisMonth = newUsersThisMonth.intValue();
        this.totalMovies = totalMovies.intValue();
        this.newMoviesThisMonth = newMoviesThisMonth.intValue();
        this.totalRatings = totalRatings.intValue();
        this.newRatingsThisMonth = newRatingsThisMonth.intValue();
        this.totalViews = totalViews.intValue();
    }

    public void setGrowthPercentage(double growthPercentage) {
        this.growthPercentage = growthPercentage;
    }
}
