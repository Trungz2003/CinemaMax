import React from "react";
import Navbar from "../../components/client/Navbar";
import { Footer } from "../../components/client/Footer";
import PageTitle from "../../components/client/PageTitle";
import { FilterBar } from "../../components/client/FilterBar";
import RenderListMovie from "../../components/client/RenderListMovie";
import ExpectedPremiere from "../../components/client/ExpectedPremiere";
import { useEffect } from "react";
import { getAllMovie } from "../../apis/client/Catalog";
import { useState } from "react";
import { useMovies } from "../../ultils/MovieContext";
import { useLocation } from "react-router-dom";
const RenderCatalog = () => {
  const [genre, setGenre] = useState(null);
  const [rating, setRating] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const genreUrl = queryParams.get("genre");
  const searchQuery = queryParams.get("search");
  const {
    moviesPublic,
    handleUpdateMoviePublic,
    moviesPrivate,
    handleUpdateMoviePrivate,
  } = useMovies();
  const [filteredMoviesPublic, setFilteredMoviesPublic] =
    useState(moviesPublic);
  const [filteredMoviesPrivate, setFilteredMoviesPrivate] =
    useState(moviesPrivate);

  useEffect(() => {
    let filtered = moviesPublic;

    // Chuyển tất cả về mảng để tránh lỗi
    const genreArray = genre ? (Array.isArray(genre) ? genre : [genre]) : [];
    const ratingArray = rating
      ? Array.isArray(rating)
        ? rating
        : [rating]
      : [];

    // Lọc theo thể loại
    if (genreArray.length > 0) {
      filtered = filtered.filter((movie) =>
        genreArray.some((g) => movie.genres.some((mg) => mg.id === g.id))
      );
    }

    // Lọc theo ID của rating
    if (ratingArray.length > 0) {
      filtered = filtered.filter((movie) =>
        ratingArray.some((r) => movie.averageRating === r.id)
      );
    }

    setFilteredMoviesPublic(filtered);
  }, [genre, rating]);

  useEffect(() => {
    setFilteredMoviesPublic(moviesPublic);
    setFilteredMoviesPrivate(moviesPrivate);
  }, [moviesPublic]);

  useEffect(() => {
    const filterMovies = (movies) => {
      let filtered = movies;

      if (genreUrl) {
        const decodedGenre = decodeURIComponent(genreUrl).toLowerCase();
        filtered = filtered.filter((movie) =>
          movie.genres.some((g) => g.name.toLowerCase() === decodedGenre)
        );
      }

      if (searchQuery) {
        const decodedSearch = decodeURIComponent(searchQuery).toLowerCase();
        filtered = filtered.filter((movie) =>
          movie.title.toLowerCase().includes(decodedSearch)
        );
      }

      return filtered;
    };

    setFilteredMoviesPublic(filterMovies(moviesPublic));
    setFilteredMoviesPrivate(filterMovies(moviesPrivate));
  }, [searchQuery, genreUrl, moviesPublic, moviesPrivate]);
  return (
    <div className="bg-[#1a191f] text-white w-full border-b border-gray-600 box-border">
      <PageTitle title="Danh mục" />
      <FilterBar setGenre={setGenre} setRating={setRating} />
      <div className="w-full h-full md:pt-[70px] pt-[40px] border-b border-gray-600 box-border">
        <RenderListMovie
          data={filteredMoviesPublic || moviesPublic}
          onUpdateFavorites={handleUpdateMoviePublic}
        />
      </div>

      <ExpectedPremiere
        data={filteredMoviesPrivate || moviesPrivate}
        onUpdateFavorites={handleUpdateMoviePrivate}
      />
    </div>
  );
};

const Catalog = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-full h-[80px]">
        <Navbar />
      </div>
      <div className="w-full mt-[80px]">
        <RenderCatalog />
      </div>
      <div className="w-full md:h-[85px] h-[300px]">
        <Footer />
      </div>
    </div>
  );
};

export default Catalog;
