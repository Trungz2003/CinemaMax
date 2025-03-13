package org.example.cinemamax_server.repository;

import org.example.cinemamax_server.dto.response.GetCommentByUserIdResponse;
import org.example.cinemamax_server.dto.response.GetMoviesAdminResponse;
import org.example.cinemamax_server.dto.response.MovieDashboardResponse;
import org.example.cinemamax_server.entity.Movies;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.awt.print.Pageable;
import java.util.List;

@Repository
public interface MoviesRepository extends JpaRepository<Movies, Integer> {
    @Query(value = """

    SELECT
          m.id,
          m.title,
          COALESCE(ROUND(r.rating, 1), 0) AS rating,  -- Làm tròn rating 1 chữ số thập phân
          m.view,
          m.status,
          m.release_date,
          GROUP_CONCAT(DISTINCT g.name ORDER BY g.name ASC SEPARATOR ', ') AS genres
      FROM
          movies m
      LEFT JOIN
          (SELECT movie_id, AVG(rating) AS rating FROM ratings GROUP BY movie_id) r
          ON m.id = r.movie_id 
      LEFT JOIN
          movie_genre mg ON m.id = mg.movie_id
      LEFT JOIN
          genres g ON mg.genre_id = g.id
      GROUP BY
          m.id, m.title, m.view, m.status, m.release_date, r.rating;
      
        
        """, nativeQuery = true)
    List<GetMoviesAdminResponse> findAllMovies();

    int countByIdNotNull();

    @Modifying
    @Query("DELETE FROM Movies m WHERE m.id = :id")
    int deleteMoviesById(@Param("id") int id);

    @Modifying
    @Query(value = "DELETE FROM movie_genre WHERE movie_id = :movieId", nativeQuery = true)
    void deleteMovieGenresByMovieId(@Param("movieId") int movieId);

    // Lấy 5 phim có đánh giá cao nhất
    @Query(value = """
        SELECT 
            m.id, 
            m.title, 
            (SELECT GROUP_CONCAT(DISTINCT g.name ORDER BY g.name ASC SEPARATOR ', ') 
             FROM movie_genre mg 
             JOIN genres g ON mg.genre_id = g.id 
             WHERE mg.movie_id = m.id) AS genres, 
            COALESCE(ROUND(AVG(r.rating), 1), 0) AS rating
        FROM movies m
        LEFT JOIN ratings r ON m.id = r.movie_id
        GROUP BY m.id, m.title
        ORDER BY rating DESC
        LIMIT 5
    """, nativeQuery = true)
    List<Object[]> findTopRatedMovies();

    // Lấy 5 phim mới nhất
    @Query(value = """
        SELECT 
            m.id, 
            m.title, 
            (SELECT GROUP_CONCAT(DISTINCT g.name ORDER BY g.name ASC SEPARATOR ', ') 
             FROM movie_genre mg 
             JOIN genres g ON mg.genre_id = g.id 
             WHERE mg.movie_id = m.id) AS genres, 
            COALESCE(ROUND(AVG(r.rating), 1), 0) AS rating
        FROM movies m
        LEFT JOIN ratings r ON m.id = r.movie_id
        GROUP BY m.id, m.title, m.created_at
        ORDER BY m.created_at DESC
        LIMIT 5
    """, nativeQuery = true)
    List<Object[]> findLatestMovies();

    // Lấy 5 phim có đánh giá mới nhất
    @Query(value = """
        SELECT 
            m.id, 
            m.title, 
            m.actor, 
            COALESCE(ROUND(r.rating, 1), 0) AS rating
        FROM movies m
        LEFT JOIN (
            SELECT movie_id, AVG(rating) AS rating, MAX(created_at) AS latest_rating_time 
            FROM ratings 
            GROUP BY movie_id
        ) r ON m.id = r.movie_id
        ORDER BY r.latest_rating_time DESC
        LIMIT 5
    """, nativeQuery = true)
    List<Object[]> findLatestRatedMovies();


}
