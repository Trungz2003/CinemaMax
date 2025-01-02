import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../../components/admin/Navbar";
import Icons from "../../ultils/Icons";
import { Link } from "react-router-dom";
import Filter from "../../components/admin/Filter";
import SearchBox from "../../components/admin/SearchBox";
import fuzzy from "fuzzy";

const data = [
  {
    id: 1,
    title: "Tôi mơ bằng một ngôn ngữ khác",
    rating: 7.9,
    type: "Bộ phim",
    views: 1392,
    status: "Public",
    creationDate: "2023-02-05",
  },
  {
    id: 2,
    title: "Hành trình mới",
    rating: 8.1,
    type: "Bộ phim",
    views: 1150,
    status: "Private",
    creationDate: "2023-03-12",
  },
  {
    id: 3,
    title: "Mặt trời không bao giờ tắt",
    rating: 7.5,
    type: "Series",
    views: 980,
    status: "Public",
    creationDate: "2023-04-01",
  },
  {
    id: 4,
    title: "Người dũng cảm",
    rating: 6.8,
    type: "Bộ phim",
    views: 1145,
    status: "Private",
    creationDate: "2023-02-23",
  },
  {
    id: 5,
    title: "Chuyến bay cuối cùng",
    rating: 8.3,
    type: "Series",
    views: 1500,
    status: "Public",
    creationDate: "2023-05-15",
  },
  {
    id: 6,
    title: "Những đám mây trên bầu trời",
    rating: 7.2,
    type: "Bộ phim",
    views: 1342,
    status: "Public",
    creationDate: "2023-06-22",
  },
  {
    id: 7,
    title: "Làm lại từ đầu",
    rating: 8.0,
    type: "Bộ phim",
    views: 1023,
    status: "Private",
    creationDate: "2023-07-10",
  },
  {
    id: 8,
    title: "Cuộc sống sau tai nạn",
    rating: 6.9,
    type: "Series",
    views: 756,
    status: "Public",
    creationDate: "2023-08-19",
  },
  {
    id: 9,
    title: "Mắt xích cuối cùng",
    rating: 7.4,
    type: "Bộ phim",
    views: 1265,
    status: "Private",
    creationDate: "2023-09-30",
  },
  {
    id: 10,
    title: "Chạy trốn",
    rating: 8.5,
    type: "Bộ phim",
    views: 1900,
    status: "Public",
    creationDate: "2023-10-12",
  },
  {
    id: 11,
    title: "Linh hồn tôi",
    rating: 7.8,
    type: "Series",
    views: 1024,
    status: "Private",
    creationDate: "2023-11-05",
  },
  {
    id: 12,
    title: "Thế giới song song",
    rating: 7.6,
    type: "Bộ phim",
    views: 1150,
    status: "Public",
    creationDate: "2023-11-22",
  },
  {
    id: 13,
    title: "Màn đêm buông xuống",
    rating: 8.0,
    type: "Series",
    views: 1450,
    status: "Private",
    creationDate: "2023-12-01",
  },
  {
    id: 14,
    title: "Cuộc chiến vô nghĩa",
    rating: 6.7,
    type: "Bộ phim",
    views: 1102,
    status: "Public",
    creationDate: "2023-12-10",
  },
  {
    id: 15,
    title: "Thử thách cuối cùng",
    rating: 8.3,
    type: "Series",
    views: 1540,
    status: "Public",
    creationDate: "2023-12-20",
  },
  {
    id: 16,
    title: "Cuộc sống xa lạ",
    rating: 7.0,
    type: "Bộ phim",
    views: 990,
    status: "Private",
    creationDate: "2024-01-08",
  },
  {
    id: 17,
    title: "Vượt qua nỗi sợ",
    rating: 8.2,
    type: "Series",
    views: 1340,
    status: "Public",
    creationDate: "2024-02-15",
  },
  {
    id: 18,
    title: "Giấc mơ của tôi",
    rating: 7.5,
    type: "Bộ phim",
    views: 1200,
    status: "Private",
    creationDate: "2024-03-28",
  },
  {
    id: 19,
    title: "Mảnh vỡ tình yêu",
    rating: 7.9,
    type: "Bộ phim",
    views: 1250,
    status: "Public",
    creationDate: "2024-04-05",
  },
  {
    id: 20,
    title: "Mảnh vỡ tình yêu",
    rating: 7.9,
    type: "Bộ phim",
    views: 1250,
    status: "Public",
    creationDate: "2024-04-05",
  },
];

const totalCatagory = 14000;

const RenderMoviesTable = ({ data, columnTitles, sortOption, searchQuery }) => {
  const itemsPerPage = 10; // Số lượng mục mỗi trang
  const [currentPage, setCurrentPage] = useState(1);

  // Lọc dữ liệu theo từ khóa tìm kiếm sử dụng fuzzy filter
  const searchData = searchQuery.trim()
    ? data.filter((item) => {
        const result = fuzzy.filter(searchQuery, [item.title]); // Tìm kiếm gần đúng tiêu đề
        return result.length > 0; // Nếu có kết quả tìm kiếm thì giữ lại
      })
    : data;

  // Sắp xếp dữ liệu đã lọc
  const sortedData = [...searchData].sort((a, b) => {
    if (sortOption === "Lượt xem") {
      return b.views - a.views;
    } else if (sortOption === "Xếp hạng") {
      return b.rating - a.rating;
    } else {
      return new Date(b.creationDate) - new Date(a.creationDate);
    }
  });

  // Tính toán số trang
  const totalMovies = sortedData.length;
  const totalPages = Math.ceil(totalMovies / itemsPerPage);

  // Cập nhật lại trang khi có thay đổi về `searchQuery`
  useEffect(() => {
    setCurrentPage(1); // Reset về trang đầu tiên khi thay đổi `searchQuery`
  }, [searchQuery]);

  // Tính toán dữ liệu cho trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMovies = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full bg-[#222129] rounded-[8px] pb-[35px] mt-[30px]">
      {/* Table Header */}
      <div className="w-full rounded-b-[8px] mt-[10px] px-[30px] overflow-x-auto">
        <div className="w-full h-[50px] border-b-[1px] border-[#1a191f] text-[12px] text-[#C0C0C0] flex">
          {Object.entries(columnTitles).map(([key, title], index) => (
            <div
              key={index}
              className={`flex-shrink-0 ${
                index === 0
                  ? "md:w-[5%] w-[50px]"
                  : index === 1
                  ? "md:w-[30%] w-[300px]"
                  : index === 2
                  ? "md:w-[8%] w-[80px]"
                  : index === 3
                  ? "md:w-[15%] w-[150px]"
                  : index === 4
                  ? "md:w-[9%] w-[90px]"
                  : index === 5
                  ? "md:w-[10%] w-[100px]"
                  : index === 6
                  ? "md:w-[10%] w-[100px]"
                  : "md:w-[15%] w-[150px]"
              } h-full flex items-center justify-start`}
            >
              {title}
            </div>
          ))}
        </div>

        {/* Table Content */}
        <div className="w-full whitespace-nowrap">
          {currentMovies.map((item, index) => (
            <div key={index} className="w-full h-[60px] flex text-white">
              <div className="flex-shrink-0 md:w-[5%] w-[50px] h-full flex items-center justify-start text-[#C0C0C0]">
                {item.id}
              </div>
              <div className="flex-shrink-0 md:w-[30%] w-[300px] h-full flex items-center justify-start text-[#fff] break-word">
                <Link
                  to={`/details/${item.id}`}
                  className="hover:text-[#f9ab00] select-none"
                >
                  {item.title}
                </Link>
              </div>
              <div className="flex-shrink-0 md:w-[8%] w-[80px] h-full flex items-center justify-start">
                {item.rating && (
                  <Icons.MyCinemaMax.star className="text-[#f9ab00]" />
                )}
                <div className={item.rating ? "font-bold" : ""}>
                  {item.rating || item.username}
                </div>
              </div>
              <div className="flex-shrink-0 md:w-[15%] w-[150px] h-full flex items-center justify-start">
                {item.type}
              </div>
              <div className="flex-shrink-0 md:w-[9%] w-[90px] h-full flex items-center justify-start">
                {item.views}
              </div>
              <div
                className="flex-shrink-0 md:w-[10%] w-[100px] h-full flex items-center justify-start"
                style={{
                  color: item.status === "Public" ? "#29B474" : "#EB5757",
                }}
              >
                {item.status}
              </div>
              <div className="flex-shrink-0 md:w-[10%] w-[100px] h-full flex items-center justify-start">
                {item.creationDate}
              </div>
              <div className="h-full items-center flex gap-[15px] justify-start">
                <button className="w-[32px] h-[32px] rounded-[8px] bg-[rgba(41,180,116,0.1)] hover:bg-[rgba(41,180,116,0.2)] text-[#29B474] flex font-bold justify-center items-center">
                  <Icons.Catalog.lock />
                </button>
                <button className="w-[32px] h-[32px] rounded-[8px] bg-[rgba(255,195,18,0.1)] hover:bg-[rgba(255,195,18,0.2)] text-[#FFC312] flex font-bold justify-center items-center">
                  <Icons.Catalog.edit />
                </button>
                <button className="w-[32px] h-[32px] rounded-[8px] bg-[rgba(235,87,87,0.1)] hover:bg-[rgba(235,87,87,0.2)] text-[#EB5757] flex font-bold justify-center items-center">
                  <Icons.Catalog.trash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="w-full mt-[30px] flex md:px-[30px] px-[10px]">
        <div className="w-[30%]">
          <div className="h-[40px] w-[120px] bg-[#222a37] rounded-[8px] flex items-center justify-center">
            {`${currentMovies.length} of ${totalMovies}`}
          </div>
        </div>
        <div className="w-[70%] flex justify-end gap-2 md:pr-[30px]">
          {/* Nút Previous */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="paginator__item paginator__item--prev text-white md:w-[40px] w-[30px] md:h-[40px] h-[30px] flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-[8px] hover:text-[#f9ab00]"
          >
            <Icons.Catalog.left />
          </button>

          {/* Nút số trang */}
          {Array.from({ length: totalPages }, (_, index) => {
            if (totalPages > 10) {
              const page = index + 1;
              // Hiển thị trang đầu tiên và nút ...
              if (page === 1 || page === totalPages) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`paginator__item text-white md:w-[40px] w-[30px] md:h-[40px] h-[30px] flex items-center justify-center font-bold bg-gray-800 hover:text-[#f9ab00] rounded-[8px] select-none${
                      currentPage === page
                        ? "border-[2px] border-[#f9ab00]"
                        : ""
                    }`}
                  >
                    {page}
                  </button>
                );
              }

              // Hiển thị ... nếu cần
              if (page === 2 && currentPage > 5) {
                return (
                  <span
                    key="left-ellipsis"
                    className="paginator__ellipsis text-white flex items-center justify-center select-none"
                  >
                    ...
                  </span>
                );
              }

              if (page === totalPages - 1 && currentPage < totalPages - 4) {
                return (
                  <span
                    key="right-ellipsis"
                    className="paginator__ellipsis text-white flex items-center justify-center select-none"
                  >
                    ...
                  </span>
                );
              }

              // Hiển thị các trang gần currentPage
              if (
                page >= currentPage - 2 &&
                page <= currentPage + 2 &&
                page !== 1 &&
                page !== totalPages
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`paginator__item text-white md:w-[40px] w-[30px] md:h-[40px] h-[30px] flex items-center justify-center font-bold bg-gray-800 hover:text-[#f9ab00] rounded-[8px] select-none${
                      currentPage === page
                        ? "border-[2px] border-[#f9ab00]"
                        : ""
                    }`}
                  >
                    {page}
                  </button>
                );
              }

              return null;
            }

            return (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`paginator__item text-white md:w-[40px] w-[30px] md:h-[40px] h-[30px] flex items-center justify-center font-bold bg-gray-800 hover:text-[#f9ab00] rounded-[8px] select-none${
                  currentPage === index + 1
                    ? "border-[2px] border-[#f9ab00]"
                    : ""
                }`}
              >
                {index + 1}
              </button>
            );
          })}

          {/* Nút Next */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="paginator__item paginator__item--next text-white md:w-[40px] w-[30px] md:h-[40px] h-[30px] flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-[8px] hover:text-[#f9ab00] select-none"
          >
            <Icons.Catalog.right />
          </button>
        </div>
      </div>
    </div>
  );
};

const RenderCatalogs = () => {
  const [sortOption, setSortOption] = useState("Ngày tạo");
  const [searchQuery, setSearchQuery] = useState(""); // Thêm state cho tìm kiếm
  const [currentPage, setCurrentPage] = useState(1); // Để reset lại trang khi tìm kiếm thay đổi

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query); // Cập nhật searchQuery khi người dùng tìm kiếm
    setCurrentPage(1); // Reset về trang đầu khi tìm kiếm thay đổi
  };

  return (
    <div className="md:px-[2%] px-[4%] w-full text-[16px] mb-[40px]">
      <div className="md:h-[80px] md:flex items-center border-b border-[#222129] box-border">
        <div className="text-[32px] md:w-[30%] w-full flex gap-[20px]">
          <div className="text-left">Danh mục</div>
          <div className="flex text-[14px] text-[#C0C0C0] items-end mb-[7px] gap-1">
            <div>Tổng cộng </div>
            <div>{totalCatagory}</div>
          </div>
        </div>
        <div className="md:w-[40%] w-full flex gap-[20px] md:justify-end justify-start mt-[20px] md:mt-0">
          <div className="w-[120px] h-[42px] rounded-[8px] border-[2px] border-[#f9ab00] flex justify-center items-center cursor-pointer select-none">
            THÊM MỤC
          </div>

          <div className="mr-[10px]">
            <Filter
              options={["Ngày tạo", "Xếp hạng", "Lượt xem"]}
              onSortChange={handleSortChange}
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

      <RenderMoviesTable
        title="Phim mới nhất"
        data={data}
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
