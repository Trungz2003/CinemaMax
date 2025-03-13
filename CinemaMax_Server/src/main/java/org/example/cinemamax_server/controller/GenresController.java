package org.example.cinemamax_server.controller;

import com.google.api.gax.rpc.ApiException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.cinemamax_server.dto.response.ApiResponse;
import org.example.cinemamax_server.dto.response.AuthenticationResponse;
import org.example.cinemamax_server.dto.response.GenreResponse;
import org.example.cinemamax_server.entity.Genre;
import org.example.cinemamax_server.exception.AppException;
import org.example.cinemamax_server.exception.ErrorCode;
import org.example.cinemamax_server.service.GenresService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class GenresController {
    GenresService genresService;

    @GetMapping("/admin/getGenres")
    public ApiResponse<?> getGenresService() {
        try {
            // Trực tiếp lấy danh sách thể loại mà không cần kiểm tra token
            List<GenreResponse> genres = genresService.getAllGenres();
            return ApiResponse.<List<GenreResponse>>builder()
                    .result(genres)
                    .message("Danh sách thể loại phim")
                    .code(HttpStatus.OK.value())
                    .build(); // Trả về danh sách thể loại nếu thành công
        } catch (Exception e) {
            // Xử lý lỗi nếu có
            return ApiResponse.<List<Genre>>builder()
                    .result(null)
                    .message("Lỗi khi lấy danh sách thể loại")
                    .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .build();
        }
    }

}
