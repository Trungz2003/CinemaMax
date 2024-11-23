import React from "react";
import Icons from "../ultils/Icons";
import { useState } from "react";

const SearchBar = () => {
  return (
    <div className="relative w-[400px] text-right">
      <form
        //onSubmit={handleSubmit}
        className="flex items-center p-2 rounded-lg shadow-md"
      >
        <input
          type="text"
          //value={query}
          //onChange={handleChange}
          placeholder="Tìm kiếm..."
          className="w-full bg-[#222129] text-white h-[45px] p-2 rounded-[8px] pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="absolute left-2 text-white p-2 hover:text-[#f5ab04] transition-all"
        >
          <Icons.Navbar.search />
        </button>
      </form>
    </div>
  );
};

const Navbar = () => {
  // State để kiểm soát việc hiển thị danh sách con
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Hàm toggle mở và đóng dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };
  return (
    <div className=" flex fixed w-full justify-center border-b border-gray-600 box-border">
      <div className="flex w-[84%] h-[80px] justify-between items-center bg-[#1a191f] text-white text-[14px] ">
        {/* Logo */}
        <div>
          <h1 className="font-bold md:text-[2rem] text-[26px] text-left w-[180px] m-0 p-0">
            <span className="text-[#faab00]">Cinema</span>
            <span className="text-white">Max</span>
          </h1>
        </div>
        {/* Menu Items */}
        <div className="flex w-[500px] justify-between gap-4 px-[20px]">
          <div className="flex items-center hover:text-[#faab00] cursor-pointer">
            TRANG CHỦ
          </div>
          <div className="flex items-center hover:text-[#faab00] cursor-pointer">
            DANH MỤC
          </div>

          <div className="flex items-center hover:text-[#faab00] cursor-pointer">
            CÁC GÓI THUÊ
          </div>
          <div className="relative">
            <div
              className="flex items-center hover:text-[#faab00] cursor-pointer"
              onClick={toggleDropdown} // Toggle khi click vào
            >
              TRANG <Icons.Navbar.down />
            </div>
            {/* Danh sách con */}
            {isDropdownOpen && (
              <div className="absolute top-[100%] left-0 w-[200px] bg-[#222129] rounded-lg shadow-lg text-left text-[14px]">
                <div className="p-2 text-white hover:text-[#faab00] cursor-pointer">
                  Giới thiệu
                </div>
                <div className="p-2 text-white hover:text-[#faab00] cursor-pointer">
                  Hồ sơ
                </div>
                <div className="p-2 text-white hover:text-[#faab00] cursor-pointer">
                  Diễn viên
                </div>
                <div className="p-2 text-white hover:text-[#faab00] cursor-pointer">
                  Liên hệ
                </div>
                <div className="p-2 text-white hover:text-[#faab00] cursor-pointer">
                  Trung tâm trợ giúp
                </div>
                <div className="p-2 text-white hover:text-[#faab00] cursor-pointer">
                  Chính sách bảo mật
                </div>
                <div className="p-2 text-white hover:text-[#faab00] cursor-pointer">
                  Trang quản trị
                </div>
              </div>
            )}
          </div>
        </div>
        {/* SearchBar */}
        <div className="w-[400px] flex justify-end">
          <SearchBar />
        </div>
        <div className="flex h-full w-[100px] justify-center items-center">
          <button className="border-[2px] border-[#faab00] text-[#faab00] w-full h-[45px] hover:bg-[#faab00] hover:text-white px-4 py-2 rounded-md">
            Tài khoản
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
