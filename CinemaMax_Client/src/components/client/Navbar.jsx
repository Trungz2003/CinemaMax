import React, { useState } from "react";
import Icons from "../../ultils/Icons";
import path from "../../ultils/Path";
import { Link } from "react-router-dom";

const SearchBar = () => {
  return (
    <div className="relative w-[400px]">
      <form className="flex items-center md:p-2 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="w-full bg-[#222129] text-white h-[45px] p-2 rounded-[8px] pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 hidden md:block"
        />
        <button
          type="submit"
          className="absolute md:right-4 right-[-5px] text-white md:text-[14px] text-[26px] md:p-2 p-0 hover:text-[#f5ab04] transition-all"
        >
          <Icons.Navbar.search />
        </button>
      </form>
    </div>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <div className="flex bg-[#1a191f] w-full justify-center border-b border-gray-600 box-border fixed top-0 left-0 right-0 z-50">
      <div className="flex w-[84%] h-[80px] justify-between items-center bg-[#1a191f] text-white text-[14px]">
        {/* Logo */}
        <div>
          <h1 className="font-bold md:text-[2rem] text-[26px] text-left w-[180px] m-0 p-0">
            <span className="text-[#faab00]">Cinema</span>
            <span className="text-white">Max</span>
          </h1>
        </div>

        {/* Menu Items */}
        <div
          className={`md:flex ${
            isMenuOpen ? "hidden" : "hidden"
          } w-[500px] mt-[8] justify-between gap-4 px-[20px]`}
        >
          <Link
            to={path.HOME}
            className="flex items-center hover:text-[#faab00] cursor-pointer select-none"
          >
            TRANG CHỦ
          </Link>
          <Link
            to={path.CATALOG}
            className="flex items-center hover:text-[#faab00] cursor-pointer select-none"
          >
            DANH MỤC
          </Link>

          <Link
            to={path.PRICING}
            className="flex items-center hover:text-[#faab00] cursor-pointer select-none"
          >
            CÁC GÓI THUÊ
          </Link>
          <div className="relative">
            <div
              className="flex items-center hover:text-[#faab00] cursor-pointer select-none"
              onClick={toggleDropdown}
            >
              TRANG <Icons.Navbar.down />
            </div>
            {isDropdownOpen && (
              <div className="absolute top-[100%] left-0 w-[200px] bg-[#222129] rounded-lg shadow-lg text-left text-[14px] mt-[10px] py-[10px] px-[10px]">
                <Link
                  to={path.ABOUT}
                  className="block p-2 text-white hover:text-[#faab00] cursor-pointer select-none"
                >
                  Giới thiệu
                </Link>
                <Link
                  to={path.CONTACTS}
                  className="block p-2 text-white hover:text-[#faab00] cursor-pointer select-none"
                >
                  Liên hệ
                </Link>
                <Link
                  to={path.FAQ}
                  className="block p-2 text-white hover:text-[#faab00] cursor-pointer select-none"
                >
                  Trung tâm trợ giúp
                </Link>
                <Link
                  to={path.PRIVACY}
                  className="block p-2 text-white hover:text-[#faab00] cursor-pointer select-none"
                >
                  Chính sách bảo mật
                </Link>
                <Link
                  to={path.FAQ}
                  className="block p-2 text-white hover:text-[#faab00] cursor-pointer select-none"
                >
                  Trang quản trị
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* SearchBar */}
        <div className="md:w-[400px] w-0 flex justify-end">
          <SearchBar />
        </div>

        {/* Account Icon */}
        <div className="flex h-full md:w-[100px] justify-end items-center">
          <Link
            to={path.MYCINEMAMAX}
            className="md:w-[40px] md:h-[40px] w-[30px] rounded-full flex justify-center items-center cursor-pointer"
          >
            <Icons.Navbar.account className="w-full h-full text-black hover:bg-[#faab00] bg-white rounded-[20px]" />
          </Link>
        </div>

        <div
          className="md:hidden flex items-center cursor-pointer text-[26px] pl-0"
          onClick={toggleMenu}
        >
          <Icons.Navbar.bar />
        </div>
      </div>

      {/* Sidebar Menu (hidden by default) */}
      <div
        className={`fixed top-[80px] right-0 h-[60%] w-[250px] bg-[#222129] transition-all duration-300 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden z-[999] border-t border-[#faab00]`}
      >
        <div className="p-4 text-white">
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
              onClick={toggleDropdown}
            >
              TRANG <Icons.Navbar.down />
            </div>
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
      </div>
    </div>
  );
};

export default Navbar;
