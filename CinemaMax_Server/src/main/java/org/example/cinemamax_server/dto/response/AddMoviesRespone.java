package org.example.cinemamax_server.dto.response;


import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.cinemamax_server.entity.Genre;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AddMoviesRespone {
    private String title;
    private String description;
    private LocalDate releaseDate;
    private Integer duration;
    private String videoUrl;
    private String thumbnail;
    private String actor;
    private String cast;
    private String country;
    private String status;
    private Integer view;
    private List<Genre> genres; // Dùng để nhận danh sách ID thể loại từ frontend
}
