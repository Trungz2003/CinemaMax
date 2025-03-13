package org.example.cinemamax_server.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.cinemamax_server.entity.Genre;
import org.example.cinemamax_server.enums.MovieStatus;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class MoviesRequest {
    private String title;
    private String description;
    private LocalDate releaseDate;
    private Integer duration;
    private String videoUrl;
    private String thumbnail;
    private String actor;
    private String cast;
    private String country;
    @Builder.Default
    private MovieStatus status = MovieStatus.PRIVATE;

    private Integer view;
    private List<Genre> genres; // Dùng để nhận danh sách ID thể loại từ frontend
}
