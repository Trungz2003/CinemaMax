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
        CONCAT(
            COALESCE(SUM(CASE WHEN cr.reaction_type = 'LIKE' THEN 1 ELSE 0 END), 0), 
            '/', 
            COALESCE(SUM(CASE WHEN cr.reaction_type = 'DISLIKE' THEN 1 ELSE 0 END), 0)
        ) AS thichKhongThich,
        DATE(c.created_at) AS createdAt
    FROM movies m
    LEFT JOIN comments c ON m.id = c.movie_id
    LEFT JOIN comment_reactions cr ON c.id = cr.comment_id
    WHERE (:userId IS NULL OR c.user_id = :userId)
    AND c.id IS NOT NULL  -- ❌ Loại bỏ các dòng không có đánh giá
    AND c.content IS NOT NULL  -- ❌ Loại bỏ review không có nội dung
    GROUP BY c.id, m.title, m.actor, c.content, c.created_at
    """, nativeQuery = true)
    List<GetCommentByUserIdResponse> findComments(@Param("userId") Integer userId);


    @Modifying
    @Query("DELETE FROM Comment c WHERE c.id = :id")
    int deleteCommentById(@Param("id") int id);

    int countByIdNotNull();

    @Modifying
    @Query("DELETE FROM Comment c WHERE c.movie.id = :movieId")
    void deleteCommentsByMovieId(@Param("movieId") int movieId);

    int countByUserId(long id);

    @Query(value = "SELECT c.id, c.content, c.created_at, u.id, u.user_name, u.thumbnail, " +
            "COALESCE(like_count.total, 0) AS likeCount, " +
            "COALESCE(dislike_count.total, 0) AS dislikeCount, " +
            "COALESCE(cr.reaction_type, 'NONE') AS userReaction " +
            "FROM comments c " +
            "JOIN users u ON u.id = c.user_id " +
            "LEFT JOIN (SELECT comment_id, COUNT(*) AS total FROM comment_reactions WHERE reaction_type = 'LIKE' GROUP BY comment_id) like_count " +
            "ON like_count.comment_id = c.id " +
            "LEFT JOIN (SELECT comment_id, COUNT(*) AS total FROM comment_reactions WHERE reaction_type = 'DISLIKE' GROUP BY comment_id) dislike_count " +
            "ON dislike_count.comment_id = c.id " +
            "LEFT JOIN comment_reactions cr " +
            "ON cr.comment_id = c.id AND cr.user_id = :currentUserId " +
            "WHERE c.movie_id = :movieId " +
            "ORDER BY c.created_at DESC",
            nativeQuery = true)
    List<Object[]> findCommentsWithUserReaction(@Param("movieId") Long movieId, @Param("currentUserId") Long currentUserId);



}
