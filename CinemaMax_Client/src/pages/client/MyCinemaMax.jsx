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

const code = 45123156;

const fakeData = [
  {
    id: 1,
    title: "I Dream in Another Language",
    rating: 9.2,
    categories: ["Hoạt động", "Giật gân"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 2,
    title: "The Silent Voice",
    rating: 8.7,
    categories: ["Hoạt hình", "Tình cảm"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 3,
    title: "Interstellar",
    rating: 9.5,
    categories: ["Khoa học", "Phiêu lưu"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 4,
    title: "Parasite",
    rating: 8.6,
    categories: ["Tâm lý", "Giật gân"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 5,
    title: "The Dark Knight",
    rating: 9.0,
    categories: ["Hành động", "Tội phạm"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 6,
    title: "Inception",
    rating: 8.8,
    categories: ["Khoa học", "Giật gân"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 7,
    title: "The Matrix",
    rating: 9.3,
    categories: ["Khoa học", "Hành động"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 8,
    title: "Coco",
    rating: 8.4,
    categories: ["Gia đình", "Hoạt hình"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 9,
    title: "Avatar",
    rating: 8.2,
    categories: ["Phiêu lưu", "Khoa học"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 10,
    title: "Spirited Away",
    rating: 9.1,
    categories: ["Hoạt hình", "Phiêu lưu"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 11,
    title: "The Godfather",
    rating: 9.2,
    categories: ["Tội phạm", "Tâm lý"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 12,
    title: "The Shawshank Redemption",
    rating: 9.7,
    categories: ["Tâm lý", "Cổ điển"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 13,
    title: "Pulp Fiction",
    rating: 9.0,
    categories: ["Tội phạm", "Tâm lý"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 14,
    title: "The Lion King",
    rating: 8.5,
    categories: ["Gia đình", "Hoạt hình"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 15,
    title: "Frozen",
    rating: 8.0,
    categories: ["Hoạt hình", "Gia đình"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 16,
    title: "Whiplash",
    rating: 8.9,
    categories: ["Tâm lý", "Âm nhạc"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 17,
    title: "Avengers: Endgame",
    rating: 8.4,
    categories: ["Hành động", "Phiêu lưu"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 18,
    title: "Joker",
    rating: 8.6,
    categories: ["Tâm lý", "Tội phạm"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 19,
    title: "Toy Story 4",
    rating: 8.3,
    categories: ["Gia đình", "Hoạt hình"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 20,
    title: "Black Panther",
    rating: 8.2,
    categories: ["Hành động", "Khoa học"],
    image: "src/assets/test/cover.png",
  },
];

const ContentNavbar = ({ index }) => {
  return (
    <div className="w-full">
      {index === 0 && <Profile />}
      {index === 1 && <Subscription />}
      {index === 2 && <RenderListMovie data={fakeData} />}
      {index === 3 && <Setting />}
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
      console.log("Đã đăng xuất khỏi Firebase");

      // 4. Hiển thị thông báo và điều hướng về trang đăng nhập
      ShowToast("success", "Đăng xuất thành công!");
      navigate(path.LOGIN);
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
      ShowToast("error", "Lỗi khi đăng xuất!");
    }
  };

  return (
    <div className="bg-[#1a191f] text-white w-full border-b border-gray-600 box-border text-[16px] pt-[80px]">
      <PageTitle title={"Hồ sơ"} />
      <div className="w-full">
        <div className="border-b border-gray-600 box-border w-full md:px-[8%] px-[4%] md:flex md:flex-row flex-col md:h-[80px] h-auto ">
          <div className="flex md:w-[23%] md:pt-0 pt-[20px]">
            {/* Thông tin người dùng (Tên và ID) */}
            <div className="md:w-full w-[600px] h-full flex items-center justify-start mb-4 md:mb-0">
              <div className="w-[40px] h-[40px] rounded bg-[#212026] flex justify-center items-center">
                <Icons.MovieDetails.persion className="w-[70%] h-[70%]" />
              </div>

              <div className="h-full w-full ml-[20px] relative">
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
                  <p className="font-bold text-left">John Doe</p>
                  <p className="text-left">id: {code}</p>
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
          <ContentNavbar index={activeIndex} />
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
