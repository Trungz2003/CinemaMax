import { useState, useRef, useEffect } from "react";
import Icons from "../../ultils/Icons";
import { getGenres } from "../../apis/server/AddItem";
import Filter from "../admin/Filter";

export const FilterBar = ({ setGenre, setRating }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  const [genresRender, setGenresRender] = useState([]);
  const [isFetching, setIsFetching] = useState(false); // Cờ kiểm tra để tránh gọi lại
  const [selectedRating, setSelectedRating] = useState(""); // Trạng thái giá trị được chọn

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchDataGenres = async () => {
    if (!isFetching) {
      setIsFetching(true); // Đánh dấu là đang fetch dữ liệu

      try {
        let dataGenres = await getGenres();

        if (dataGenres) {
          // Nếu dataGenres.result là một mảng thể loại, bạn có thể duyệt qua từng phần tử và lấy tên
          let dataGenres = await getGenres();

          if (dataGenres) {
            // Lưu toàn bộ đối tượng { id, name } thay vì chỉ lưu name
            setGenresRender(dataGenres);
          } else {
            console.error("Không có dữ liệu thể loại.");
          }
        } else {
          console.error("Không có dữ liệu thể loại.");
        }
      } catch (error) {
        console.error("Đã xảy ra lỗi khi lấy dữ liệu thể loại: ", error);
      }
    }
  };

  const handleGenreChange = (selectedGenres) => {
    setGenres(selectedGenres);
    setGenre(selectedGenres);
  };

  // Fake data từ 1 sao đến 10 sao
  const ratings = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `${i + 1} sao`,
  }));

  const handleRatingChange = (rating) => {
    setSelectedRating(rating); // Cập nhật rating khi chọn
    setRating(rating);
  };

  return (
    <div className="w-full h-[80px] border-b border-gray-600 flex justify-center">
      {/* Nút filter icon */}
      <div className="flex items-center justify-between w-full px-4 md:hidden">
        <button
          className="bg-transparent text-white px-[10px] py-[5px] w-[40px] h-[40px] border-[2px] border-[#faab00] rounded-md flex justify-center items-center"
          onClick={toggleSidebar}
        >
          <Icons.Home.filter />
        </button>
      </div>

      {/* Sidebar menu */}
      <div
        className={`fixed top-0 left-0 h-[88%] bg-[#222129] w-[70%] transform transition-transform mt-[80px] ${
          isSidebarOpen ? "translate-x-0 z-50" : "-translate-x-full"
        }`}
      >
        <div className="p-4 text-white h-[85%] border-t border-[#faab00]">
          <div className="flex h-[30px] justify-between items-center">
            <h2 className="font-bold text-[20px] flex items-center h-full">
              Bộ lọc
            </h2>
            <span
              onClick={toggleSidebar}
              className="text-[20px] hover:text-[#faab00] cursor-pointer"
            >
              <Icons.Home.close />
            </span>
          </div>
          {/* Thể loại */}
          <Filter
            options={genresRender.map((genre) => ({
              id: genre.id,
              name: genre.name,
            }))}
            onSortChange={handleGenreChange}
            dropdownWidth="100%"
            test={
              Array.isArray(genres) && genres.length > 0
                ? genres.map((g) => g.name).join(", ")
                : "Chọn thể loại"
            }
          />

          <Filter
            options={ratings} // Truyền danh sách rating vào dropdown
            onSortChange={handleRatingChange} // Hàm xử lý khi chọn rating
            dropdownWidth="100%"
            test={
              Array.isArray(selectedRating) && selectedRating.length > 0
                ? selectedRating.map((r) => r.name).join(", ")
                : "Chọn xếp hạng"
            }
          />
        </div>
      </div>

      {/* Nội dung giao diện desktop */}
      <div className="hidden md:flex w-[84%]">
        <div className="flex h-full w-[70%] gap-4">
          {/* Thể loại */}
          <div
            className="relative mt-[20px] z-[30] w-[200px]"
            onClick={fetchDataGenres}
          >
            <Filter
              options={genresRender.map((genre) => ({
                id: genre.id,
                name: genre.name,
              }))}
              onSortChange={handleGenreChange}
              dropdownWidth="100%"
              test={
                Array.isArray(genres) && genres.length > 0
                  ? genres.map((g) => g.name).join(", ")
                  : "Chọn thể loại"
              }
            />
          </div>

          <div
            className="relative mt-[20px] z-[30] w-[200px]"
            onClick={fetchDataGenres}
          >
            <Filter
              options={ratings} // Truyền danh sách rating vào dropdown
              onSortChange={handleRatingChange} // Hàm xử lý khi chọn rating
              dropdownWidth="100%"
              test={
                Array.isArray(selectedRating) && selectedRating.length > 0
                  ? selectedRating.map((r) => r.name).join(", ")
                  : "Chọn xếp hạng"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
