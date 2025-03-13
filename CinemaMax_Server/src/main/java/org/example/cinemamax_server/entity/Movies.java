package org.example.cinemamax_server.entity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.example.cinemamax_server.enums.MovieStatus;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "movies")
public class Movies {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "release_date")
    private LocalDate releaseDate;

    @Column(name = "duration")
    private Integer duration;


    @Column(name = "video_url")
    private String videoUrl;

    @Column(name = "thumbnail")
    private String thumbnail;

    @Column(name = "actor")
    private String actor;

    @Column(name = "cast")
    private String cast;

    @Column(name = "country")
    private String country;

    @Column(name = "status")
    @Enumerated(EnumType.STRING) // Lưu Enum dưới dạng chuỗi trong DB
    private MovieStatus status;

    @Column(name = "view")
    private Integer view;

    // Many-to-Many với Genre
    @ManyToMany
    @JoinTable(
            name = "movie_genre", // Tạo bảng trung gian
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private List<Genre> genres; // Danh sách thể loại của phim
    // Getters and Setters

    @Column(name = "created_at")
    private LocalDate createdAt; // Thêm trường createdAt
}

