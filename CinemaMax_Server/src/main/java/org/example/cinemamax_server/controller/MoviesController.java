package org.example.cinemamax_server.controller;


import com.nimbusds.jose.JOSEException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.cinemamax_server.dto.request.IntrospectRequest;
import org.example.cinemamax_server.dto.request.MoviesRequest;
import org.example.cinemamax_server.dto.request.UpdateMovieByIdRequest;
import org.example.cinemamax_server.dto.response.*;
import org.example.cinemamax_server.enums.MovieStatus;
import org.example.cinemamax_server.enums.Status;
import org.example.cinemamax_server.exception.AppException;
import org.example.cinemamax_server.exception.ErrorCode;
import org.example.cinemamax_server.service.AuthenticationService;
import org.example.cinemamax_server.service.MoviesService;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.text.ParseException;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MoviesController {
    MoviesService movieService;
    AuthenticationService authenticationService;

    // Endpoint để thêm phim mới
    @PostMapping("/admin/addMovie")
    public ApiResponse<?> addMovie(@RequestBody MoviesRequest moviesRequest, @RequestHeader("Authorization") String token) {
        try {
            log.info("Received addMovie request: {}", moviesRequest);
            // Kiểm tra token hợp lệ (ví dụ bằng cách gọi một service xác thực)
            if (token == null || token.equals("") || !token.startsWith("Bearer ")) {
                throw new AppException(ErrorCode.UNAUTHENTICATED);
            }

            // Loại bỏ "Bearer " và lấy token thực tế
            String jwtToken = token.substring(7);

            authenticationService.introspect(new IntrospectRequest(jwtToken));

            // Kiểm tra dữ liệu đầu vào trong một if duy nhất
            if (moviesRequest.getTitle() == null || moviesRequest.getTitle().isEmpty() ||
                    moviesRequest.getDescription() == null || moviesRequest.getDescription().isEmpty() ||
                    moviesRequest.getReleaseDate() == null ||
                    moviesRequest.getDuration() == null || moviesRequest.getDuration() <= 0 ||
                    moviesRequest.getVideoUrl() == null || moviesRequest.getVideoUrl().isEmpty() ||
                    moviesRequest.getThumbnail() == null || moviesRequest.getThumbnail().isEmpty() ||
                    moviesRequest.getActor() == null || moviesRequest.getActor().isEmpty() ||
                    moviesRequest.getGenres() == null || moviesRequest.getGenres().isEmpty()) {

                throw new AppException(ErrorCode.DATA_NOT_COMPLETE);
            }
            // Gọi service để thêm phim và trả về response
            AddMoviesRespone moviesReponse = movieService.saveMovie(moviesRequest);
            return ApiResponse.builder()
                    .result(moviesReponse)
                    .message("Add movie success!")
                    .build();
        } catch (AppException e) {
            // Nếu lỗi đã biết, ném lại luôn (không làm mất lỗi gốc)
            throw e;
        } catch (Exception e) {
            // Nếu lỗi không mong muốn, log lại rồi ném lỗi chung
            log.error("Unexpected error when adding movie", e);
            throw new AppException(ErrorCode.UNCATEGORIZED_EXCEPTION);
        }
    }

    @GetMapping("/admin/movie")
    public ApiResponse<MoviesResponse> getAllMovies() {
        MoviesResponse movies = movieService.getAllMovies();
        return ApiResponse.<MoviesResponse>builder()

                .message("Lấy danh sách phim thành công!")
                .result(movies)
                .build();
    }

    @DeleteMapping("/admin/movie/{id}")
    public ApiResponse<?> deleteMovie(@PathVariable int id) {
        if (id <= 0) {
            throw new AppException(ErrorCode.ID_NOT_EXISTED);
        }
        try {
            // Gọi service để thêm phim và trả về response
            var moviesReponse = movieService.deleteMovie(id);
            return ApiResponse.builder()
                    .result(moviesReponse)
                    .message("Delete movie success!")
                    .build();
        } catch (Exception e) {
            // Nếu có lỗi, trả về HTTP 500 và thông báo lỗi
            throw e;
        }
    }

    @PutMapping("/admin/movie/status/{movieId}")
    ApiResponse<MovieStatus> updateUserStatus(@PathVariable int movieId){
        return ApiResponse.<MovieStatus>builder()
                .result(movieService.updateStatusMovie(movieId))
                .build();
    }

    @GetMapping("/movie/{id}")
    ApiResponse<GetMoviesByIdResponse> getMovieById(@PathVariable int id){
        return ApiResponse.<GetMoviesByIdResponse>builder()
                .result(movieService.getMovieById(id))
                .build();
    }

    @PutMapping("/admin/movie/{movieId}")
    public ApiResponse<GetMoviesByIdResponse> updateMovieStatus(
            @PathVariable int movieId,  // Lấy movieId từ URL
            @RequestBody UpdateMovieByIdRequest request) {  // Lấy dữ liệu từ body) {
        try {
            // Cập nhật trạng thái của bộ phim
            GetMoviesByIdResponse updatedStatus = movieService.updateMovie(movieId, request);

            // Trả về ApiResponse khi thành công
            return ApiResponse.<GetMoviesByIdResponse>builder()
                    .result(updatedStatus)
                    .message("Movie status updated successfully")
                    .build();
        } catch (RuntimeException e) {
            // Trả về ApiResponse nếu không tìm thấy phim
            return ApiResponse.<GetMoviesByIdResponse>builder()
                    .message("Movie not found: " + e.getMessage())
                    .code(404)
                    .build();
        } catch (Exception e) {
            // Trả về ApiResponse nếu có lỗi server
            return ApiResponse.<GetMoviesByIdResponse>builder()
                    .message("An error occurred while updating the movie status")
                    .code(500)
                    .build();
        }
    }


    @GetMapping("/admin/getInfoDashboard")
    public ApiResponse<DashboardResponse> getDashboard() {
        DashboardResponse response = movieService.getDashboardData();
        // Trả về ApiResponse khi thành công
        return ApiResponse.<DashboardResponse>builder()
                .result(response)
                .message("Movie status updated successfully")
                .build();
    }

    @GetMapping("/user/movie")
    public ApiResponse<AllMovieInfoResponse> getAllMoviesUser(Authentication authentication) {
        if (authentication == null || authentication.getName() == null) {
            AllMovieInfoResponse response = movieService.getAllMovieUser(null);
            return ApiResponse.<AllMovieInfoResponse>builder()
                    .result(response)
                    .message("Đã lấy tất cả phim!")
                    .build();
        }
        String email = authentication.getName(); // Lấy email từ JWT token

        AllMovieInfoResponse response = movieService.getAllMovieUser(email);
        // Trả về ApiResponse khi thành công
        return ApiResponse.<AllMovieInfoResponse>builder()
                .result(response)
                .message("Đã lấy tất cả phim!")
                .build();
    }

    @GetMapping("/user/movie/suggest")
    public ApiResponse<List<MovieDTO>> getMovieSuggest(Authentication authentication) {
        if (authentication == null || authentication.getName() == null) {
            List<MovieDTO> response = movieService.getMovieSuggest(null);
            return ApiResponse.<List<MovieDTO>>builder()
                    .result(response)
                    .message("Đã lấy 6 bộ phim!")
                    .build();
        }
        String email = authentication.getName(); // Lấy email từ JWT token

        List<MovieDTO> response = movieService.getMovieSuggest(email);
        // Trả về ApiResponse khi thành công
        return ApiResponse.<List<MovieDTO>>builder()
                .result(response)
                .message("Đã lấy 6 bộ phim!")
                .build();
    }

    @PostMapping("/user/movie/videoAccess")
    @PreAuthorize("isAuthenticated()")
    public ApiResponse<VideoAccessResponse> checkVideoAccess(@RequestHeader("Authorization") String authorizationHeader,
                                                             Authentication authentication) {
        // Check if the user is authenticated
        if (authentication == null || authentication.getName() == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Bạn cần đăng nhập để xem video!");
        }

        // Extract the token from the Authorization header
        String token = authorizationHeader.replace("Bearer ", "");
        String email = authentication.getName();

        try {
            // Call the service to check video access
            VideoAccessResponse response = movieService.checkVideoAccess(new IntrospectRequest(token), email);

            return ApiResponse.<VideoAccessResponse>builder()
                    .result(response)
                    .message("Đủ điều kiện xem video!")
                    .build();
        } catch (ParseException e) {
            // Handle ParseException
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Lỗi định dạng dữ liệu: " + e.getMessage());
        } catch (JOSEException e) {
            // Handle JOSEException
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Lỗi xác thực JWT: " + e.getMessage());
        }
    }


}
