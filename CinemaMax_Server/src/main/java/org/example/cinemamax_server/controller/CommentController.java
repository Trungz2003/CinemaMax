package org.example.cinemamax_server.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.cinemamax_server.dto.response.ApiResponse;
import org.example.cinemamax_server.dto.response.CommentRespone;
import org.example.cinemamax_server.dto.response.GetCommentByUserIdResponse;
import org.example.cinemamax_server.service.CommentService;
import org.springframework.web.bind.annotation.*;

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

}
