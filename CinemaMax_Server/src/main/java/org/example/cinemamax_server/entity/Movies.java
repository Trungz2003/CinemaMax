package org.example.cinemamax_server.entity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

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

    @ManyToOne
    @JoinColumn(name = "id_genre")
    private Genre genre;

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
    private String status;

    @Column(name = "view")
    private Integer view;

    @Column(name = "category")
    private String category;

    // Getters and Setters
}

