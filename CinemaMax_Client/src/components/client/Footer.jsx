import { Link } from "react-router-dom";
import path from "../../ultils/Path";

export const Footer = () => {
  return (
    <div className="w-full md:h-[85px] h-full px-[8%] bg-[#1a191f] md:flex">
      <div className="w-[100%] flex items-center justify-start">
        <h1 className="font-bold md:text-[2rem] text-[26px] text-left m-0 p-0">
          <span className="text-[#faab00]">Cinema</span>
          <span className="text-white">Max</span>
        </h1>
      </div>
      <div className="w-[100%] bg-[#1a191f] text-white md:flex items-center md:gap-[40px] md:mt-0 mt-[10px] gap-[20px] md:justify-end justify-start md:pb-0 pb-[25px]">
        <Link
          to={path.ABOUT}
          className="text-left cursor-pointer hover:text-[#f9ab00] select-none block md:inline"
        >
          Giới thiệu về chúng tôi
        </Link>
        <Link
          to={path.FAQ} // Liên kết đến trang Chính sách bảo mật
          className="text-left cursor-pointer hover:text-[#f9ab00] select-none block md:inline"
        >
          Liên hệ
        </Link>
        <Link
          to={path.PRIVACY} // Liên kết đến trang Chính sách bảo mật
          className="text-left cursor-pointer hover:text-[#f9ab00] select-none block md:inline"
        >
          Chính sách bảo mật
        </Link>
      </div>
    </div>
  );
};
