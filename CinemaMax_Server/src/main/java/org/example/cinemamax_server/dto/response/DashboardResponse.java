package org.example.cinemamax_server.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DashboardResponse {
    DashboardStatisticsResponse statistics;
    List<UserDashboardResponse> latestUsers;
    List<MovieDashboardResponse> latestMovies;
    List<MovieDashboardResponse> topRatedMovies;
    List<MovieLatestRatedResponse> latestRatedMovies;
}
