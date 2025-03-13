package org.example.cinemamax_server.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.cinemamax_server.dto.response.ApiResponse;
import org.example.cinemamax_server.dto.response.GetReviewsByUserIdResponse;
import org.example.cinemamax_server.dto.response.RatingsResponse;
import org.example.cinemamax_server.service.RatingService;
import org.springframework.web.bind.annotation.*;

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
}
