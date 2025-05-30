import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import Link và useLocation
import Icons from "../../ultils/Icons";
import path from "../../ultils/Path";
import { useState, useEffect } from "react";
import { getInfoAdmin } from "../../apis/server/Menu";
import defaultAvatar from "/img_user_not_avata.png";
import LogoutAdmin from "./LogoutAdmin";

const RenderNavBar = () => {
  const location = useLocation(); // Lấy đường dẫn hiện tại
  const menuItems = [
    {
      icon: <Icons.Dashboard.layout />,
      label: "DASHBOARD",
      path: path.DASHBOARD,
    },
    { icon: <Icons.Dashboard.movie />, label: "DANH MỤC", path: path.CATALOGS },
    {
      icon: <Icons.Dashboard.users />,
      label: "NGƯỜI SỬ DỤNG",
      path: path.USERS,
    },
    {
      icon: <Icons.Dashboard.comment />,
      label: "BÌNH LUẬN",
      path: path.COMMENTS,
    },
    { icon: <Icons.Dashboard.star />, label: "ĐÁNH GIÁ", path: path.REVIEWS },
    { icon: <Icons.Dashboard.setting />, label: "CÀI ĐẶT", path: path.SETTING },
  ];

  return (
    <div className="w-full h-full flex-col text-[16px]">
      {menuItems.map((item, index) => (
        <Link
          key={index}
          to={item.path} // Dùng Link để điều hướng tới đường dẫn
          className={`relative h-full cursor-pointer mt-[15px] flex items-center space-x-2 hover:text-[#f9ab00] select-none ${
            location.pathname === item.path ? "text-[#f9ab00]" : "text-white"
          } transition-all duration-300`} // Kiểm tra nếu đường dẫn hiện tại khớp
        >
          {item.icon && <span>{item.icon}</span>}
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

const RenderInfo = () => {
  const [adminInfo, setAdminInfo] = useState(() => {
    const savedAdminInfo = localStorage.getItem("adminInfo");
    return savedAdminInfo ? JSON.parse(savedAdminInfo) : {};
  });

  useEffect(() => {
    const handleGetInfoAdmin = async () => {
      try {
        const response = await getInfoAdmin();
        if (response.code === 0) {
          setAdminInfo(response.result);
          localStorage.setItem("adminInfo", JSON.stringify(response.result));
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (!adminInfo.id) {
      handleGetInfoAdmin();
    }
  }, []);

  return (
    <div className="w-full md:px-[2%] px-[1%] md:flex md:flex-row flex-col md:h-[80px] border-b border-[#222129] box-border">
      <div className="w-full px-[10px] h-full flex items-center justify-between">
        <div className="flex md:w-full w-[75%] md:pt-0 pt-[20px]">
          {/* Thông tin người dùng (Tên và ID) */}
          <div className="md:w-full w-[600px] h-full flex items-center justify-start mb-4 md:mb-0">
            <div className="w-[40px] h-[40px] rounded-full bg-[#212026] flex justify-center items-center">
              <img
                src={adminInfo.thumbnail || defaultAvatar}
                alt="User Avatar"
                className="w-[100%] object-cover rounded-full h-full"
              />
            </div>

            <div className="h-full w-[70%] ml-[20px] relative">
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
                <p className="text-[12px] text-left">
                  {adminInfo?.role?.[0]?.name}
                </p>
                <p className="font-bold text-left flex gap-1 items-center">
                  {adminInfo.name + " "}
                </p>
              </div>
            </div>
          </div>
        </div>

        <LogoutAdmin />
      </div>
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
    <div className="w-full md:w-[18%] bg-[#1a191f] md:h-[100vh] md:border-r md:border-[#222129] md:box-border fixed top-0 left-0 right-0 z-50 md:flex-none">
      <div className="w-full py-[16px] border-b border-[#222129] box-border md:px-[26px] px-[4%] flex justify-between">
        <h1 className="font-bold md:text-[2rem] text-[26px] text-left w-[180px] m-0 p-0">
          <span className="text-[#faab00]">Stream</span>
          <span className="text-white">Phim</span>
        </h1>

        {/* Toggle menu icon (điều khiển khi trên mobile) */}
        <div
          className="md:hidden flex items-center cursor-pointer text-[26px] pl-0"
          onClick={toggleMenu}
        >
          <Icons.Navbar.bar />
        </div>
      </div>

      <RenderInfo />

      {/* Phần menu trên mobile */}
      <div className={`md:flex hidden md:w-full md:py-[20px] md:px-[26px] `}>
        <RenderNavBar />
      </div>

      {/* Sidebar menu */}
      <div
        className={`fixed top-[80px] right-0 h-[60%] w-[250px] bg-[#222129] transition-all duration-300 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden z-[999] border-t border-[#faab00]`}
      >
        <h1 className="font-bold md:text-[2rem] text-[26px] text-left w-[180px] m-0 p-0">
          <span className="text-[#faab00]">Stream</span>
          <span className="text-white">Phim</span>
        </h1>
        <div className="p-4 text-white">
          <RenderNavBar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
