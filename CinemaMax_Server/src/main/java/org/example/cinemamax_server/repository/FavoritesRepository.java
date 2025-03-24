package org.example.cinemamax_server.repository;

import org.example.cinemamax_server.entity.Favorites;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoritesRepository extends JpaRepository<Favorites, Integer> {
    void deleteByUserId(int userId);

    @Modifying
    @Query("DELETE FROM Favorites f WHERE f.movie.id = :movieId")
    void deleteFavoritesByMovieId(@Param("movieId") int movieId);

    List<Favorites> findByUserId(Long userId);

    boolean existsByUserIdAndMovieId(Long userId, Long movieId);

    // Lấy bản ghi yêu thích dựa trên userId và movieId
    Optional<Favorites> findByUserIdAndMovieId(Long userId, int movieId);

}
