import React from "react";
import Navbar from "../../components/client/Navbar";
import { Footer } from "../../components/client/Footer";
import PageTitle from "../../components/client/PageTitle";
import Profile from "../client/Profile";
import Subscription from "../client/Subscription";
import RenderListMovie from "../../components/client/RenderListMovie";
import Setting from "./Setting";

import Icons from "../../ultils/Icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import path from "../../ultils/Path";
import { logout } from "../../apis/client/Auth";
import { auth, logOut } from "../../firebase/firebaseConfig";
import { ShowToast } from "../../ultils/ToastUtils";
import { getProfileUser } from "../../apis/client/user";
import { useEffect } from "react";
import defaultAvatar from "../../assets/img_user/img_user_not_avata.png";
import { useMovies } from "../../ultils/MovieContext";
import { useRef } from "react";

const ContentNavbar = ({
  index,
  totalCommentUser,
  totalRatingUser,
  userSubscriptions,
  topRatedMovies,
  latestRatedMovies,
  favoriteMovies,
  handleUpdateFavorite,
  myInfo,
  setMyInfo,
}) => {
  return (
    <div className="w-full">
      {index === 0 && (
        <Profile
          totalCommentUser={totalCommentUser}
          totalRatingUser={totalRatingUser}
          userSubscriptions={userSubscriptions}
          topRatedMovies={topRatedMovies}
          latestRatedMovies={latestRatedMovies}
        />
      )}
      {index === 1 && <Subscription />}
      {index === 2 && (
        <RenderListMovie
          data={favoriteMovies}
          onUpdateFavorites={handleUpdateFavorite}
          isFavoriteList={true}
        />
      )}
      {index === 3 && <Setting myInfo={myInfo} setMyInfo={setMyInfo} />}
    </div>
  );
};

const RenderNavBar = ({ activeIndex, setActiveIndex }) => {
  const menuItems = ["HỒ SƠ", "ĐĂNG KÝ", "YÊU THÍCH", "CÀI ĐẶT"];

  return (
    <div className="w-full flex h-full items-center justify-start md:gap-[40px] gap-[39px] md:pt-0 pt-[10px]">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className="relative h-full cursor-pointer flex items-center hover:text-[#f9ab00] select-none"
          onClick={() => setActiveIndex(index)} // Đặt trạng thái khi click
        >
          <span
            className={`${
              activeIndex === index ? "text-[#f9ab00]" : "text-white"
            } transition-all duration-300`}
          >
            {item}
          </span>
          {activeIndex === index && (
            <div
              className="absolute md:bottom-[-2px] bottom-[-19px] left-0 w-full h-[2px]"
              style={{ backgroundColor: "#f9ab00" }}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

const RenderMyCinemaMax = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Theo dõi mục đang được chọn
  const navigate = useNavigate(); // Dùng để chuyển trang sau khi logout
  const [myInfo, setMyInfo] = useState({});
  const [totalCommentUser, setTotalCommentUser] = useState(0);
  const [totalRatingUser, setTotalRatingUser] = useState(0);
  const [userSubscriptions, setUserSubscriptions] = useState({});
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [latestRatedMovies, setLatestRatedMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const { handleUpdateMoviePublic, handleUpdateMoviePrivate } = useMovies();
  const toastShown = useRef(false); // Dùng useRef để lưu trạng thái cờ
  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("Không có token, điều hướng về trang đăng nhập!");
      navigate(path.LOGIN);
      return;
    }

    try {
      // 1. Gọi API backend để logout
      await logout(token);

      // 2. Xóa token khỏi localStorage
      localStorage.removeItem("token");

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

  const handleUpdateFavorite = (movieId, isCurrentlyFavorite) => {
    setFavoriteMovies((prevFavorites) =>
      prevFavorites.map((movie) =>
        movie.id === movieId
          ? { ...movie, isFavorite: !isCurrentlyFavorite }
          : movie
      )
    );

    handleUpdateMoviePublic(movieId, isCurrentlyFavorite);
    handleUpdateMoviePrivate(movieId);
  };

  useEffect(() => {
    const fetchProfileUser = async () => {
      try {
        const response = await getProfileUser();

        if (response.code === 0) {
          setMyInfo(response.result.user);
          setTotalCommentUser(response.result.totalCommentUser);
          setTotalRatingUser(response.result.totalRatingUser);
          setUserSubscriptions(response.result.userSubscriptions);
          setTopRatedMovies(response.result.topRatedMovies);
          setLatestRatedMovies(response.result.latestRatedMovies);
          setFavoriteMovies(response.result.favoriteMovies);
          toastShown.current = false;
        } else if (response.code === 401) {
          localStorage.removeItem("token");
          if (!toastShown.current) {
            // Kiểm tra nếu chưa hiển thị thông báo
            ShowToast(
              "error",
              "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!"
            );
            toastShown.current = true; // Đánh dấu đã hiển thị thông báo
          }

          navigate(path.LOGIN); // Redirect to login page
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfileUser();
  }, []);

  return (
    <div className="bg-[#1a191f] text-white w-full border-b border-gray-600 box-border text-[16px] pt-[80px]">
      <PageTitle title={"Hồ sơ"} />
      <div className="w-full">
        <div className="border-b border-gray-600 box-border w-full md:px-[8%] px-[4%] md:flex md:flex-row flex-col md:h-[80px] h-auto ">
          <div className="flex md:w-[23%] md:pt-0 pt-[20px]">
            {/* Thông tin người dùng (Tên và ID) */}
            <div className="md:w-full w-[600px] h-full flex items-center justify-start mb-4 md:mb-0">
              <div className="w-[40px] h-[40px] rounded-[9999px] bg-[#212026] flex justify-center items-center">
                <img
                  src={myInfo.thumbnail || defaultAvatar}
                  alt="User Avatar"
                  className="w-[100%] object-cover rounded-full h-full"
                />
              </div>

              <div className="h-full w-[80%] ml-[20px] relative">
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
                  <p className="font-bold text-left">{myInfo.userName}</p>
                  <p className="text-left">id: {myInfo.id}</p>
                </div>
              </div>
            </div>

            {/* Nút Logout với Icon (Chỉ hiển thị trên mobile) */}
            <div className="md:hidden w-full h-full flex items-center justify-end mb-4 md:mb-0">
              <div className="w-[40px] h-[40px] rounded-full bg-[#f9ab00] flex justify-center items-center cursor-pointer select-none hover:bg-[#e08900]">
                <Icons.MyCinemaMax.logout className="w-[60%] h-[60%] text-white" />
              </div>
            </div>
          </div>

          {/* Navbar */}
          <div className="md:w-[57%] w-full h-full mb-4 md:mb-0">
            <RenderNavBar
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          </div>

          {/* Nút Logout với Text (Chỉ hiển thị trên desktop) */}
          <div className="md:block hidden  w-[120px] h-[40px] rounded-[8px] border-[2px] border-[#f9ab00] cursor-pointer hover:text-[#f9ab00] md:mt-[20px] md:ml-[135px]">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full h-full select-none flex justify-center items-center"
            >
              LOGOUT
            </button>
          </div>
        </div>

        <div className=" w-full  pt-[35px] pb-[70px]">
          <ContentNavbar
            index={activeIndex}
            totalCommentUser={totalCommentUser}
            totalRatingUser={totalRatingUser}
            userSubscriptions={userSubscriptions}
            topRatedMovies={topRatedMovies}
            latestRatedMovies={latestRatedMovies}
            favoriteMovies={favoriteMovies}
            handleUpdateFavorite={handleUpdateFavorite}
            myInfo={myInfo}
            setMyInfo={setMyInfo}
          />
        </div>
      </div>
    </div>
  );
};

const MyCinemaMax = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-full h-[80px]">
        <Navbar />
      </div>
      <div className="w-full">
        <RenderMyCinemaMax />
      </div>
      <div className="w-full md:h-[85px] h-[300px]">
        <Footer />
      </div>
    </div>
  );
};

export default MyCinemaMax;
