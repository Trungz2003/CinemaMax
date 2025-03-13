package org.example.cinemamax_server.service;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.cinemamax_server.dto.response.CommentRespone;
import org.example.cinemamax_server.dto.response.GetCommentByUserIdResponse;
import org.example.cinemamax_server.dto.response.RatingsResponse;
import org.example.cinemamax_server.exception.AppException;
import org.example.cinemamax_server.exception.ErrorCode;
import org.example.cinemamax_server.repository.CommentReactionsRepository;
import org.example.cinemamax_server.repository.CommentRepository;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor  // Sử dụng thay vì @Builder để Spring quản lý dependency injection
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CommentService {
    CommentRepository commentRepository;
    CommentReactionsRepository commentReactionsRepository;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public CommentRespone getComment(Integer userId) { // Đổi từ int -> Integer
        List<GetCommentByUserIdResponse> comments = commentRepository.findComments(userId);
        int totalComment = commentRepository.countByIdNotNull();
        return new CommentRespone(comments, totalComment);
    }

    @Transactional
    @PostAuthorize("hasRole('ROLE_ADMIN')")
    public boolean deleteComment(int id) {

        commentReactionsRepository.deleteByCommentId(id);

        int deletedCount = commentRepository.deleteCommentById(id);

        if (deletedCount == 0) {
            throw new AppException(ErrorCode.ID_NOT_EXISTED);
        }

        return true;
    }
}
