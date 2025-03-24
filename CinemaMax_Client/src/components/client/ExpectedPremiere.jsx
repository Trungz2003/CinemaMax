import React from "react";
import Icons from "../../ultils/Icons";
import { updateFavorites } from "../../apis/client/MovieItem";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ExpectedPremiere = ({ data, onUpdateFavorites, isFavorite = false }) => {
  const scrollContainerRef = useRef();
  const [favoriteState, setFavoriteState] = useState({});
  const navigate = useNavigate();

  // Hàm xử lý cuộn trái/phải
  const handleScroll = (direction) => {
    if (!scrollContainerRef.current) return; // Thêm điều kiện kiểm tra
    const scrollAmount = 200;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleToggleFavorite = async (id) => {
    try {
      const response = await updateFavorites(id, navigate);
      if (response.code === 0) {
        setFavoriteState((prev) => ({
          ...prev,
          [id]: !prev[id], // Cập nhật trạng thái yêu thích của phim có id đó
        }));
        onUpdateFavorites(id, isFavorite); // Cập nhật danh sách phim yêu thích trong component cha
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full md:pt-[80px] pt-[40px] md:pb-[40px] pb-0 md:px-[8%] px-[4%] border-b border-gray-600 box-border">
      <div className="text-white w-full md:flex">
        <div className="w-[80%] text-left md:text-[30px] text-[17px]">
          <p>Dự kiến ​​công chiếu</p>
        </div>

        <div className="flex md:justify-end md:mt-0 mt-[10px] justify-between items-center w-full gap-4">
          {/* Button "XEM TẤT CẢ" */}
          <div className="w-full md:w-auto flex justify-start md:justify-end">
            <button className="bg-[#222129] text-white px-[10px] py-[5px] h-[35px] transition flex justify-center items-center rounded-[8px] border-[2px] border-[#faab00] hover:text-[#faab00]">
              XEM TẤT CẢ
            </button>
          </div>

          {/* Các button cuộn */}
          <div className="w-full md:w-auto flex justify-end gap-4">
            <button
              onClick={() => handleScroll("left")}
              className="text-white px-[10px] py-[5px] h-[35px] w-[35px] rounded-[8px] border-[2px] border-[#faab00] hover:text-[#faab00] flex justify-center items-center"
            >
              <Icons.Home.left />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="text-white px-[10px] py-[5px] h-[35px] w-[35px] rounded-[8px] border-[2px] border-[#faab00] hover:text-[#faab00] flex justify-center items-center"
            >
              <Icons.Home.right />
            </button>
          </div>
        </div>
      </div>
      {/* Container chứa video */}
      <div
        ref={scrollContainerRef} // Gán ref vào đây để cuộn
        className="md:mt-5 mt-[10px] md:h-[400px] h-[300px] flex overflow-x-auto gap-4 scrollbar-hide"
      >
        {data.map((item) => (
          <div
            key={item.id}
            className=" md:w-[200px] w-[130px] md:h-[360px] h-[230px] shrink-0"
          >
            <div className="relative w-full flex items-center mt-[20px] group justify-center">
              <div className="absolute left-0 flex items-center md:px-[15px] px-[8px] md:top-[20px] top-[10px] z-20">
                <p className="rounded-full md:w-[35px] md:h-[35px]  w-[18px] h-[18px] md:text-[14px] text-[10px] border-2 border-green-500 flex justify-center items-center text-white font-bold bg-[rgba(23,20,20,0.5)]">
                  {item.averageRating}
                </p>
              </div>
              <div className="absolute right-0 flex items-center md:px-[15px] px-[8px] md:top-[20px] top-[10px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto z-20">
                <button
                  onClick={() => handleToggleFavorite(item.id)}
                  className={`md:w-[36px] md:h-[36px] w-[18px] h-[18px] font-bold text-[16px] flex justify-center items-center bg-black rounded-[8px] ${
                    favoriteState[item.id] ? "text-[#faab00]" : "text-white"
                  }`}
                >
                  <Icons.Home.bookmark />
                </button>
              </div>
              <div className="absolute flex justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto z-10">
                <div
                  className="md:w-[60px] w-[40px] md:h-[60px] h-[40px] bg-white md:text-[24px] text-[15px] text-[#faab00]
                flex justify-center items-center rounded-[50%]
                md:border-[6px] border-[3px] border-solid border-[#827b7b]
                box-border hover:border-[#af9660]"
                >
                  <Icons.Home.playFilled />
                </div>
              </div>
              <div className="md:w-full h-full rounded-[8px] relative hover:bg-black hover:bg-opacity-10">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full rounded-[8px] object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full rounded-[8px] bg-black bg-opacity-10 hover:bg-opacity-[0.4] transition-all z-0"></div>
              </div>
            </div>
            <div className="w-full mt-[15px]">
              <p className="w-full h-full  md:text-[18px] text-[14px] text-white text-left truncate">
                {item.title}
              </p>
            </div>
            <div className="w-full text-[#f9ab00] md:text-[14px] text-[10px] flex gap-1">
              {item.genres.map((genre, index) => (
                <p
                  key={index}
                  className="hover:underline decoration-[1px] hover:cursor-pointer"
                >
                  {genre.name}
                  {index < item.genres.length - 1 && ","}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpectedPremiere;
