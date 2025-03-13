package org.example.cinemamax_server.mapper;

import org.example.cinemamax_server.dto.request.MoviesRequest;
import org.example.cinemamax_server.dto.response.AddMoviesRespone;
import org.example.cinemamax_server.entity.Movies;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MoviesMapper {

    // Ánh xạ từ MoviesRequest thành Movies entity
    Movies toEntity(MoviesRequest request);

    // Ánh xạ từ Movies entity thành MoviesResponse
    AddMoviesRespone toResponse(Movies entity);
}
