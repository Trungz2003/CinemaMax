package org.example.cinemamax_server.service;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.cinemamax_server.dto.response.CommentRespone;
import org.example.cinemamax_server.dto.response.CommentResponseDTO;
import org.example.cinemamax_server.dto.response.GetCommentByUserIdResponse;
import org.example.cinemamax_server.dto.response.RatingsResponse;
import org.example.cinemamax_server.entity.Comment;
import org.example.cinemamax_server.entity.Movies;
import org.example.cinemamax_server.entity.User;
import org.example.cinemamax_server.exception.AppException;
import org.example.cinemamax_server.exception.ErrorCode;
import org.example.cinemamax_server.repository.CommentReactionsRepository;
import org.example.cinemamax_server.repository.CommentRepository;
import org.example.cinemamax_server.repository.MoviesRepository;
import org.example.cinemamax_server.repository.UserRepository;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor  // Sử dụng thay vì @Builder để Spring quản lý dependency injection
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CommentService {
    CommentRepository commentRepository;
    CommentReactionsRepository commentReactionsRepository;
    UserRepository userRepository;
    MoviesRepository moviesRepository;

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

    public List<CommentResponseDTO> getCommentsByMovieId(Long movieId, String email) {
        Long userId = null;

        // Nếu email không null, tìm userId, nếu không tìm thấy thì userId vẫn là null
        if (email != null) {
            userId = userRepository.findByEmail(email)
                    .map(User::getId)
                    .orElse(null);
        }

        // Truy vấn bình luận, userId = null sẽ không ảnh hưởng đến việc lấy danh sách bình luận
        List<Object[]> results = commentRepository.findCommentsWithUserReaction(movieId, userId);
        List<CommentResponseDTO> commentList = new ArrayList<>();

        for (Object[] row : results) {
            CommentResponseDTO comment = new CommentResponseDTO();
            comment.setCommentId((Long) row[0]);
            comment.setContent((String) row[1]);
            comment.setCreatedAt(((java.sql.Timestamp) row[2]).toLocalDateTime());
            comment.setUserId((Long) row[3]);
            comment.setUserName((String) row[4]);
            comment.setUserAvatar((String) row[5]);
            comment.setLikeCount(((Number) row[6]).intValue());
            comment.setDislikeCount(((Number) row[7]).intValue());
            comment.setUserReaction(row[8] != null ? (String) row[8] : "NONE"); // ✅ Nếu user chưa đăng nhập thì mặc định "NONE"

            commentList.add(comment);
        }
        return commentList;
    }

    public CommentResponseDTO addComment(int movieId, String email, String content) {
        Movies movie = moviesRepository.findById(movieId)
                .orElseThrow(() -> new RuntimeException("Movie not found"));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // ✅ Tạo entity Comment
        Comment comment = Comment.builder()
                .movie(movie)
                .user(user)
                .content(content)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        // ✅ Lưu vào database
        Comment savedComment = commentRepository.save(comment);

        // ✅ Chuyển từ entity -> DTO để trả về
        return CommentResponseDTO.builder()
                .commentId(savedComment.getId())
                .content(savedComment.getContent())
                .createdAt(savedComment.getCreatedAt())
                .userId(user.getId())
                .userName(user.getFullName())
                .userAvatar(user.getThumbnail())
                .likeCount(0) // Mặc định 0 like
                .dislikeCount(0) // Mặc định 0 dislike
                .userReaction("NONE") // Mặc định chưa like/dislike
                .build();
    }


}
