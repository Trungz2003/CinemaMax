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

  const handleUpdateMoviePrivate = (movieId, isCurrentlyFavorite) => {
    setMoviesPrivate((prevFavorites) =>
      prevFavorites.map((movie) =>
        movie.id === movieId
          ? { ...movie, isFavorite: !isCurrentlyFavorite }
          : movie
      )
    );
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log("📢 Gọi API khi ứng dụng khởi động...");
        const response = await getAllMovie();
        console.log("✅ API trả về:", response.result); // 👀 Log dữ liệu API

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
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);
