package org.example.cinemamax_server.service;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.cinemamax_server.dto.response.GetCommentByUserIdResponse;
import org.example.cinemamax_server.dto.response.GetReviewsByUserIdResponse;
import org.example.cinemamax_server.dto.response.RatingsResponse;
import org.example.cinemamax_server.exception.AppException;
import org.example.cinemamax_server.exception.ErrorCode;
import org.example.cinemamax_server.repository.RatingsRepository;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor  // Sử dụng thay vì @Builder để Spring quản lý dependency injection
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RatingService {
    RatingsRepository ratingsRepository;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public RatingsResponse getRatings(Integer id) { // Đổi từ int -> Integer
        List<GetReviewsByUserIdResponse> reviews = ratingsRepository.findRevews(id);

        int totalReviews = ratingsRepository.countByIdNotNull();

        return new RatingsResponse(reviews, totalReviews);
    }

    @Transactional
    @PostAuthorize("hasRole('ROLE_ADMIN')")
    public boolean deleteRating(int id) {

        int deletedCount = ratingsRepository.deleteRatingsById(id);

        if (deletedCount == 0) {
            throw new AppException(ErrorCode.ID_NOT_EXISTED);
        }

        return true;
    }
}
