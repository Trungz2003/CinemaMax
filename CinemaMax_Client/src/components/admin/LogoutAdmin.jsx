import React from "react";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icons from "../../ultils/Icons";
import { logout } from "../../apis/client/Auth";
import { logOut, auth } from "../../firebase/firebaseConfig";
import path from "../../ultils/Path";
import { ShowToast } from "../../ultils/ToastUtils";

const LogoutAdmin = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate(path.LOGIN);
      return;
    }

    try {
      // 1. Gọi API backend để logout
      await logout(token);

      // 2. Xóa token khỏi localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("adminInfo");

      // 3. Đăng xuất khỏi Firebase
      await logOut(auth);

      // 4. Hiển thị thông báo và điều hướng về trang đăng nhập
      ShowToast("success", "Đăng xuất thành công!");
      navigate(path.LOGIN);
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
      ShowToast("error", "Lỗi khi đăng xuất!");
    }
  };

  // Hàm xử lý quay lại trang chủ
  const handleGoHome = () => {
    navigate(path.HOME);
  };

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative h-full w-[20%] flex items-center gap-[15px] justify-end">
      {/* Nút logout */}
      <button
        className="w-[32px] h-[32px] rounded-[8px] bg-[rgba(41,180,116,0.1)] hover:bg-[rgba(41,180,116,0.2)] text-[#29B474] flex font-bold justify-center items-center"
        onClick={() => setShowMenu(!showMenu)}
      >
        <Icons.MyCinemaMax.logout />
      </button>

      {/* Dropdown menu */}
      {showMenu && (
        <div
          ref={menuRef}
          className="absolute top-[50px] bg-[#222129] shadow-lg rounded-lg w-[180px] p-2 z-[9999] mt-[10px]"
        >
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-white hover:text-[#f9ab00] rounded-md"
          >
            Đăng xuất
          </button>
          <button
            onClick={handleGoHome}
            className="w-full text-left px-4 py-2 text-white hover:text-[#f9ab00] rounded-md"
          >
            Quay lại trang chủ
          </button>
        </div>
      )}
    </div>
  );
};

export default LogoutAdmin;
