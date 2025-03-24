package org.example.cinemamax_server.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.cinemamax_server.entity.Genre;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MovieDTO {
    Long id;
    String title;
    String description;
    LocalDate releaseDate;
    Integer duration;
    String videoUrl;
    String thumbnail;
    String actor;
    String cast;
    String country;
    Integer view;
    List<GenreResponse> genres;
    Float averageRating;
    Boolean isFavorite; // ✅ Thêm trạng thái yêu thích
}
