package org.example.cinemamax_server.service;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.cinemamax_server.entity.Comment;
import org.example.cinemamax_server.entity.CommentReactions;
import org.example.cinemamax_server.entity.User;
import org.example.cinemamax_server.enums.ReactionType;
import org.example.cinemamax_server.repository.CommentReactionsRepository;
import org.example.cinemamax_server.repository.CommentRepository;
import org.example.cinemamax_server.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor  // Sử dụng thay vì @Builder để Spring quản lý dependency injection
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CommentReactionService {
    CommentRepository commentRepository;
    CommentReactionsRepository commentReactionsRepository;
    UserRepository userRepository;

    public String reactToComment(int commentId, String email, ReactionType reactionType) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        Optional<CommentReactions> existingReaction = commentReactionsRepository.findByUserAndComment(user, comment);

        if (existingReaction.isPresent()) {
            // Nếu đã like/dislike trước đó
            if (existingReaction.get().getReactionType() == reactionType) {
                commentReactionsRepository.delete(existingReaction.get());
                return "Reaction removed successfully!";
            } else {
                // Nếu đổi từ LIKE sang DISLIKE hoặc ngược lại
                existingReaction.get().setReactionType(reactionType);
                commentReactionsRepository.save(existingReaction.get());
                return "Reaction updated successfully!";
            }
        } else {
            // Nếu chưa từng react thì tạo mới
            CommentReactions newReaction = CommentReactions.builder()
                    .user(user)
                    .comment(comment)
                    .reactionType(reactionType)
                    .build();
            commentReactionsRepository.save(newReaction);
            return "Reaction added successfully!";
        }
    }
}
