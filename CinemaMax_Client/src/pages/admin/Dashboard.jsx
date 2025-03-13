import React, { useState } from "react";
import Navbar from "../../components/admin/Navbar";
import Icons from "../../ultils/Icons";
import { Link } from "react-router-dom";
import path from "../../ultils/Path";
import { getDashboard } from "../../apis/server/Dashboard";
import { useEffect } from "react";

const RenderMoviesTable = ({ title, data, columnTitles, headerIcons }) => {
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
                >
                  <Icon /> {/* Render icon từ phần tử JSX */}
                </div>
              ))}

          <div className="h-[35px] w-[85px] md:w-[100px] rounded-[8px] bg-[#1a191f] cursor-pointer text-[16px] flex items-center justify-center hover:text-[#f9ab00]">
            Xem tất cả
          </div>
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

const RenderDashboard = () => {
  const [latestMovie, setLatestMovie] = useState([]);
  const [latestRatedMovie, setLatestRatedMovie] = useState([]);
  const [latestUser, setLatestUser] = useState([]);
  const [topRatedMovie, setTopRatedMovie] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const dashboardData = [
    {
      title: "Đăng ký tháng này",
      value: statistics.totalUsers,
      change: statistics.newUsersThisMonth,
      icon: Icons.Dashboard.diamond,
    },
    {
      title: "Các mục được thêm vào tháng này",
      value: statistics.totalMovies,
      change: statistics.newMoviesThisMonth, // Sử dụng số thực cho giá trị thay đổi
      icon: Icons.Dashboard.movie,
    },
    {
      title: "Lượt xem tháng này",
      value: "509 573",
      change: 3.1, // Sử dụng số thực cho phần trăm thay đổi
      icon: Icons.Dashboard.show,
      isPercentage: true, // Thêm thuộc tính isPercentage để xác định cần hiển thị phần trăm
    },
    {
      title: "Đánh giá tháng này",
      value: statistics.totalRatings,
      change: statistics.newRatingsThisMonth, // Sử dụng số thực cho giá trị thay đổi
      icon: Icons.Dashboard.star,
    },
  ];
  useEffect(() => {
    const handleDashboard = async () => {
      try {
        const response = await getDashboard();
        console.log(response.result.statistics);

        if (response.code === 0) {
          setLatestMovie(response.result.latestMovies);
          setLatestRatedMovie(response.result.latestRatedMovies);
          setTopRatedMovie(response.result.topRatedMovies);
          setLatestUser(response.result.latestUsers);
          setStatistics(response.result.statistics);
        }
      } catch (error) {
        console.log(error);
      }
    };

    handleDashboard();
  }, []);

  return (
    <div className="md:px-[2%] px-[4%] w-full text-[16px]">
      <div className="h-[80px] flex items-center justify-between border-b border-[#222129] box-border">
        <div className="text-[32px]">Dashboard</div>
        <Link
          to={path.ADDITEM}
          className="w-[120px] h-[40px] rounded-[8px] border-[2px] border-[#f9ab00] flex justify-center items-center"
        >
          THÊM MỤC
        </Link>
      </div>
      <div className="w-full md:pt-[30px] pb-[40px]">
        <div className="w-full md:h-[115px] md:flex gap-[25px]">
          {dashboardData.map((data, index) => (
            <div
              key={index}
              className="md:w-[24%] w-full md:h-full h-[115px] bg-[#222129] py-[23px] px-[20px] rounded-[8px] md:mt-0 mt-[25px]"
            >
              <div className="w-full text-left">{data.title}</div>
              <div className="w-full flex">
                <div className="w-[80%] flex gap-[10px]">
                  <div className="text-[36px] font-bold">{data.value}</div>
                  <div
                    className={`font-bold flex items-end pb-[9px] ${
                      data.change < 0 ? "text-[#EB5757]" : "text-[#29B474]"
                    }`}
                  >
                    {/* Kiểm tra nếu giá trị change là số âm hay dương để hiển thị đúng */}
                    {data.change >= 0 ? `+${data.change}` : data.change}
                    {/* Thêm dấu phần trăm nếu là phần trăm */}
                    {data.isPercentage && "%"}
                  </div>
                </div>
                <div className="w-[20%] text-[42px] flex items-end justify-end pb-[9px] text-[#f9ab00]">
                  <data.icon />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full md:flex gap-[25px] pt-[30px]">
          <RenderMoviesTable
            title="Phim có đánh giá cao nhất"
            data={topRatedMovie}
            columnTitles={{
              id: "ID",
              name: "TÊN PHIM",
              type: "LOẠI",
              rating: "ĐÁNH GIÁ",
            }}
            headerIcons={[Icons.Dashboard.trophy, Icons.Dashboard.refresh]}
          />
          <div className="md:hidden md:pt-0 pt-[25px]"></div>
          <RenderMoviesTable
            title="Phim mới nhất"
            data={latestMovie}
            columnTitles={{
              id: "ID",
              name: "TÊN PHIM",
              type: "LOẠI",
              rating: "ĐÁNH GIÁ",
            }}
            headerIcons={[Icons.Dashboard.movie, Icons.Dashboard.refresh]}
            className="mt-[25px]"
          />
        </div>

        <div className="w-full pt-[30px] md:flex gap-[25px]">
          <RenderMoviesTable
            title="Người dùng mới nhất"
            data={latestUser}
            columnTitles={{
              id: "ID",
              name: "TÊN ĐẦY ĐỦ",
              type: "E-MAIL",
              rating: "TÊN NGƯỜI DÙNG",
            }}
            headerIcons={[Icons.Dashboard.users, Icons.Dashboard.refresh]}
          />
          <div className="md:hidden md:pt-0 pt-[25px]"></div>
          <RenderMoviesTable
            title="Đánh giá mới nhất"
            data={latestRatedMovie}
            columnTitles={{
              id: "ID",
              name: "TÊN PHIM",
              type: "TÁC GIẢ",
              rating: "ĐÁNH GIÁ",
            }}
            headerIcons={[Icons.Dashboard.star, Icons.Dashboard.refresh]}
          />
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="w-full md:h-[100vh] bg-[#1a191f] text-white md:flex">
      <div className="md:w-[18%] w-full md:h-full ">
        <Navbar />
      </div>
      <div className="md:w-[82%] w-full md:h-full  md:pt-0 pt-[70px] overflow-auto">
        <RenderDashboard />
      </div>
    </div>
  );
};

export default Dashboard;
