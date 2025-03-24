package org.example.cinemamax_server.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.cinemamax_server.entity.Movies;
import org.example.cinemamax_server.entity.Subscriptions;
import org.example.cinemamax_server.entity.UserSubscriptions;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProfileResponse {
    UserResponse user;
    int totalCommentUser;
    int totalRatingUser;
    Subscriptions userSubscriptions;
    List<MovieDashboardResponse> topRatedMovies;
    List<MovieLatestRatedResponse> latestRatedMovies;
    List<MovieDTO> favoriteMovies;

}
