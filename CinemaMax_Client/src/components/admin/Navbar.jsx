import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import Link và useLocation
import Icons from "../../ultils/Icons";
import path from "../../ultils/Path";

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

const Navbar = () => {
  return (
    <div className="w-full md:w-[18%] bg-[#1a191f] md:h-[100vh] md:border-r md:border-[#222129] md:box-border fixed top-0 left-0 right-0 z-50">
      <div className="w-full py-[16px] border-b border-[#222129] box-border md:px-[26px] px-[4%]">
        <h1 className="font-bold md:text-[2rem] text-[26px] text-left w-[180px] m-0 p-0">
          <span className="text-[#faab00]">Cinema</span>
          <span className="text-white">Max</span>
        </h1>
      </div>

      {/* Các phần còn lại sẽ bị ẩn khi ở chế độ mobile */}
      <div className="md:flex md:w-full md:py-[20px] md:px-[26px] md:border-b md:border-[#222129] box-border hidden">
        <div className="md:w-[80%] w-[600px] h-full flex items-center justify-start mb-4 md:mb-0">
          <div className="w-[40px] h-[40px] rounded bg-[#212026] flex justify-center items-center">
            <Icons.MovieDetails.persion className="w-[70%] h-[70%]" />
          </div>
          <div className="h-full w-[130px] ml-[20px] relative text-left">
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
              <p className="text-left text-[12px]">Quản trị viên</p>
              <p className="font-bold text-left text-[16px]">John Doe</p>
            </div>
          </div>
        </div>

        <div className="md:w-[20%] w-full h-full flex items-center justify-end mb-4 md:mb-0">
          <div className="w-[40px] h-[40px] rounded-[8px] flex justify-center items-center cursor-pointer select-none hover:text-[#f9ab00] border-[2px] border-[#f9ab00]">
            <Icons.MyCinemaMax.logout className="w-[60%] h-[60%]" />
          </div>
        </div>
      </div>

      {/* RenderNavBar cũng bị ẩn khi ở chế độ mobile */}
      <div className="pt-[25px] px-[26px] border-r border-[#222129] box-border md:block hidden">
        <RenderNavBar />
      </div>
    </div>
  );
};

export default Navbar;
