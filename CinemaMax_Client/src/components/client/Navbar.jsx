import React, { useState } from "react";
import Icons from "../../ultils/Icons";
import path from "../../ultils/Path";
import { Link, useNavigate } from "react-router-dom";
import { getUserRole } from "../../ultils/GetRole";
import { useMovies } from "../../ultils/MovieContext";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false); // Trạng thái mở/đóng thanh tìm kiếm
  const [searchTermPc, setSearchTermPc] = useState("");
  const [searchTermMb, setSearchTermMb] = useState("");
  const { moviesPublic, moviesPrivate } = useMovies();
  const navigate = useNavigate();
  const normalizeText = (text) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Xóa dấu
      .replace(/[^a-zA-Z0-9\s]/g, "") // Xóa ký tự đặc biệt
      .trim()
      .toLowerCase();
  const filteredMoviesPc = [...moviesPublic, ...moviesPrivate].filter((movie) =>
    normalizeText(movie.title).includes(normalizeText(searchTermPc))
  );
  const filteredMoviesMb = [...moviesPublic, ...moviesPrivate].filter((movie) =>
    normalizeText(movie.title).includes(normalizeText(searchTermMb))
  );

  return (
    <div className="relative w-[400px]">
      <form className="flex items-center md:p-2 rounded-lg shadow-md">
        {/* Thanh tìm kiếm luôn hiển thị trên desktop */}
        <input
          type="text"
          placeholder="Tìm kiếm bằng tên phim..."
          className="w-full bg-[#222129] text-white h-[45px] p-2 rounded-[8px] pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 hidden md:block"
          value={searchTermPc}
          onChange={(e) => setSearchTermPc(e.target.value)}
        />
        {searchTermPc && (
          <ul className="absolute top-full left-0 w-full bg-[#222129] text-white mt-2 rounded-lg shadow-lg pl-2">
            {filteredMoviesPc.map((movie) => (
              <li
                key={movie.id}
                className="p-2 hover:text-[#f9ab00] cursor-pointer text-left"
                onClick={() => {
                  setSearchTermPc(""); // Reset thanh tìm kiếm
                  navigate(
                    `/catalog?search=${encodeURIComponent(movie.title)}`
                  );
                }}
              >
                {movie.title}
              </li>
            ))}
            {filteredMoviesPc.length === 0 && (
              <li className="p-2 text-gray-400">Không tìm thấy phim nào</li>
            )}
          </ul>
        )}

        {/* Nút bấm mở tìm kiếm trên mobile */}
        <button
          type="button"
          className="absolute md:right-4 right-[-5px] text-white md:text-[14px] text-[26px] md:p-2 p-0 hover:text-[#f5ab04] transition-all"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Icons.Navbar.search />
        </button>
      </form>

      {/* Thanh tìm kiếm hiển thị ngay dưới icon trên mobile */}
      {isOpen && (
        <div className="absolute left-[-190px] top-[40px] w-[300px] bg-[#222129] text-white h-[45px] p-2 rounded-[8px] shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 z-50 md:hidden transition-all duration-300">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full h-full bg-transparent p-2 focus:outline-none"
            value={searchTermMb}
            onChange={(e) => setSearchTermMb(e.target.value)}
          />

          {/* Nút bấm mở tìm kiếm trên mobile */}
          <button
            type="button"
            className="absolute md:right-4 right-[16px] top-[12px] text-white md:text-[14px] text-[18px] md:p-2 p-0 hover:text-[#f5ab04] transition-all"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Icons.Navbar.search />
          </button>

          {searchTermMb && (
            <ul className="absolute top-full left-0 w-full bg-[#222129] text-white mt-2 rounded-lg shadow-lg pl-2">
              {filteredMoviesMb.map((movie) => (
                <li
                  key={movie.id}
                  className="p-2 hover:text-[#f9ab00] cursor-pointer text-left"
                  onClick={() => {
                    setSearchTermMb(""); // Reset thanh tìm kiếm
                    navigate(
                      `/catalog?search=${encodeURIComponent(movie.title)}`
                    );
                  }}
                >
                  {movie.title}
                </li>
              ))}
              {filteredMoviesMb.length === 0 && (
                <li className="p-2 text-gray-400">Không tìm thấy phim nào</li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const location = useLocation(); // Lấy đường dẫn hiện tại
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userRole = getUserRole(); // Lấy role từ token

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return (
    <div className="flex bg-[#1a191f] w-full justify-center border-b border-gray-600 box-border fixed top-0 left-0 right-0 z-50">
      <div className="flex w-[84%] h-[80px] justify-between items-center bg-[#1a191f] text-white text-[14px]">
        {/* Logo */}
        <div>
          <h1 className="font-bold md:text-[2rem] text-[26px] text-left w-[180px] m-0 p-0">
            <span className="text-[#faab00]">Stream</span>
            <span className="text-white">Phim</span>
          </h1>
        </div>

        {/* Menu Items */}
        <div
          className={`md:flex ${
            isMenuOpen ? "hidden" : "hidden"
          } w-[500px] justify-between gap-4`}
        >
          <Link
            to={path.HOME}
            className={`flex items-center cursor-pointer select-none ${
              location.pathname === path.HOME
                ? "text-[#faab00]"
                : "hover:text-[#faab00]"
            }`}
          >
            TRANG CHỦ
          </Link>

          <Link
            to={path.CATALOG}
            className={`flex items-center cursor-pointer select-none ${
              location.pathname === path.CATALOG
                ? "text-[#faab00]"
                : "hover:text-[#faab00]"
            }`}
          >
            DANH MỤC
          </Link>

          <Link
            to={path.PRICING}
            className={`flex items-center cursor-pointer select-none ${
              location.pathname === path.PRICING
                ? "text-[#faab00]"
                : "hover:text-[#faab00]"
            }`}
          >
            CÁC GÓI THUÊ
          </Link>

          {/* Dropdown */}
          <div className="relative">
            <div
              className={`flex items-center cursor-pointer select-none ${
                isDropdownOpen ? "text-[#faab00]" : "hover:text-[#faab00]"
              }`}
              onClick={toggleDropdown}
            >
              TRANG <Icons.Navbar.down />
            </div>

            {isDropdownOpen && (
              <div className="absolute top-full right-[-20px] w-[200px] bg-[#222129] rounded-lg shadow-lg mt-[10px] py-[10px] px-[10px] text-left">
                <Link
                  to={path.ABOUT}
                  className={`block p-2 ${
                    location.pathname === path.ABOUT
                      ? "text-[#faab00]"
                      : "hover:text-[#faab00]"
                  }`}
                >
                  Giới thiệu
                </Link>
                <Link
                  to={path.CONTACTS}
                  className={`block p-2 ${
                    location.pathname === path.CONTACTS
                      ? "text-[#faab00]"
                      : "hover:text-[#faab00]"
                  }`}
                >
                  Liên hệ
                </Link>
                <Link
                  to={path.FAQ}
                  className={`block p-2 ${
                    location.pathname === path.FAQ
                      ? "text-[#faab00]"
                      : "hover:text-[#faab00]"
                  }`}
                >
                  Trung tâm trợ giúp
                </Link>
                <Link
                  to={path.PRIVACY}
                  className={`block p-2 ${
                    location.pathname === path.PRIVACY
                      ? "text-[#faab00]"
                      : "hover:text-[#faab00]"
                  }`}
                >
                  Chính sách bảo mật
                </Link>

                {/* Chỉ hiển thị nếu là ADMIN */}
                {userRole === "ROLE_ADMIN" && (
                  <Link
                    to={path.DASHBOARD}
                    className={`block p-2 ${
                      location.pathname === path.DASHBOARD
                        ? "text-[#faab00]"
                        : "hover:text-[#faab00]"
                    }`}
                  >
                    Trang quản trị
                  </Link>
                )}
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
            className="md:w-[40px] md:h-[40px] w-[30px] rounded-full flex justify-center items-center cursor-pointer "
          >
            <Icons.Navbar.account
              className={`w-full h-full text-black hover:bg-[#faab00]  rounded-[20px] ${
                location.pathname === path.MYCINEMAMAX
                  ? "bg-[#faab00]"
                  : "bg-white"
              }`}
            />
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
          <Link
            to={path.HOME}
            className={`flex items-center cursor-pointer select-none ${
              location.pathname === path.HOME ? "text-[#faab00]" : "text-white"
            }`}
          >
            TRANG CHỦ
          </Link>
          <Link
            to={path.CATALOG}
            className={`flex items-center pt-[5px] cursor-pointer select-none ${
              location.pathname === path.CATALOG
                ? "text-[#faab00]"
                : "text-white"
            }`}
          >
            DANH MỤC
          </Link>
          <Link
            to={path.PRICING}
            className={`flex items-center pt-[5px] cursor-pointer select-none ${
              location.pathname === path.PRICING
                ? "text-[#faab00]"
                : "text-white"
            }`}
          >
            CÁC GÓI THUÊ
          </Link>
          <div className="relative">
            <div
              className={`flex items-center pt-[5px] cursor-pointer select-none ${
                isDropdownOpen ? "text-[#faab00]" : "text-white"
              }`}
              onClick={toggleDropdown}
            >
              TRANG <Icons.Navbar.down />
            </div>
            {isDropdownOpen && (
              <div className="absolute top-[100%] left-0 w-[200px] bg-[#222129] rounded-lg shadow-lg text-left text-[14px]">
                <Link
                  to={path.ABOUT}
                  className={`block p-2 mt-[5px] cursor-pointer select-none ${
                    location.pathname === path.ABOUT
                      ? "text-[#faab00]"
                      : "text-white"
                  }`}
                >
                  Giới thiệu
                </Link>
                <Link
                  to={path.CONTACTS}
                  className={`block p-2 cursor-pointer select-none ${
                    location.pathname === path.CONTACTS
                      ? "text-[#faab00]"
                      : "text-white"
                  }`}
                >
                  Liên hệ
                </Link>
                <Link
                  to={path.FAQ}
                  className={`block p-2 cursor-pointer select-none ${
                    location.pathname === path.FAQ
                      ? "text-[#faab00]"
                      : "text-white"
                  }`}
                >
                  Trung tâm trợ giúp
                </Link>
                <Link
                  to={path.PRIVACY}
                  className={`block p-2 cursor-pointer select-none ${
                    location.pathname === path.PRIVACY
                      ? "text-[#faab00]"
                      : "text-white"
                  }`}
                >
                  Chính sách bảo mật
                </Link>
                {userRole === "ROLE_ADMIN" && (
                  <Link
                    to={path.DASHBOARD}
                    className={`block p-2 cursor-pointer select-none ${
                      location.pathname === path.DASHBOARD
                        ? "text-[#faab00]"
                        : "text-white"
                    }`}
                  >
                    Trang quản trị
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
