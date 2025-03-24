package org.example.cinemamax_server.mapper;

import org.example.cinemamax_server.dto.request.MoviesRequest;
import org.example.cinemamax_server.dto.response.AddMoviesRespone;
import org.example.cinemamax_server.dto.response.MovieDTO;
import org.example.cinemamax_server.entity.Movies;
import org.example.cinemamax_server.repository.FavoritesRepository;
import org.example.cinemamax_server.repository.RatingsRepository;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class MoviesMapper {

    @Autowired
    protected RatingsRepository ratingsRepository;

    @Autowired
    protected FavoritesRepository favoritesRepository;

    public abstract Movies toEntity(MoviesRequest request);

    public abstract AddMoviesRespone toResponse(Movies entity);

    @Mapping(target = "averageRating", expression = "java(getAverageRating(entity.getId()))")
    @Mapping(target = "isFavorite", expression = "java(isMovieFavorite(entity.getId(), userId))")
    public abstract MovieDTO toResponseInfo(Movies entity, Long userId);

    // ✅ Viết thủ công vì MapStruct không hỗ trợ danh sách với tham số bổ sung
    public List<MovieDTO> toResponseList(List<Movies> movies, Long userId) {
        return movies.stream()
                .map(movie -> toResponseInfo(movie, userId))
                .toList();
    }

    protected Float getAverageRating(Long movieId) {
        return ratingsRepository.findAverageRatingByMovieId(movieId);
    }

    protected Boolean isMovieFavorite(Long movieId, Long userId) {
        if (userId == null) return false; // Nếu không có user, mặc định là false
        return favoritesRepository.existsByUserIdAndMovieId(userId, movieId);
    }

}
