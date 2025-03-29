import React from "react";
import Navbar from "../../components/client/Navbar";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import path from "../../ultils/Path";
import { MoviePlans } from "../../components/client/MoviePlans";
import { Footer } from "../../components/client/Footer";
import { FilterBar } from "../../components/client/FilterBar";
import RenderListMovie from "../../components/client/RenderListMovie";
import ExpectedPremiere from "../../components/client/ExpectedPremiere";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { ShowToast } from "../../ultils/ToastUtils";
import { useMovies } from "../../ultils/MovieContext";

const MovieSlider = () => {
  const [randomMovies, setRandomMovies] = useState([]);
  const navigate = useNavigate();
  const { moviesPublic } = useMovies();

  useEffect(() => {
    if (moviesPublic.length > 0) {
      const shuffled = [...moviesPublic].sort(() => 0.5 - Math.random());
      setRandomMovies(shuffled.slice(0, 3));
    }
  }, [moviesPublic]);

  const handleSelectMovie = (movie) => {
    let selectedMovies =
      JSON.parse(localStorage.getItem("selectedMovies")) || [];

    // Tìm phim trong danh sách
    const existingMovie = selectedMovies.find((item) => item.id === movie.id);

    if (!existingMovie) {
      // Nếu chưa có, thêm vào danh sách
      selectedMovies.push(movie);
      localStorage.setItem("selectedMovies", JSON.stringify(selectedMovies));
    }

    // Ghi đè `selectedMoviesById` với phim mới nhất
    localStorage.setItem("selectedMoviesById", JSON.stringify([movie]));

    navigate(`${path.DETAILS}/${movie.id}`);
  };

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      slidesPerView={1}
      spaceBetween={30}
      speed={500} // Tốc độ trượt (ms)
      threshold={1} // Giảm ngưỡng vuốt (mặc định là 20)
      touchRatio={2} // Tăng độ nhạy khi vuốt
      touchReleaseOnEdges={true} // Cho phép vuốt nhanh trên mép
      className="w-full custom-pagination"
    >
      {randomMovies.map((movie, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-[630px] px-[8%] pt-[3%] pb-[3%] border-b border-gray-600 box-border">
            {/* Ảnh nền */}
            <img
              src={movie.thumbnail || "src/assets/home/slide__bg-1.jpg"}
              alt={movie.title}
              className="w-full h-full object-cover rounded-[10px] shadow-lg"
            />

            {/* Nội dung overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-start md:pl-[16%] pl-[12%] text-white bg-[#1a191f]/40">
              <div className="w-[80%] flex items-center gap-[15px]">
                <h2 className="text-white md:text-[42px] text-[26px] font-bold md:w-auto w-[70%] text-left">
                  {movie.title}
                </h2>
                <p className="rounded-full w-[40px] h-[40px] border-2 border-green-500 flex justify-center items-center text-white">
                  {movie.averageRating}
                </p>
              </div>
              <p className="md:w-[470px] w-[270px] mt-[10px] text-left">
                {movie.description}
              </p>

              <button
                className="mt-[20px] bg-transparent text-white px-[10px] py-[5px] w-[165px] h-[45px] border-[2px] border-[#faab00] rounded-md hover:bg-[#f2d19480] transition"
                onClick={() => handleSelectMovie(movie)}
              >
                XEM NGAY
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const RenderHome = () => {
  const {
    moviesPublic,
    handleUpdateMoviePublic,
    moviesPrivate,
    handleUpdateMoviePrivate,
  } = useMovies();
  const [filteredMoviesPublic, setFilteredMoviesPublic] =
    useState(moviesPublic);
  const [genre, setGenre] = useState(null);
  const [rating, setRating] = useState([]);
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const failed = searchParams.get("failed");
  const navigate = useNavigate();

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
    if (success !== null) {
      ShowToast("success", "Thanh toán thành công!");
      navigate("/"); // Chuyển hướng về "/" sau 2 giây
    } else if (failed !== null) {
      ShowToast("error", "Thanh toán thất bại!");
      navigate("/");
    }
  }, [success, failed, navigate]);

  useEffect(() => {
    setFilteredMoviesPublic(moviesPublic);
  }, [moviesPublic]);

  return (
    <div className="w-full bg-[#1a191f]">
      <MovieSlider />

      <FilterBar setGenre={setGenre} setRating={setRating} />

      <div className="w-full h-full md:pt-[70px] pt-[40px] border-b border-gray-600 box-border">
        <RenderListMovie
          data={filteredMoviesPublic || moviesPublic}
          onUpdateFavorites={handleUpdateMoviePublic}
        />
      </div>

      <ExpectedPremiere
        data={moviesPrivate}
        onUpdateFavorites={handleUpdateMoviePrivate}
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
