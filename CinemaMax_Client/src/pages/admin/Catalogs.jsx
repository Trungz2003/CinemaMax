import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../../components/admin/Navbar";
import Icons from "../../ultils/Icons";
import { Link } from "react-router-dom";
import Filter from "../../components/admin/Filter";
import SearchBox from "../../components/admin/SearchBox";
import fuzzy from "fuzzy";
import path from "../../ultils/Path";
import { getMoviesAdmin } from "../../apis/server/Catalog";
import { ShowToast } from "../../ultils/ToastUtils";
import MovieTable from "../../components/admin/MoviesTable";

const RenderCatalogs = () => {
  const [sortOption, setSortOption] = useState("Ngày tạo");
  const [searchQuery, setSearchQuery] = useState(""); // Thêm state cho tìm kiếm
  const [currentPage, setCurrentPage] = useState(1); // Để reset lại trang khi tìm kiếm thay đổi
  const [dataMovies, setDataMovies] = useState([]);
  const [totalMovie, setTotalMovie] = useState(0);

  const handleSortChange = (option) => {
    let sortedData = [...dataMovies];

    switch (option.name) {
      case "Xếp hạng": // Sắp xếp theo lượt thích (like)
        sortedData.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case "Ngày tạo": // Sắp xếp theo ngày tạo
        sortedData.sort((a, b) => {
          const dateA = a.releaseDate ? new Date(a.releaseDate) : new Date(0);
          const dateB = b.releaseDate ? new Date(b.releaseDate) : new Date(0);
          return dateB - dateA;
        });
        break;
      case "Lượt xem": // Sắp xếp theo lượt xem
        sortedData.sort((a, b) => (b.view ?? 0) - (a.view ?? 0));
        break;
      default:
        return;
    }

    setDataMovies(sortedData);
    setSortOption(option); // Lưu lại lựa chọn đã sắp xếp
  };

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query); // Cập nhật searchQuery khi người dùng tìm kiếm
    setCurrentPage(1); // Reset về trang đầu khi tìm kiếm thay đổi
  };

  const handleGetMovie = async () => {
    const result = await getMoviesAdmin(); // Giả sử hàm này nhận ID và token
    console.log("kết quả: ", result);

    if (result.code === 0) {
      setDataMovies(result.result.movies);
      setTotalMovie(result.result.totalMovies);
    } else {
      ShowToast("error", "Không thể lấy thông tin người dùng!");
    }
  };

  useEffect(() => {
    handleGetMovie();
  }, []);

  return (
    <div className="md:px-[2%] px-[4%] w-full text-[16px] mb-[40px]">
      <div className="md:h-[80px] md:flex items-center border-b border-[#222129] box-border">
        <div className="text-[32px] md:w-[30%] w-full flex gap-[20px]">
          <div className="text-left">Danh mục</div>
          <div className="flex text-[14px] text-[#C0C0C0] items-end mb-[7px] gap-1">
            <div>Tổng cộng </div>
            <div>{totalMovie}</div>
          </div>
        </div>
        <div className="md:w-[40%] w-full flex gap-[20px] md:justify-end justify-start mt-[20px] md:mt-0">
          <Link
            to={path.ADDITEM}
            className="w-[120px] h-[45px] rounded-[8px] border-[2px] border-[#f9ab00] flex justify-center items-center"
          >
            THÊM MỤC
          </Link>

          <div className="mr-[10px] flex justify-center items-center">
            <Filter
              options={[
                { name: "Ngày tạo" },
                { name: "Xếp hạng" },
                { name: "Lượt xem" },
              ]}
              onSortChange={handleSortChange}
              dropdownWidth="100px"
              test="Sắp xếp"
            />
          </div>
        </div>
        <div className="md:w-[30%] w-full flex md:justify-end mt-[20px] md:mt-0">
          <SearchBox
            placeholderText="Tìm phim / phim truyền hình."
            onSearchQueryChange={handleSearchQueryChange}
          />
        </div>
      </div>

      <MovieTable
        title="Phim mới nhất"
        data={dataMovies}
        setData={setDataMovies}
        sortOption={sortOption}
        searchQuery={searchQuery} // Truyền searchQuery vào RenderMoviesTable
        columnTitles={{
          id: "ID",
          name: "TÊN PHIM",
          rating: "ĐÁNH GIÁ",
          type: "LOẠI",
          views: "LƯỢT XEM",
          status: "TRẠNG THÁI",
          creationDate: "NGÀY TẠO",
          actions: "HÀNH ĐỘNG",
        }}
        className="mt-[25px]"
        currentPage={currentPage} // Truyền currentPage để reset phân trang
        setCurrentPage={setCurrentPage} // Cập nhật currentPage khi phân trang thay đổi
      />
    </div>
  );
};

const Catalogs = () => {
  return (
    <div className="w-full md:h-[100vh] bg-[#1a191f] text-white md:flex">
      <div className="md:w-[18%] w-full md:h-full ">
        <Navbar />
      </div>
      <div className="md:w-[82%] w-full md:h-full  md:pt-0 pt-[70px] overflow-auto">
        <RenderCatalogs />
      </div>
    </div>
  );
};

export default Catalogs;
