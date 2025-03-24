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
const RenderCatalog = () => {
  const [moviePublicData, setMoviePublicData] = useState([]);
  const [moviePrivateData, setMoviePrivateData] = useState([]);

  const handleUpdateMovie = (movieId, isCurrentlyFavorite) => {
    setMoviePublicData((prevFavorites) =>
      prevFavorites.map((movie) =>
        movie.id === movieId
          ? { ...movie, isFavorite: !isCurrentlyFavorite }
          : movie
      )
    );
  };
  useEffect(() => {
    const fetchAllMovie = async () => {
      try {
        const response = await getAllMovie();
        if (response.code === 0) {
          setMoviePublicData(response.result.moviesPublic);
          setMoviePrivateData(response.result.moviesPrivate);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllMovie();
  }, []);
  return (
    <div className="bg-[#1a191f] text-white w-full border-b border-gray-600 box-border">
      <PageTitle title="Danh mục" />
      <FilterBar />
      <div className="w-full h-full md:pt-[70px] pt-[40px] border-b border-gray-600 box-border">
        <RenderListMovie
          data={moviePublicData}
          onUpdateFavorites={handleUpdateMovie}
        />
      </div>

      <ExpectedPremiere
        data={moviePrivateData}
        onUpdateFavorites={handleUpdateMovie}
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
