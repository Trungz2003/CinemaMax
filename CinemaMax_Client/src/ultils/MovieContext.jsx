import { createContext, useContext, useState, useEffect } from "react";
import { getAllMovie } from "../apis/client/Catalog";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [moviesPublic, setMoviesPublic] = useState([]);
  const [moviesPrivate, setMoviesPrivate] = useState([]);

  const handleUpdateMoviePublic = (movieId, isCurrentlyFavorite) => {
    setMoviesPublic((prevFavorites) =>
      prevFavorites.map((movie) =>
        movie.id === movieId
          ? { ...movie, isFavorite: !isCurrentlyFavorite }
          : movie
      )
    );
  };

  const handleUpdateMoviePrivate = (movieId) => {
    setMoviesPrivate((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === movieId
          ? { ...movie, isFavorite: !movie.isFavorite }
          : movie
      )
    );
  };

  const handleUpdateMovieRating = (movieId, newRating, totalReviews) => {
    setMoviesPublic((prevMovies) =>
      prevMovies.map((movie) => {
        if (movie.id === Number(movieId)) {
          const currentAverage = movie.averageRating || 0; // Điểm trung bình hiện tại

          // Tính toán điểm trung bình mới
          const updatedAverage =
            (currentAverage * totalReviews + newRating) / (totalReviews + 1);

          return {
            ...movie,
            averageRating: updatedAverage.toFixed(1), // Làm tròn 1 chữ số thập phân
          };
        }
        return movie;
      })
    );

    setMoviesPrivate((prevMovies) =>
      prevMovies.map((movie) => {
        if (movie.id === Number(movieId)) {
          const currentAverage = movie.averageRating || 0;
          const updatedAverage =
            (currentAverage * totalReviews + newRating) / (totalReviews + 1);

          return {
            ...movie,
            averageRating: updatedAverage.toFixed(1),
          };
        }
        return movie;
      })
    );
  };

  const handleToggleFavoriteMovie = (movieId) => {
    setMoviesPublic((prevMovies) => {
      const index = prevMovies.findIndex((movie) => movie.id === movieId);
      if (index === -1) return prevMovies; // Không tìm thấy, return luôn

      const updatedMovies = [...prevMovies];
      updatedMovies[index] = {
        ...updatedMovies[index],
        isFavorite: !updatedMovies[index].isFavorite, // ✅ Sửa lỗi ở đây
      };
      return updatedMovies;
    });

    setMoviesPrivate((prevMovies) => {
      const index = prevMovies.findIndex((movie) => movie.id === movieId);
      if (index === -1) return prevMovies;

      const updatedMovies = [...prevMovies];
      updatedMovies[index] = {
        ...updatedMovies[index],
        isFavorite: !updatedMovies[index].isFavorite, // ✅ Sửa lỗi ở đây
      };
      return updatedMovies;
    });
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getAllMovie();

        if (response.code === 0) {
          setMoviesPublic(response.result.moviesPublic || []);
          setMoviesPrivate(response.result.moviesPrivate || []);
        }
      } catch (error) {
        console.error("Lỗi khi lấy phim:", error);
      }
    };

    fetchMovies();
  }, []);
  return (
    <MovieContext.Provider
      value={{
        moviesPublic,
        handleUpdateMoviePublic,
        moviesPrivate,
        handleUpdateMoviePrivate,
        handleUpdateMovieRating,
        handleToggleFavoriteMovie,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);
