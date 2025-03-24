package org.example.cinemamax_server.repository;

import org.example.cinemamax_server.dto.response.GetCommentByUserIdResponse;
import org.example.cinemamax_server.dto.response.GetReviewsByUserIdResponse;
import org.example.cinemamax_server.dto.response.RatingByMovieIdResponse;
import org.example.cinemamax_server.entity.Movies;
import org.example.cinemamax_server.entity.Ratings;
import org.example.cinemamax_server.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingsRepository extends JpaRepository<Ratings, Integer> {
    void deleteByUserId(int userId);

    @Query(value = """
        SELECT
            r.id,
            m.title,
            m.actor,
            r.content,
            r.rating,
        CAST(r.created_at AS DATE) AS release_date
        FROM ratings r
        JOIN movies m ON r.movie_id = m.id
        WHERE (:userId IS NULL OR r.user_id = :userId)
        AND r.id IS NOT NULL  -- ❌ Loại bỏ các dòng không có đánh giá
        AND r.content IS NOT NULL  -- ❌ Loại bỏ review không có nội dung
        ORDER BY r.created_at DESC;
        """, nativeQuery = true)
    List<GetReviewsByUserIdResponse> findRevews(@Param("userId") Integer userId);

    @Modifying
    @Query("DELETE FROM Ratings r WHERE r.id = :id")
    int deleteRatingsById(@Param("id") int id);

    int countByIdNotNull();

    @Modifying
    @Query("DELETE FROM Ratings r WHERE r.movie.id = :movieId")
    void deleteRatingsByMovieId(@Param("movieId") int movieId);

    int countByUserId(long userId);

    @Query("SELECT COALESCE(AVG(r.rating), 0) FROM Ratings r WHERE r.movie.id = :movieId")
    Float findAverageRatingByMovieId(@Param("movieId") Long movieId);

    @Query("SELECT new org.example.cinemamax_server.dto.response.RatingByMovieIdResponse(" +
            "r.rating, r.title, r.content, r.createdAt, u.userName, u.thumbnail) " +
            "FROM Ratings r JOIN r.user u WHERE r.movie.id = :movieId")
    List<RatingByMovieIdResponse> findRatingsByMovieId(@Param("movieId") Long movieId);

    boolean existsByMovieAndUser(Movies movie, User user);


}
