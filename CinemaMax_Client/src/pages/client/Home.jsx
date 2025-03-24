import React from "react";
import Navbar from "../../components/client/Navbar";
import Icons from "../../ultils/Icons";
import { useState, useEffect } from "react";
import { MoviePlans } from "../../components/client/MoviePlans";
import { Footer } from "../../components/client/Footer";
import { FilterBar } from "../../components/client/FilterBar";
import RenderListMovie from "../../components/client/RenderListMovie";
import ExpectedPremiere from "../../components/client/ExpectedPremiere";
import { getAllMovie } from "../../apis/client/Catalog";

const RenderHome = () => {
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
    <div className="w-full bg-[#1a191f]">
      <div className="w-full border-b border-gray-600 box-border relative p-0 m-0">
        <div className="w-full md:pl-[16%] pl-[12%] absolute top-[18%] text-left text-white">
          <div className="w-[84%] h-[60px] flex items-center">
            <p className="text-white md:text-[42px] text-[32px]">Ten phim</p>
            <p className="rounded-full w-[40px] h-[40px] border-2 border-green-500 ml-[10px] flex justify-center items-center text-white">
              9.2
            </p>
          </div>
          <div className="mt-[20px]">
            <p className="md:w-[470px] w-[270px]">
              Một nhà khoa học lỗi lạc khám phá ra cách khai thác sức mạnh của
              dòng hải lưu để tạo ra nguồn năng lượng mới có thể tái tạo. Nhưng
              khi công nghệ đột phá của cô rơi vào tay kẻ xấu, cô phải chạy đua
              với thời gian để ngăn chặn nó bị lợi dụng vào mục đích xấu.
            </p>
          </div>
          <div className="mt-[20px]">
            <button className="bg-transparent text-white px-[10px] py-[5px] w-[165px] h-[45px] border-[2px] border-[#faab00] rounded-md hover:bg-[#f2d19480] transition">
              XEM NGAY
            </button>
          </div>

          <div className="mt-[120px] h-[35px] flex items-center">
            <div className="flex space-x-[10px]">
              <button className=" text-white px-[10px] py-[5px] h-[35px] w-[35px] rounded-[8px] border-[2px] border-[#faab00] hover:text-[#faab00] flex justify-center items-center">
                <Icons.Home.left />
              </button>
              <button className=" text-white px-[10px] py-[5px] h-[35px] w-[35px] rounded-[8px] border-[2px] border-[#faab00] hover:text-[#faab00] flex justify-center items-center">
                <Icons.Home.right />
              </button>
            </div>

            <div className="w-[70%] flex justify-center">
              <label>
                <Icons.Home.dotBlack />
              </label>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <div className="md:w-[84%] w-[92%] h-[630px] py-[30px]">
            <img
              src="src/assets/home/slide__bg-1.jpg"
              alt=""
              className="h-full w-full rounded-[10px] shadow-lg object-cover"
            />
          </div>
        </div>
      </div>

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

      <div className="w-full h-full md:pt-[70px] pt-[40px] border-b border-gray-600 box-border">
        <MoviePlans />
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      {/* Navbar cố định */}
      <div className="w-full h-[80px]">
        <Navbar />
      </div>

      {/* Nội dung chính cuộn dưới Navbar */}
      <div className="w-full mt-[80px]">
        <RenderHome />
      </div>

      {/* Footer */}
      <div className="w-full md:h-[85px] h-[300 px]">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
