package org.example.cinemamax_server.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AllMovieInfoResponse {
    List<MovieDTO> moviesPublic;
    List<MovieDTO> moviesPrivate;
}
