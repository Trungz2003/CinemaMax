import { useState } from "react";
import Icons from "../../ultils/Icons";

export const FilterBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [openDropdown, setOpenDropdown] = useState(null); // Kiểm soát dropdown nào đang mở

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = (key) => {
    // Toggle trạng thái của dropdown theo key
    setOpenDropdown(openDropdown === key ? null : key);
  };

  // State để mở dropdown
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);

  // State để lưu lựa chọn
  const [selectedCategory, setSelectedCategory] = useState("Thể loại");
  const [selectedRating, setSelectedRating] = useState("Đánh giá");
  const [selectedTime, setSelectedTime] = useState("Thời gian");

  // Hàm mở dropdown tương ứng và đóng các dropdown khác
  const toggleDropdownDesktop = (dropdown) => {
    if (dropdown === "category") {
      setIsCategoryOpen(!isCategoryOpen);
      setIsRatingOpen(false);
      setIsTimeOpen(false);
    } else if (dropdown === "rating") {
      setIsRatingOpen(!isRatingOpen);
      setIsCategoryOpen(false);
      setIsTimeOpen(false);
    } else if (dropdown === "time") {
      setIsTimeOpen(!isTimeOpen);
      setIsCategoryOpen(false);
      setIsRatingOpen(false);
    }
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
          <div className="relative mb-4">
            <button
              className="bg-[#222129] text-white w-full px-[10px] py-[5px] h-[40px] rounded-md transition flex justify-between items-center"
              onClick={() => toggleDropdown("category")}
            >
              Thể loại <Icons.Home.down className="p-[2px]" />
            </button>
            {openDropdown === "category" && (
              <div
                className="absolute bg-[#333] text-white text-left mt-2 p-4 rounded-md shadow-md w-full"
                style={{ zIndex: 50 }} // Thêm z-index
              >
                <div>Phim hành động</div>
                <div>Phim hài</div>
                <div>Phim tâm lý</div>
              </div>
            )}
          </div>

          {/* Đánh giá */}
          <div className="relative mb-4">
            <button
              className="bg-[#222129] text-white w-full px-[10px] py-[5px] h-[40px] rounded-md transition flex justify-between items-center"
              onClick={() => toggleDropdown("rating")}
            >
              Đánh giá <Icons.Home.down className="p-[2px]" />
            </button>
            {openDropdown === "rating" && (
              <div
                className="absolute bg-[#333] text-white mt-2 p-4 rounded-md shadow-md w-full"
                style={{ zIndex: 50 }} // Thêm z-index
              >
                <div>5 sao</div>
                <div>4 sao</div>
                <div>3 sao</div>
              </div>
            )}
          </div>

          {/* Thời gian */}
          <div className="relative mb-4">
            <button
              className="bg-[#222129] text-white w-full px-[10px] py-[5px] h-[40px] rounded-md transition flex justify-between items-center"
              onClick={() => toggleDropdown("time")}
            >
              Thời gian <Icons.Home.down className="p-[2px]" />
            </button>
            {openDropdown === "time" && (
              <div
                className="absolute bg-[#333] text-white mt-2 p-4 rounded-md shadow-md w-full"
                style={{ zIndex: 50 }} // Thêm z-index
              >
                <div>1 ngày</div>
                <div>1 tuần</div>
                <div>1 tháng</div>
              </div>
            )}
          </div>
        </div>
        <div className="h-[20%] px-4 flex items-center">
          <button className="bg-[#faab00] text-white w-full px-[10px] py-[5px] h-[40px] rounded-md transition">
            ÁP DỤNG
          </button>
        </div>
      </div>

      {/* Nội dung giao diện desktop */}
      <div className="hidden md:flex w-[84%]">
        <div className="flex h-full w-[70%] gap-4">
          {/* Thể loại */}
          <div className="relative mt-[20px]">
            <button
              className="bg-[#222129] text-white px-[10px] py-[5px] h-[40px] rounded-md transition flex justify-between items-center w-[150px]"
              onClick={() => toggleDropdownDesktop("category")}
            >
              {selectedCategory} <Icons.Home.down className="p-[2px]" />
            </button>
            {isCategoryOpen && (
              <div className="absolute left-0  bg-[#333] text-white mt-2 p-4 rounded-md shadow-md w-full z-50">
                {["Phim hành động", "Phim hài", "Phim tâm lý"].map((item) => (
                  <div
                    key={item}
                    className="cursor-pointer hover:text-[#faab00] text-left"
                    onClick={() => {
                      setSelectedCategory(item);
                      setIsCategoryOpen(false);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Đánh giá */}
          <div className="relative mt-[20px]">
            <button
              className="bg-[#222129] text-white px-[10px] py-[5px] h-[40px] rounded-md transition flex justify-between items-center w-[150px]"
              onClick={() => toggleDropdownDesktop("rating")}
            >
              {selectedRating} <Icons.Home.down className="p-[2px]" />
            </button>
            {isRatingOpen && (
              <div className="absolute left-0  bg-[#333] text-white mt-2 p-4 rounded-md shadow-md w-full z-50">
                {["5 sao", "4 sao", "3 sao"].map((item) => (
                  <div
                    key={item}
                    className="cursor-pointer hover:text-[#faab00] text-left"
                    onClick={() => {
                      setSelectedRating(item);
                      setIsRatingOpen(false);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Thời gian */}
          <div className="relative mt-[20px]">
            <button
              className="bg-[#222129] text-white px-[10px] py-[5px] h-[40px] rounded-md transition flex justify-between items-center w-[150px]"
              onClick={() => toggleDropdownDesktop("time")}
            >
              {selectedTime} <Icons.Home.down className="p-[2px]" />
            </button>
            {isTimeOpen && (
              <div className="absolute left-0  bg-[#333] text-white mt-2 p-4 rounded-md shadow-md w-full z-50">
                {["1 ngày", "1 tuần", "1 tháng"].map((item) => (
                  <div
                    key={item}
                    className="cursor-pointer hover:text-[#faab00] text-left"
                    onClick={() => {
                      setSelectedTime(item);
                      setIsTimeOpen(false);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Nút ÁP DỤNG */}
        <div className="flex w-[30%] justify-end">
          <div className="mt-[20px]">
            <button
              className="bg-transparent text-white px-[10px] py-[5px] w-[110px] h-[40px] border-[2px] border-[#faab00] rounded-md hover:bg-[#f2d19480] transition"
              onClick={() =>
                console.log({ selectedCategory, selectedRating, selectedTime })
              }
            >
              ÁP DỤNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
