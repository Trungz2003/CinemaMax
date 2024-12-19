import React from "react";
import { Link } from "react-router-dom";
import Icons from "../../ultils/Icons";
import path from "../../ultils/Path";

const PageTitle = ({ title }) => {
  return (
    <div className="w-full h-[148px] md:px-[8%] px-[4%] md:flex border-b border-gray-600 box-border grid place-items-center">
      <div className="md:w-[50%] w-full md:h-full md:text-[40px] text-[30px] flex items-center justify-start">
        {title}
      </div>
      <div className="flex md:w-[50%] w-full md:h-full md:justify-end justify-start items-center gap-3 text-[16px]">
        <div>
          <Link to={path.HOME} className="hover:text-[#f9ab00] select-none">
            Trang chủ
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Icons.About.right /> {title}
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
