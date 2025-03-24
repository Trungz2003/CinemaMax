package org.example.cinemamax_server.service;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.cinemamax_server.dto.request.AddRatingRequest;
import org.example.cinemamax_server.dto.response.GetCommentByUserIdResponse;
import org.example.cinemamax_server.dto.response.GetReviewsByUserIdResponse;
import org.example.cinemamax_server.dto.response.RatingByMovieIdResponse;
import org.example.cinemamax_server.dto.response.RatingsResponse;
import org.example.cinemamax_server.entity.Comment;
import org.example.cinemamax_server.entity.Movies;
import org.example.cinemamax_server.entity.Ratings;
import org.example.cinemamax_server.entity.User;
import org.example.cinemamax_server.exception.AppException;
import org.example.cinemamax_server.exception.ErrorCode;
import org.example.cinemamax_server.repository.MoviesRepository;
import org.example.cinemamax_server.repository.RatingsRepository;
import org.example.cinemamax_server.repository.UserRepository;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor  // Sử dụng thay vì @Builder để Spring quản lý dependency injection
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RatingService {
    RatingsRepository ratingsRepository;
    MoviesRepository moviesRepository;
    UserRepository userRepository;

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

    public List<RatingByMovieIdResponse> getRatingsByMovieId(Long movieId) {
        return ratingsRepository.findRatingsByMovieId(movieId);
    }

    @Transactional
    public RatingByMovieIdResponse addRating(int movieId, String email, AddRatingRequest request) {
        // Kiểm tra xem phim có tồn tại không
        Movies movie = moviesRepository.findById(movieId)
                .orElseThrow(() -> new AppException(ErrorCode.MOVIE_NOT_EXISTED));

        // Kiểm tra xem người dùng có tồn tại không
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        // Kiểm tra xem người dùng đã đánh giá bộ phim này chưa
        boolean hasRated = ratingsRepository.existsByMovieAndUser(movie, user);
        if (hasRated) {
            throw new AppException(ErrorCode.ALREADY_RATED);
        }

        // Tạo đánh giá mới
        Ratings rating = Ratings.builder()
                .movie(movie)
                .user(user)
                .title(request.getTitle())
                .content(request.getContent())
                .rating(request.getRating())
                .createdAt(LocalDateTime.now())
                .build();

        // Lưu vào database
        Ratings saveRatings = ratingsRepository.save(rating);

        return RatingByMovieIdResponse.builder()
                .rating(saveRatings.getRating())
                .title(saveRatings.getTitle())
                .content(saveRatings.getContent())
                .createdAt(saveRatings.getCreatedAt())
                .userName(user.getUserName())
                .thumbnail(user.getThumbnail())
                .build();
    }
}
