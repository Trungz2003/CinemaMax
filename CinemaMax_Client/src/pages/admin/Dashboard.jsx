import React, { useState } from "react";
import Navbar from "../../components/admin/Navbar";
import Icons from "../../ultils/Icons";
import { Link } from "react-router-dom";
import path from "../../ultils/Path";
import { getDashboard } from "../../apis/server/Dashboard";
import { useEffect } from "react";
import RenderMoviesTableDashboard from "../../components/admin/RenderMoviesTableDashboard";

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
      value: statistics.totalViews,
      change: statistics.growthPercentage, // Sử dụng số thực cho phần trăm thay đổi
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

  const handleDashboard = async () => {
    try {
      const response = await getDashboard();

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
  useEffect(() => {
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
          <RenderMoviesTableDashboard
            title="Phim có đánh giá cao nhất"
            data={topRatedMovie}
            columnTitles={{
              id: "ID",
              name: "TÊN PHIM",
              type: "LOẠI",
              rating: "ĐÁNH GIÁ",
            }}
            headerIcons={[Icons.Dashboard.trophy, Icons.Dashboard.refresh]}
            handleDashboard={handleDashboard}
          />
          <div className="md:hidden md:pt-0 pt-[25px]"></div>
          <RenderMoviesTableDashboard
            title="Phim mới nhất"
            data={latestMovie}
            columnTitles={{
              id: "ID",
              name: "TÊN PHIM",
              type: "LOẠI",
              rating: "ĐÁNH GIÁ",
            }}
            headerIcons={[Icons.Dashboard.movie, Icons.Dashboard.refresh]}
            handleDashboard={handleDashboard}
            className="mt-[25px]"
          />
        </div>

        <div className="w-full pt-[30px] md:flex gap-[25px]">
          <RenderMoviesTableDashboard
            title="Người dùng mới nhất"
            data={latestUser}
            columnTitles={{
              id: "ID",
              name: "TÊN ĐẦY ĐỦ",
              type: "E-MAIL",
              rating: "TÊN NGƯỜI DÙNG",
            }}
            headerIcons={[Icons.Dashboard.users, Icons.Dashboard.refresh]}
            handleDashboard={handleDashboard}
          />
          <div className="md:hidden md:pt-0 pt-[25px]"></div>
          <RenderMoviesTableDashboard
            title="Đánh giá mới nhất"
            data={latestRatedMovie}
            columnTitles={{
              id: "ID",
              name: "TÊN PHIM",
              type: "TÁC GIẢ",
              rating: "ĐÁNH GIÁ",
            }}
            headerIcons={[Icons.Dashboard.star, Icons.Dashboard.refresh]}
            handleDashboard={handleDashboard}
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
