package org.example.cinemamax_server.service;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.cinemamax_server.dto.response.GenreResponse;
import org.example.cinemamax_server.entity.Genre;
import org.example.cinemamax_server.exception.AppException;
import org.example.cinemamax_server.exception.ErrorCode;
import org.example.cinemamax_server.mapper.GenresMapper;
import org.example.cinemamax_server.repository.GenresRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Builder
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class GenresService {
    GenresRepository genresRepository;
    GenresMapper genresMapper;  // Thêm mapper vào service

    // Phương thức lấy tất cả thể loại
    public List<GenreResponse> getAllGenres() {
        // Lấy tất cả thể loại từ cơ sở dữ liệu
        List<Genre> genres = genresRepository.findAll();

        // Nếu không có thể loại nào, ném lỗi
        if (genres.isEmpty()) {
            throw new AppException(ErrorCode.NOT_FOUND);
        }

        // Ánh xạ từ Genre sang GenreResponse và trả về
        return genres.stream()
                .map(genresMapper::toResponse)  // Sử dụng mapper để ánh xạ
                .collect(Collectors.toList());
    }
}
