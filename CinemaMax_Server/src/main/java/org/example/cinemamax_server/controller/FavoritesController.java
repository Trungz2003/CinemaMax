package org.example.cinemamax_server.controller;


import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.cinemamax_server.dto.request.FavoriteRequest;
import org.example.cinemamax_server.dto.response.ApiResponse;
import org.example.cinemamax_server.service.FavoritesService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FavoritesController {
    FavoritesService favoritesService;
    @PostMapping("/user/movie/favorites")
    public ApiResponse<Map<String, Object>> toggleFavorite(@RequestBody FavoriteRequest request, Authentication authentication) {
        String email = authentication.getName(); // Lấy email từ token
        Map<String, Object> result = favoritesService.toggleFavorite(request.getMovieId(), email);

        return ApiResponse.<Map<String, Object>>builder()
                .result(result)
                .build();
    }
}
