import React, { useState } from "react";
import Icons from "../../ultils/Icons";
import { updateFavorites } from "../../apis/client/MovieItem";
import { useNavigate } from "react-router-dom";
import path from "../../ultils/Path";

const MovieItem = ({ item, onUpdateFavorites }) => {
  const [isFavorite, setIsFavorite] = useState(item.isFavorite);
  const navigate = useNavigate();

  const handleToggleFavorite = async () => {
    try {
      const response = await updateFavorites(item.id, navigate);

      if (response.code === 0) {
        setIsFavorite(!isFavorite); // Cập nhật UI sau khi API thành công
        onUpdateFavorites(item.id, isFavorite); // Cập nhật danh sách phim yêu thích trong component cha
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectMovie = (id) => {
    navigate(`${path.DETAILS}/${id}`);
  };

  const handleGenreClick = (genre) => {
    navigate(`${path.CATALOG}?genre=${encodeURIComponent(genre)}`); // Chuyển hướng sang /catalog với query params
  };

  if (!item) return <p className="text-white">Dữ liệu phim bị lỗi</p>;

  return (
    <div className="md:w-[200px] w-[130px] md:h-[360px] h-[230px] mt-[20px]">
      <div className="relative w-full flex items-center mt-[25px] group justify-center">
        <div className="absolute left-0 flex items-center md:px-[15px] px-[8px] md:top-[20px] top-[10px] z-20">
          <p className="rounded-full md:w-[35px] md:h-[35px] w-[18px] h-[18px] md:text-[14px] text-[10px] border-2 border-green-500 flex justify-center items-center text-white font-bold bg-[rgba(23,20,20,0.5)]">
            {item.averageRating}
          </p>
        </div>

        {/* Nút Yêu Thích */}
        <div className="absolute right-0 flex items-center md:px-[15px] px-[8px] md:top-[20px] top-[10px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto z-20">
          <button
            onClick={handleToggleFavorite}
            className={`md:w-[36px] md:h-[36px] w-[18px] h-[18px] font-bold text-[16px] flex justify-center items-center bg-black rounded-[8px] ${
              isFavorite ? "text-[#faab00]" : "text-white"
            }`}
          >
            <Icons.Home.bookmark />
          </button>
        </div>

        <div
          className="absolute flex justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto z-10"
          onClick={() => handleSelectMovie(item.id)} // Xử lý click
        >
          <div
            className="md:w-[60px] w-[40px] md:h-[60px] h-[40px] bg-white md:text-[24px] text-[15px] text-[#faab00]
              flex justify-center items-center rounded-[50%]
              md:border-[6px] border-[3px] border-solid border-[#827b7b]
              box-border hover:border-[#af9660] cursor-pointer"
          >
            <Icons.Home.playFilled />
          </div>
        </div>

        <div className="md:w-full h-full rounded-[8px] relative hover:bg-black hover:bg-opacity-10">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full aspect-[3/4] rounded-[8px] object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full rounded-[8px] bg-black bg-opacity-10 hover:bg-opacity-[0.4] transition-all z-0"></div>
        </div>
      </div>

      <div className="w-full mt-[15px]">
        <p className="w-full h-full md:text-[18px] text-[14px] text-white text-left truncate">
          {item.title}
        </p>
      </div>

      <div className="w-full text-[#f9ab00] md:text-[14px] text-[10px] flex gap-1">
        {item.genres.map((genre, index) => (
          <span key={genre.id}>
            <span
              className="hover:underline decoration-[1px] hover:cursor-pointer"
              onClick={() => {
                handleGenreClick(genre.name);
              }}
            >
              {genre.name}
            </span>
            {index < item.genres.length - 1 && <span>, </span>}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MovieItem;
