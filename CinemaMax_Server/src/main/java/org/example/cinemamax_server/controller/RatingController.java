package org.example.cinemamax_server.controller;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.cinemamax_server.dto.request.AddRatingRequest;
import org.example.cinemamax_server.dto.response.*;
import org.example.cinemamax_server.service.RatingService;
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
public class RatingController {
    RatingService ratingService;
    @GetMapping("/admin/review")
    public ApiResponse<RatingsResponse> getCommentByUserId() {
        RatingsResponse reviews = ratingService.getRatings(null);
        return ApiResponse.<RatingsResponse>builder()

                .message("Lấy danh sách đánh giá thành công")
                .result(reviews)
                .build();
    }

    @DeleteMapping("/admin/reviewById/{id}")
    public ApiResponse<?> deleteRating(@PathVariable int id) {
        var isDelete = ratingService.deleteRating(id);
        return ApiResponse.<Boolean>builder()

                .message("Xóa đánh giá thành công!")
                .result(isDelete)
                .build();
    }

    @GetMapping("/user/movie/rating/{movieId}")
    public ApiResponse<List<RatingByMovieIdResponse>> getRatingsByMovieId(@PathVariable Long movieId) {
        List<RatingByMovieIdResponse> ratings = ratingService.getRatingsByMovieId(movieId);
        return ApiResponse.<List<RatingByMovieIdResponse>>builder()

                .message("Lấy danh sách đánh giá thành công!!")
                .result(ratings)
                .build();
    }

    @PostMapping("user/movie/rating/{movieId}")
    public ApiResponse<RatingByMovieIdResponse> addRating(@PathVariable int movieId, Authentication authentication, @RequestBody AddRatingRequest request) {
        if (authentication == null || authentication.getName() == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Bạn cần đăng nhập để bình luận!");
        }

        String email = authentication.getName(); // ✅ Đã đăng nhập thì lấy email
        RatingByMovieIdResponse response = ratingService.addRating(movieId, email, request);
        return ApiResponse.<RatingByMovieIdResponse>builder()
                .message("Thêm đánh giá thành công!")
                .result(response)
                .build();
    }
}
