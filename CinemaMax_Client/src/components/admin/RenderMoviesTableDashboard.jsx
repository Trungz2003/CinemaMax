import React from "react";
import Icons from "../../ultils/Icons";
import { Link } from "react-router-dom";

const RenderMoviesTableDashboard = ({
  title,
  data,
  columnTitles,
  headerIcons,
  handleDashboard,
}) => {
  return (
    <div className="w-full md:w-[49%] h-[340px] bg-[#222129] rounded-[8px]">
      <div className="w-full h-[70px] flex rounded-t-[8px] border-b-[1px] border-[#1a191f]">
        <div className="w-[60%] h-full text-[20px] flex justify-start items-center md:gap-2 gap-[5px] md:px-[30px] pl-[10px]">
          <div className="text-[#f9ab00]">
            {headerIcons &&
              headerIcons
                .filter((Icon, index) => index === 0) // Chỉ lấy icon đầu tiên
                .map((Icon, index) => (
                  <div
                    key={index}
                    className="text-[20px] cursor-pointer hover:text-[#f9ab00]"
                  >
                    <Icon /> {/* Render icon từ phần tử JSX */}
                  </div>
                ))}
          </div>
          <div className="text-left">{title}</div>
        </div>

        <div className="w-[40%] h-full flex justify-end items-center text-[20px] md:gap-[30px] gap-[10px] md:px-[30px] pr-[10px]">
          {headerIcons &&
            headerIcons
              .filter((Icon, index) => index === 1) // Chỉ lấy icon thứ hai
              .map((Icon, index) => (
                <div
                  key={index}
                  className="text-[20px] cursor-pointer hover:text-[#f9ab00]"
                  onClick={handleDashboard}
                >
                  <Icon /> {/* Render icon từ phần tử JSX */}
                </div>
              ))}
        </div>
      </div>

      <div className="w-full rounded-b-[8px] mt-[10px] overflow-x-auto">
        <div className="w-full h-[50px] border-b-[1px] pl-[30px] border-[#1a191f] text-[12px] text-[#C0C0C0] flex">
          {Object.values(columnTitles).map((title, index) => (
            <div
              key={index}
              className={`flex-shrink-0 ${
                index === 0
                  ? "w-[60px] md:w-[10%]" // Cột 1, ID
                  : index === 1
                  ? "w-[350px] md:w-[45%]" // Cột 2, Tên phim
                  : index === 2
                  ? "w-[200px] md:w-[30%]" // Cột 3, Thể loại hoặc email
                  : "w-[80px] md:w-[15%]" // Cột 4, Đánh giá
              } h-full flex items-center justify-start  ${
                title === "TÊN NGƯỜI DÙNG" ? "text-[11px]" : ""
              }`}
            >
              {title}
            </div>
          ))}
        </div>

        {/* Nội dung bảng */}
        <div className="w-full whitespace-nowrap">
          {data.map((item, index) => (
            <div
              key={index}
              className="w-full h-[40px] flex text-white pl-[30px]"
            >
              <div className=" flex-shrink-0 w-[60px] md:w-[10%] h-full flex items-center justify-start text-[#C0C0C0]">
                {item.id}
              </div>
              <div className="flex-shrink-0 w-[350px] md:w-[45%] h-full flex items-center justify-start text-[#fff]">
                <Link
                  to={`/details/${item.id}`}
                  className="hover:text-[#f9ab00] select-none overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {item.title || item.fullName || "null"}{" "}
                  {/* Render tên phim hoặc tên người dùng */}
                </Link>
              </div>
              <div className="flex-shrink-0 w-[200px] md:w-[30%] h-full flex items-center justify-start ">
                <div
                  className={`${
                    item.email
                      ? "text-[#C0C0C0] overflow-hidden text-ellipsis whitespace-nowrap"
                      : "overflow-hidden text-ellipsis whitespace-nowrap" // Nếu item có email, chuyển màu chữ thành #C0C0C0
                  }`}
                >
                  {item.genres || item.email || item.actor}
                  {/* Render thể loại phim hoặc email người dùng */}
                </div>
              </div>
              <div className="flex-shrink-0 w-[80px] md:w-[15%] h-full flex items-center justify-start gap-2">
                {item.rating !== null && item.rating !== undefined && (
                  <Icons.MyCinemaMax.star className="text-[#f9ab00]" />
                )}
                {/* Render đánh giá nếu có */}
                <div
                  className={
                    item.rating
                      ? "font-bold overflow-hidden text-ellipsis whitespace-nowrap"
                      : "overflow-hidden text-ellipsis whitespace-nowrap"
                  }
                >
                  {item.rating ?? item.userName ?? "null"}
                </div>
                {/* Render điểm đánh giá hoặc tên người dùng */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RenderMoviesTableDashboard;
