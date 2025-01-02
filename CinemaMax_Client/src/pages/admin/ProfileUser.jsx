import React from "react";
import Icons from "../../ultils/Icons";
import { useState } from "react";


const Filter = ({ options, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSortChange(option); // Gọi callback khi chọn option
  };
  return (
    <div className="relative w-full mt-[11px]">
      <div
        className=" h-[45px] rounded-[8px] bg-[#222129] flex items-center px-4 cursor-pointer gap-[5px]"
        role="combobox"
        tabIndex="0"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
      >
        <div className="flex-1 text-white text-left">{selectedOption}</div>
        <div className="flex items-center">
          <svg
            className={`w-2 h-2 text-white transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            viewBox="0 0 100 100"
          >
            <path
              d="M10,30 L50,70 L90,30"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
            ></path>
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="absolute bg-[#222129] w-[200px] mt-2 rounded-[8px] shadow-lg z-10 text-left">
          {options.map((option, index) => (
            <div
              key={index}
              className={`px-4 py-2 cursor-pointer text-white hover:text-[#f9ab00] ${
                selectedOption === option ? "text-custom" : ""
              }`}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ProfileUser = () => {
  const [showPasswordOld, setShowPasswordOld] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  return (
    <div className="w-full h-full md:flex gap-[24px]">
      <div className="md:w-[65%] rounded-[8px] border border-[#222129]  md:h-[500px] px-[35px] py-[35px]">
        <div className="text-[20px] w-full text-left">Chi tiết hồ sơ</div>
        <div className="w-full md:flex gap-[11px]">
          <div className="md:w-[49%] w-full mt-[20px]">
            <div className="w-full text-left">Tên tài khoản</div>
            <input
              id="username"
              name="username"
              type="username"
              placeholder="Manhz2003"
              //value={username}
              className="block w-full h-[45px] bg-[#222129] mt-[10px] text-white rounded-[8px] py-1 pl-[20px] focus:ring-1 focus:ring-custom-yellow focus:outline-none"
            />
          </div>

          <div className="md:w-[49%] w-full mt-[20px]">
            <div className="w-full text-left">E-mail</div>
            <input
              id="mail"
              name="mail"
              type="mail"
              placeholder="email@gmail.com"
              //value={email}
              className="block w-full h-[45px] bg-[#222129] mt-[10px] text-white rounded-[8px] py-1 pl-[20px] focus:ring-1 focus:ring-custom-yellow focus:outline-none"
            />
          </div>
        </div>
        <div className="w-full md:flex md:gap-[11px] mt-[10px]">
          <div className="md:w-[49%] w-full mt-[20px]">
            <div className="w-full text-left">Tên người dùng</div>
            <input
              id="name"
              name="name"
              type="name"
              placeholder="Manh"
              //value={email}
              className="block w-full h-[45px] bg-[#222129] mt-[10px] text-white rounded-[8px] py-1 pl-[20px] focus:ring-1 focus:ring-custom-yellow focus:outline-none"
            />
          </div>

          <div className="md:w-[49%] mt-[20px]">
            <div className="w-full text-left">Hình đại diện</div>
            <div className="w-full h-[45px] mt-[10px] cursor-pointer hover:border-[#f9ab00] border-[2px] border-[#222129] rounded-[8px] bg-[#222129] flex justify-between items-center px-[20px]">
              <span>Tải lên (40x40)</span>
              <div className="text-[20px]">
                <Icons.Setting.img />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:flex md:gap-[11px] mt-[10px]">
          <div className="md:w-[49%] w-full mt-[20px]">
            <div className="w-full text-left">Đăng ký</div>
            <Filter
              options={["Basic", "Premium", "Cinematic"]} // Truyền đúng kiểu mảng
              //onSortChange={handleSortChange}
            />
          </div>

          <div className="md:w-[49%] mt-[20px]">
            <div className="w-full text-left">Quyền</div>
            <Filter
              options={["User", "Admin"]} // Truyền đúng kiểu mảng
              //onSortChange={handleSortChange}
            />
          </div>
        </div>

        <div className="w-full flex justify-center">
          <div className="mt-[40px] border-[2px] border-[#f9ab00] hover:bg-[#f2d19480] text-white p-2 rounded-lg w-[140px] h-[45px] cursor-pointer select-none">
            Lưu
          </div>
        </div>
      </div>
      <div className="md:w-[33%] w-full px-[30px] py-[35px] rounded-[8px] border-[1px] border-[#222129] md:mt-0 mt-[20px]">
        <div className="text-[20px] w-full text-left">Thay đổi mật khẩu</div>
        <div className="w-full mt-[20px]">
          <div className="w-full text-left">Mật khẩu cũ</div>
          <div className="w-full h-[45px] relative flex justify-end">
            <input
              id="password"
              name="password"
              type={showPasswordOld ? "text" : "password"}
              className="block w-full h-[45px] bg-[#222129] mt-[10px] text-white rounded-[8px] py-1 pl-[20px] focus:ring-1 focus:ring-custom-yellow focus:outline-none"
            />
            <div
              onClick={() => setShowPasswordOld(!showPasswordOld)}
              className="absolute mt-[20px] text-[23px] mr-[15px] cursor-pointer hover:text-[#f9ab00] select-none"
            >
              {showPasswordOld ? (
                <Icons.Setting.hide />
              ) : (
                <Icons.Setting.show />
              )}
            </div>
          </div>
        </div>

        <div className="w-full mt-[20px]">
          <div className="w-full text-left">Mật khẩu mới</div>
          <div className="w-full h-[45px] relative flex justify-end">
            <input
              id="password"
              name="password"
              type={showPasswordNew ? "text" : "password"}
              className="block w-full h-[45px] bg-[#222129] mt-[10px] text-white rounded-[8px] py-1 pl-[20px] focus:ring-1 focus:ring-custom-yellow focus:outline-none"
            />
            <div
              onClick={() => setShowPasswordNew(!showPasswordNew)}
              className="absolute mt-[20px] text-[23px] mr-[15px] cursor-pointer hover:text-[#f9ab00] select-none"
            >
              {showPasswordNew ? (
                <Icons.Setting.hide />
              ) : (
                <Icons.Setting.show />
              )}
            </div>
          </div>
        </div>
        <div className="w-full mt-[20px]">
          <div className="w-full text-left">Xác nhận mật khẩu mới</div>
          <div className="w-full h-[45px] relative flex justify-end">
            <input
              id="password"
              name="password"
              type={showConfirmPassword ? "text" : "password"}
              className="block w-full h-[45px] bg-[#222129] mt-[10px] text-white rounded-[8px] py-1 pl-[20px] focus:ring-1 focus:ring-custom-yellow focus:outline-none"
            />
            <div
              onClick={() => setConfirmPassword(!showConfirmPassword)}
              className="absolute mt-[20px] text-[23px] mr-[15px] cursor-pointer hover:text-[#f9ab00] select-none"
            >
              {showConfirmPassword ? (
                <Icons.Setting.hide />
              ) : (
                <Icons.Setting.show />
              )}
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <div className="mt-[40px] border-[2px] border-[#f9ab00] hover:bg-[#f2d19480] text-white p-2 rounded-lg w-[140px] h-[45px] cursor-pointer select-none">
            Lưu
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
