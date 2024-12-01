import React from "react";
import Navbar from "../components/Navbar";
import Icons from "../ultils/Icons";
import { useState } from "react";
import { MoviePlans } from "../components/MoviePlans";
import { Footer } from "../components/Footer";
import { FilterBar } from "../components/FilterBar";

const fakeData = [
  {
    id: 1,
    title: "I Dream in Another Language",
    rating: 9.2,
    categories: ["Hoạt động", "Giật gân"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 2,
    title: "The Silent Voice",
    rating: 8.7,
    categories: ["Hoạt hình", "Tình cảm"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 3,
    title: "Interstellar",
    rating: 9.5,
    categories: ["Khoa học", "Phiêu lưu"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 4,
    title: "Parasite",
    rating: 8.6,
    categories: ["Tâm lý", "Giật gân"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 5,
    title: "The Dark Knight",
    rating: 9.0,
    categories: ["Hành động", "Tội phạm"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 6,
    title: "Inception",
    rating: 8.8,
    categories: ["Khoa học", "Giật gân"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 7,
    title: "The Matrix",
    rating: 9.3,
    categories: ["Khoa học", "Hành động"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 8,
    title: "Coco",
    rating: 8.4,
    categories: ["Gia đình", "Hoạt hình"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 9,
    title: "Avatar",
    rating: 8.2,
    categories: ["Phiêu lưu", "Khoa học"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 10,
    title: "Spirited Away",
    rating: 9.1,
    categories: ["Hoạt hình", "Phiêu lưu"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 11,
    title: "The Godfather",
    rating: 9.2,
    categories: ["Tội phạm", "Tâm lý"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 12,
    title: "The Shawshank Redemption",
    rating: 9.7,
    categories: ["Tâm lý", "Cổ điển"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 13,
    title: "Pulp Fiction",
    rating: 9.0,
    categories: ["Tội phạm", "Tâm lý"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 14,
    title: "The Lion King",
    rating: 8.5,
    categories: ["Gia đình", "Hoạt hình"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 15,
    title: "Frozen",
    rating: 8.0,
    categories: ["Hoạt hình", "Gia đình"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 16,
    title: "Whiplash",
    rating: 8.9,
    categories: ["Tâm lý", "Âm nhạc"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 17,
    title: "Avengers: Endgame",
    rating: 8.4,
    categories: ["Hành động", "Phiêu lưu"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 18,
    title: "Joker",
    rating: 8.6,
    categories: ["Tâm lý", "Tội phạm"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 19,
    title: "Toy Story 4",
    rating: 8.3,
    categories: ["Gia đình", "Hoạt hình"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 20,
    title: "Black Panther",
    rating: 8.2,
    categories: ["Hành động", "Khoa học"],
    image: "src/assets/test/cover.png",
  },
];

const totalMovies = fakeData.length; // Tổng số bộ phim
const totalPages = Math.ceil(totalMovies / 18);

const RenderListMovie = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePageChange = (page) => {
    if (!isTransitioning && page >= 1 && page <= totalPages) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage(page);
        setIsTransitioning(false);
      }, 200); // Thời gian chậm trễ là 300ms
    }
  };

  // Tính toán chỉ mục bắt đầu và kết thúc của bộ phim cho mỗi trang
  const startIndex = (currentPage - 1) * 18;
  const endIndex = startIndex + 18;
  const currentMovies = fakeData.slice(startIndex, endIndex);

  return (
    <div className="w-full h-full md:px-[8%] px-[4%] gap-[15px] flex flex-wrap md:justify-start justify-center border-b border-gray-600 box-border">
      {currentMovies.map((item) => (
        <div
          key={item.id}
          className=" md:w-[200px] w-[130px] md:h-[360px] h-[230px] mt-[20px]"
        >
          <div className="relative w-full flex items-center mt-[25px] group justify-center">
            <div className="absolute left-0 flex items-center md:px-[15px] px-[8px] md:top-[20px] top-[10px] z-20">
              <p className="rounded-full md:w-[35px] md:h-[35px]  w-[18px] h-[18px] md:text-[14px] text-[10px] border-2 border-green-500 flex justify-center items-center text-white font-bold bg-[rgba(23,20,20,0.5)]">
                {item.rating}
              </p>
            </div>

            <div className="absolute right-0 flex items-center md:px-[15px] px-[8px] md:top-[20px] top-[10px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto z-20">
              <button className="md:w-[36px] md:h-[36px] w-[18px] h-[18px] text-white font-bold text-[16px] flex justify-center items-center bg-black rounded-[8px]">
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
                src={item.image}
                alt={item.title}
                className="w-full h-full rounded-[8px] object-cover"
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
            {item.categories.map((category, index) => (
              <p
                key={index}
                className="hover:underline decoration-[1px] hover:cursor-pointer"
              >
                {category}
                {index < item.categories.length - 1 && ","}
              </p>
            ))}
          </div>
        </div>
      ))}

      <div className="w-full flex gap-1 justify-center mt-[30px] md:mb-[100px] mb-[50px]">
        <div className="paginator flex justify-center mt-[20px] gap-2">
          <button
            className="paginator__item paginator__item--prev text-white md:w-[40px] w-[30px] md:h-[40px] h-[30px] flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-[8px]"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isTransitioning}
          >
            <Icons.Home.left />
          </button>

          {/* Hiển thị các nút phân trang */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`paginator__item text-white md:w-[40px] w-[30px] md:h-[40px] h-[30px] flex items-center justify-center font-bold ${
                currentPage === index + 1
                  ? " border-[1px] border-[#f9ab00]"
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

const RenderTest = () => {
  const scrollContainerRef = React.useRef();

  // Hàm xử lý cuộn trái/phải
  const handleScroll = (direction) => {
    if (!scrollContainerRef.current) return; // Thêm điều kiện kiểm tra
    const scrollAmount = 200;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
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
        {fakeData.map((item) => (
          <div
            key={item.id}
            className=" md:w-[200px] w-[130px] md:h-[360px] h-[230px] shrink-0"
          >
            <div className="relative w-full flex items-center mt-[20px] group justify-center">
              <div className="absolute left-0 flex items-center md:px-[15px] px-[8px] md:top-[20px] top-[10px] z-20">
                <p className="rounded-full md:w-[35px] md:h-[35px]  w-[18px] h-[18px] md:text-[14px] text-[10px] border-2 border-green-500 flex justify-center items-center text-white font-bold bg-[rgba(23,20,20,0.5)]">
                  {item.rating}
                </p>
              </div>
              <div className="absolute right-0 flex items-center md:px-[15px] px-[8px] md:top-[20px] top-[10px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto z-20">
                <button className="md:w-[36px] md:h-[36px] w-[18px] h-[18px] text-white font-bold text-[16px] flex justify-center items-center bg-black rounded-[8px]">
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
                  src={item.image}
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
              {item.categories.map((category, index) => (
                <p
                  key={index}
                  className="hover:underline decoration-[1px] hover:cursor-pointer"
                >
                  {category}
                  {index < item.categories.length - 1 && ","}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RenderHome = () => {
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
              A brilliant scientist discovers a way to harness the power of the
              ocean's currents to create a new, renewable energy source. But
              when her groundbreaking technology falls into the wrong hands, she
              must race against time to stop it from being used for evil.
            </p>
          </div>
          <div className="mt-[20px]">
            <button className="bg-transparent text-white px-[10px] py-[5px] w-[165px] h-[45px] border-[2px] border-[#faab00] rounded-md hover:bg-[#f2d19480] transition">
              WATCH NOW
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

      <RenderListMovie />

      <RenderTest />

      <MoviePlans />
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
