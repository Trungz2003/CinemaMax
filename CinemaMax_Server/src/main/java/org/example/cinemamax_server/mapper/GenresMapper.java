package org.example.cinemamax_server.mapper;

import org.example.cinemamax_server.dto.response.GenreResponse;
import org.example.cinemamax_server.entity.Genre;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GenresMapper {
    // Ánh xạ từ Movies entity thành MoviesResponse
    GenreResponse toResponse(Genre entity);
}
