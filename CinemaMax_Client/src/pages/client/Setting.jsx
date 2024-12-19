import React from "react";
import Icons from "../../ultils/Icons";
import { useState } from "react";

const Setting = () => {
  const [showPasswordOld, setShowPasswordOld] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  return (
    <div className="w-full h-full md:px-[8%] px-[4%] md:flex md:gap-[27px]">
      <div className="md:w-[65%] w-full px-[30px] py-[35px] rounded-[8px] border-[1px] border-[#222129]">
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

export default Setting;
