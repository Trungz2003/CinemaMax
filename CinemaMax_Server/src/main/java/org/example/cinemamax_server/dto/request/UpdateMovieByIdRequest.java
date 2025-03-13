package org.example.cinemamax_server.dto.request;

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
public class UpdateMovieByIdRequest {
    String title;
    String description;
    LocalDate releaseDate;
    Integer duration;
    String videoUrl;
    String thumbnail;
    String actor;
    String cast;
    String country;
    List<Genre> genres; // Dùng để nhận danh sách ID thể loại từ frontend
}
