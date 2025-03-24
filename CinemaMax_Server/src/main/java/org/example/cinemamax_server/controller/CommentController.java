package org.example.cinemamax_server.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.cinemamax_server.dto.response.*;
import org.example.cinemamax_server.entity.Comment;
import org.example.cinemamax_server.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CommentController {
    CommentService commentService;

    @GetMapping("/admin/comment")
    public ApiResponse<CommentRespone> getCommentByUserId() {
        CommentRespone comments = commentService.getComment(null);
        return ApiResponse.<CommentRespone>builder()

                .message("Lấy danh sách comment thành công")
                .result(comments)
                .build();
    }

    @DeleteMapping("/admin/commentById/{id}")
    public ApiResponse<?> deleteComment(@PathVariable int id) {
        var isDelete = commentService.deleteComment(id);
        return ApiResponse.<Boolean>builder()

                .message("Xóa comment thành công!")
                .result(isDelete)
                .build();
    }

    @GetMapping("user/movie/comment/{movieId}")
    public ApiResponse<List<CommentResponseDTO>> getCommentsByMovie(@PathVariable Long movieId, Authentication authentication) {
        String email = (authentication != null) ? authentication.getName() : null; // ✅ Nếu chưa đăng nhập, email = null
        List<CommentResponseDTO> response = commentService.getCommentsByMovieId(movieId, email);
        return ApiResponse.<List<CommentResponseDTO>>builder()

                .message("Lấy danh sách comment thành công!")
                .result(response)
                .build();
    }

    @PostMapping("user/movie/comment/{movieId}")
    @PreAuthorize("isAuthenticated()") // ✅ Chỉ cho phép user đã đăng nhập
    public ApiResponse<CommentResponseDTO> addComment(@PathVariable int movieId, Authentication authentication, @RequestBody AddCommentRequest request) {
        if (authentication == null || authentication.getName() == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Bạn cần đăng nhập để bình luận!");
        }

        String email = authentication.getName(); // ✅ Đã đăng nhập thì lấy email
        CommentResponseDTO response = commentService.addComment(movieId, email, request.getContent());
        return ApiResponse.<CommentResponseDTO>builder()
                .message("Thêm bình luận thành công!")
                .result(response)
                .build();
    }
}
