import React, { useState } from "react";
import Icons from "../../ultils/Icons";
import MovieItem from "./MovieItem";

const RenderListMovie = ({
  data = [],
  onUpdateFavorites,
  isFavoriteList = false,
}) => {
  const totalMovies = Array.isArray(data) ? data.length : 0;
  const totalPages = Math.max(1, Math.ceil(totalMovies / 18));

  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePageChange = (page) => {
    if (!isTransitioning && page >= 1 && page <= totalPages) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage(page);
        setIsTransitioning(false);
      }, 200);
    }
  };

  const startIndex = (currentPage - 1) * 18;
  const endIndex = startIndex + 18;
  const currentMovies = Array.isArray(data)
    ? data.slice(startIndex, endIndex)
    : [];

  const filteredMovies = isFavoriteList
    ? currentMovies.filter((item) => item.isFavorite)
    : currentMovies;

  return (
    <div className="w-full h-full md:px-[8%] px-[4%] gap-[15px] flex flex-wrap md:justify-start justify-center">
      {filteredMovies.length > 0 ? (
        filteredMovies.map((item) => (
          <MovieItem
            key={item.id}
            item={item}
            onUpdateFavorites={onUpdateFavorites}
          />
        ))
      ) : (
        <p className="text-white text-center w-full">Không có dữ liệu</p>
      )}

      <div className="w-full flex gap-1 justify-center mt-[30px] md:mb-[100px] mb-[50px]">
        <div className="paginator flex justify-center mt-[20px] gap-2">
          <button
            className="paginator__item paginator__item--prev text-white md:w-[40px] w-[30px] md:h-[40px] h-[30px] flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-[8px]"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isTransitioning}
          >
            <Icons.Home.left />
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`paginator__item text-white md:w-[40px] w-[30px] md:h-[40px] h-[30px] flex items-center justify-center font-bold ${
                currentPage === index + 1
                  ? "border-[1px] border-[#f9ab00]"
                  : "bg-gray-800 hover:text-[#f9ab00]"
              } rounded-[8px]`}
              onClick={() => handlePageChange(index + 1)}
              disabled={isTransitioning}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="paginator__item paginator__item--next text-white md:w-[40px] w-[30px] md:h-[40px] h-[30px] flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-[8px]"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isTransitioning}
          >
            <Icons.Home.right />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenderListMovie;
