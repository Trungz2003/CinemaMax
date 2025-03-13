package org.example.cinemamax_server.repository;

import org.example.cinemamax_server.dto.response.GetCommentByUserIdResponse;
import org.example.cinemamax_server.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    void deleteByUserId(int userId);

    @Query(value = """
        SELECT 
            c.id AS id,
            m.title AS title,
            m.actor AS actor,
            c.content AS content,
            CONCAT(COALESCE(cr.like_count, 0), '/', COALESCE(cr.dislike_count, 0)) AS thichKhongThich,
            DATE(c.created_at) AS createdAt
        FROM movies m
        LEFT JOIN comments c ON m.id = c.movie_id
        LEFT JOIN comment_reactions cr ON c.id = cr.comment_id
        WHERE (:userId IS NULL OR c.user_id = :userId)
        AND c.id IS NOT NULL  -- ❌ Loại bỏ các dòng không có đánh giá
        AND c.content IS NOT NULL  -- ❌ Loại bỏ review không có nội dung
        """, nativeQuery = true)
    List<GetCommentByUserIdResponse> findComments(@Param("userId") Integer userId);

    @Modifying
    @Query("DELETE FROM Comment c WHERE c.id = :id")
    int deleteCommentById(@Param("id") int id);

    int countByIdNotNull();

    @Modifying
    @Query("DELETE FROM Comment c WHERE c.movie.id = :movieId")
    void deleteCommentsByMovieId(@Param("movieId") int movieId);


}
