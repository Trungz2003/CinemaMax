package org.example.cinemamax_server.repository;

import org.example.cinemamax_server.entity.CommentReactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface CommentReactionsRepository extends JpaRepository<CommentReactions, Integer> {
    @Modifying
    @Transactional
    @Query("DELETE FROM CommentReactions cr WHERE cr.comment.id = :comment_id")
    void deleteByCommentId(@Param("comment_id") int commentId);
}
