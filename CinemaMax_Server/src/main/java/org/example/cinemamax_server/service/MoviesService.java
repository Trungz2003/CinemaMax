package org.example.cinemamax_server.service;

import com.nimbusds.jose.JOSEException;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.cinemamax_server.dto.request.IntrospectRequest;
import org.example.cinemamax_server.dto.request.MoviesRequest;
import org.example.cinemamax_server.dto.request.UpdateMovieByIdRequest;
import org.example.cinemamax_server.dto.response.*;
import org.example.cinemamax_server.entity.*;
import org.example.cinemamax_server.enums.MovieStatus;
import org.example.cinemamax_server.enums.Status;
import org.example.cinemamax_server.exception.AppException;
import org.example.cinemamax_server.exception.ErrorCode;
import org.example.cinemamax_server.mapper.MoviesMapper;
import org.example.cinemamax_server.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.text.ParseException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Builder
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MoviesService {
    MoviesMapper moviesMapper;
    MoviesRepository moviesRepository;
    CommentRepository commentRepository;
    RatingsRepository ratingsRepository;
    FavoritesRepository favoritesRepository;
    GenresRepository genresRepository;
    UserRepository userRepository;
    AuthenticationService authenticationService;
    UserSubscriptionRepository userSubscriptionRepository;

    @PostAuthorize("hasRole('ADMIN')")
    public AddMoviesRespone saveMovie(MoviesRequest request) {
        // Chuyển đổi request thành entity
        Movies movie = moviesMapper.toEntity(request);

        // Lưu movie vào database (giả sử có phương thức save trong repository)
        moviesRepository.save(movie);

        // Chuyển đổi entity thành response và trả về
        return moviesMapper.toResponse(movie);
    }

    @PostAuthorize("hasRole('ADMIN')")
    public GetMoviesByIdResponse updateMovie(int id, UpdateMovieByIdRequest request) {
        // Kiểm tra phim có tồn tại không
        Movies movie = moviesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found with ID: " + id));

        // Cập nhật thông tin từ request (bỏ qua status và view)
        Optional.ofNullable(request.getTitle()).ifPresent(movie::setTitle);
        Optional.ofNullable(request.getDescription()).ifPresent(movie::setDescription);
        Optional.ofNullable(request.getReleaseDate()).ifPresent(movie::setReleaseDate);
        Optional.ofNullable(request.getDuration()).ifPresent(movie::setDuration);
        Optional.ofNullable(request.getVideoUrl()).ifPresent(movie::setVideoUrl);
        Optional.ofNullable(request.getThumbnail()).ifPresent(movie::setThumbnail);
        Optional.ofNullable(request.getActor()).ifPresent(movie::setActor);
        Optional.ofNullable(request.getCast()).ifPresent(movie::setCast);
        Optional.ofNullable(request.getCountry()).ifPresent(movie::setCountry);
//        Optional.ofNullable(request.getGenres()).ifPresent(movie::setGenres);

        // Xử lý cập nhật thể loại (nếu có)
        if (request.getGenres() != null && !request.getGenres().isEmpty()) {
            List<Integer> genreIds = request.getGenres().stream()
                    .map(genre -> Math.toIntExact(genre.getId())) // Ép kiểu Long -> Integer
                    .collect(Collectors.toList());

            List<Genre> genres = genresRepository.findAllById(genreIds);

            if (genres.size() != genreIds.size()) {
                throw new RuntimeException("One or more genres not found");
            }
            movie.setGenres(genres); // Gán danh sách thể loại đã xác thực
        }

        // Lưu thay đổi vào database (không cập nhật view và status)
        moviesRepository.save(movie);

        // Tạo response bằng builder
        return GetMoviesByIdResponse.builder()
                .title(movie.getTitle())
                .description(movie.getDescription())
                .releaseDate(movie.getReleaseDate())
                .duration(movie.getDuration())
                .videoUrl(movie.getVideoUrl())
                .thumbnail(movie.getThumbnail())
                .actor(movie.getActor())
                .cast(movie.getCast())
                .country(movie.getCountry())
                .genres(movie.getGenres().stream()
                        .map(genre -> new GenreResponse(genre.getId(), genre.getName()))
                        .collect(Collectors.toList()))
                .build();
    }

    @PostAuthorize("hasRole('ADMIN')")
    public MoviesResponse getAllMovies() {
        List<GetMoviesAdminResponse> movies = moviesRepository.findAllMovies();
        int totalMovies = moviesRepository.countByIdNotNull();

        return new MoviesResponse(movies, totalMovies);
    }

    @Transactional
    @PostAuthorize("hasRole('ADMIN')")
    public boolean deleteMovie(int id) {

        // Kiểm tra xem phim có tồn tại không trước khi xóa
        if (!moviesRepository.existsById(id)) {
            throw new AppException(ErrorCode.ID_NOT_EXISTED);
        }

        commentRepository.deleteCommentsByMovieId(id);

        ratingsRepository.deleteRatingsByMovieId(id);

        favoritesRepository.deleteFavoritesByMovieId(id);

        moviesRepository.deleteMovieGenresByMovieId(id);

        int deletedCount = moviesRepository.deleteMoviesById(id);

        if (deletedCount == 0) {
            throw new AppException(ErrorCode.ID_NOT_EXISTED);
        }

        return true;
    }

    @PostAuthorize("hasRole('ADMIN')")
    public MovieStatus updateStatusMovie(int id) {
        Movies movies = moviesRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.MOVIE_NOT_EXISTED));

        if (movies.getStatus() == null) {
            movies.setStatus(MovieStatus.PUBLIC); // Hoặc một giá trị mặc định khác
        } else {
            movies.setStatus(movies.getStatus() == MovieStatus.PUBLIC ? MovieStatus.PRIVATE : MovieStatus.PUBLIC);
        }


        moviesRepository.save(movies); // Lưu vào DB
        return movies.getStatus(); // Trả về trạng thái mới
    }


    public GetMoviesByIdResponse getMovieById(int id) {
        if (id <= 0) {
            throw new AppException(ErrorCode.ID_NOT_EXISTED);
        }
        Movies movie = moviesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found with ID: " + id));


        return new GetMoviesByIdResponse(
                movie.getTitle(),
                movie.getDescription(),
                movie.getReleaseDate(),
                movie.getDuration(),
                movie.getVideoUrl(),
                movie.getThumbnail(),
                movie.getActor(),
                movie.getCast(),
                movie.getCountry(),
                movie.getGenres().stream()
                        .map(genre -> new GenreResponse(genre.getId(), genre.getName())) // Bỏ `genre.getMovies()`
                        .collect(Collectors.toList())
        );
    }

    @PreAuthorize("hasRole('ADMIN')")
    public DashboardResponse getDashboardData() {
        // Lấy số liệu thống kê tổng hợp
        DashboardStatisticsResponse statistics = userRepository.getDashboardStatistics();

        // Lấy danh sách người dùng mới nhất
        List<UserDashboardResponse> latestUsers = userRepository.findLatestUsers().stream()
                .map(row -> new UserDashboardResponse(
                        ((Number) row[0]).longValue(),  // id
                        (String) row[1],               // full_name
                        (String) row[2],               // email
                        (String) row[3]                // user_name
                ))
                .collect(Collectors.toList());

        // Lấy danh sách phim mới nhất
        List<MovieDashboardResponse> latestMovies = moviesRepository.findLatestMovies().stream()
                .map(row -> new MovieDashboardResponse(
                        ((Number) row[0]).longValue(),  // ID
                        (String) row[1],               // Title
                        (String) row[2],               // Genres
                        row[3] != null ? ((Number) row[3]).doubleValue() : 0.0  // Rating
                ))
                .collect(Collectors.toList());

        // Lấy danh sách phim có đánh giá cao nhất
        List<MovieDashboardResponse> topRatedMovies = moviesRepository.findTopRatedMovies().stream()
                .map(row -> new MovieDashboardResponse(
                        ((Number) row[0]).longValue(),  // ID
                        (String) row[1],               // Title
                        (String) row[2],               // Genres
                        row[3] != null ? ((Number) row[3]).doubleValue() : 0.0  // Rating
                ))
                .collect(Collectors.toList());

        // Lấy danh sách phim có đánh giá mới nhất
        List<MovieLatestRatedResponse> latestRatedMovies = moviesRepository.findLatestRatedMovies().stream()
                .map(row -> new MovieLatestRatedResponse(
                        ((Number) row[0]).longValue(),  // ID
                        (String) row[1],               // Title
                        (String) row[2],               // Actor
                        row[3] != null ? ((Number) row[3]).doubleValue() : 0.0  // Rating
                ))
                .collect(Collectors.toList());

        // Trả về một object chứa toàn bộ dữ liệu
        return new DashboardResponse(statistics, latestUsers, latestMovies, topRatedMovies, latestRatedMovies);
    }

    public AllMovieInfoResponse getAllMovieUser(String email) {
        if(email == null || email.isEmpty()) {
            List<MovieDTO> allMoviesPublic = moviesMapper.toResponseList(
                    moviesRepository.findByStatus(MovieStatus.PUBLIC), null
                     // Truyền userId vào để xác định isFavorite
            );

            List<MovieDTO> allMoviesPrivate = moviesMapper.toResponseList(
                    moviesRepository.findByStatus(MovieStatus.PRIVATE), null
            );

            return new AllMovieInfoResponse(allMoviesPublic, allMoviesPrivate);
        }
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        List<MovieDTO> allMoviesPublic = moviesMapper.toResponseList(
                moviesRepository.findByStatus(MovieStatus.PUBLIC),
                user.getId() // Truyền userId vào để xác định isFavorite
        );

        List<MovieDTO> allMoviesPrivate = moviesMapper.toResponseList(
                moviesRepository.findByStatus(MovieStatus.PRIVATE),
                user.getId() // Truyền userId vào để xác định isFavorite
        );
        return new AllMovieInfoResponse(allMoviesPublic, allMoviesPrivate);
    }


    public List<MovieDTO> getMovieSuggest(String email) {
        if (email == null || email.isEmpty()) {
            List<MovieDTO> allMoviesPublic = moviesMapper.toResponseList(
                    moviesRepository.findByStatus(MovieStatus.PUBLIC), null
            );

            // Lấy 6 bộ phim ngẫu nhiên từ danh sách phim PUBLIC
            List<MovieDTO> randomMoviesPublic = getRandomMovies(allMoviesPublic, 6);


            return randomMoviesPublic;
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        List<MovieDTO> allMoviesPublic = moviesMapper.toResponseList(
                moviesRepository.findByStatus(MovieStatus.PUBLIC), user.getId()
        );

        // Lấy 6 bộ phim ngẫu nhiên từ danh sách phim PUBLIC
        List<MovieDTO> randomMoviesPublic = getRandomMovies(allMoviesPublic, 6);

        return randomMoviesPublic;
    }

    public List<MovieDTO> getRandomMovies(List<MovieDTO> movies, int limit) {
        if (movies.size() <= limit) {
            return new ArrayList<>(movies); // Trả về danh sách có thể chỉnh sửa
        }

        List<MovieDTO> mutableMovies = new ArrayList<>(movies); // Tạo danh sách có thể chỉnh sửa
        Collections.shuffle(mutableMovies); // Xáo trộn danh sách
        return mutableMovies.stream().limit(limit).collect(Collectors.toList());
    }


    public VideoAccessResponse checkVideoAccess(IntrospectRequest introspectRequest, String email) throws ParseException, JOSEException {
        // Kiểm tra token
        IntrospectResponse introspect = authenticationService.introspect(introspectRequest);
        if (!introspect.isValid()){
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        // Tìm người dùng theo email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        // Lấy danh sách subscriptions của user theo ID
        Optional<UserSubscriptions> optionalSubscription = userSubscriptionRepository.findByUserId(user.getId());


        // Lấy gói đăng ký thực tế từ Optional
        UserSubscriptions userSubscription = optionalSubscription.get();
        if (optionalSubscription.isEmpty()) {
            throw new AppException(ErrorCode.SUBSCRIPTION_NOT_FOUND);
        }

        // Kiểm tra trạng thái của gói đăng ký
        switch (userSubscription.getStatus()) {
            case ACTIVE:
                if (userSubscription.getEndDate().isBefore(LocalDateTime.now())) {
                    // Cập nhật trạng thái thành EXPIRED
                    userSubscription.setStatus(UserSubscriptions.Status.EXPIRED);
                    userSubscriptionRepository.save(userSubscription);
                    throw new AppException(ErrorCode.SUBSCRIPTION_EXPIRED);
                }
                return new VideoAccessResponse(introspect, userSubscription.getSubscription());

            case EXPIRED:
                throw new AppException(ErrorCode.SUBSCRIPTION_EXPIRED);

            case CANCELLED:
                throw new AppException(ErrorCode.SUBSCRIPTION_CANCELLED);

            default:
                throw new AppException(ErrorCode.SUBSCRIPTION_NOT_ACTIVE);
        }
    }



}
