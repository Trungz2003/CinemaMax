package org.example.cinemamax_server.dto.response;


import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.cinemamax_server.entity.Genre;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class GetMoviesByIdResponse {
    private String title;
    private String description;
    private LocalDate releaseDate;
    private Integer duration;
    private String videoUrl;
    private String thumbnail;
    private String actor;
    private String cast;
    private String country;
    private List<GenreResponse> genres;
}
