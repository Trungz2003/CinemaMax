package org.example.cinemamax_server.service;


import lombok.AccessLevel;
import lombok.Builder;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.cinemamax_server.entity.Favorites;
import org.example.cinemamax_server.entity.Movies;
import org.example.cinemamax_server.entity.User;
import org.example.cinemamax_server.repository.FavoritesRepository;
import org.example.cinemamax_server.repository.MoviesRepository;
import org.example.cinemamax_server.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@Builder
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FavoritesService {
    UserRepository userRepository;
    FavoritesRepository favoritesRepository;
    MoviesRepository moviesRepository;
    public Map<String, Object> toggleFavorite(int movieID, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<Favorites> favorite = favoritesRepository.findByUserIdAndMovieId(user.getId(), movieID);
        Map<String, Object> response = new HashMap<>();

        if (favorite.isPresent()) {
            favoritesRepository.delete(favorite.get());
            response.put("message", "Đã xóa khỏi danh sách yêu thích");
            response.put("isFavorite", false);
        } else {
            Movies movie = moviesRepository.findById(movieID)
                    .orElseThrow(() -> new RuntimeException("Movie not found"));

            Favorites newFavorite = new Favorites(user, movie);
            favoritesRepository.save(newFavorite);

            response.put("message", "Đã thêm vào danh sách yêu thích");
            response.put("isFavorite", true);
        }

        return response;
    }
}
