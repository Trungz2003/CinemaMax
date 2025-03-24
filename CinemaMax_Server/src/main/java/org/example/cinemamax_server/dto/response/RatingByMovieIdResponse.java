package org.example.cinemamax_server.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RatingByMovieIdResponse {
    Float rating;
    String title;
    String content;
    LocalDateTime createdAt;
    String userName;
    String thumbnail;
}
