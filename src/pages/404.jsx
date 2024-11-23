import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate(); // Hook để điều hướng

  return (
    <div className="flex justify-center items-center md:h-[100%] h-full w-full text-[14px]">
      <div className="absolute h-full w-full">
        <img
          src="src/assets/bg/section__bg.jpg"
          alt=""
          className="h-full w-full"
        />
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <div className="absolute md:w-[400px] w-[85%] max-w-[400px] h-[330px] md:h-[50%] rounded-[10px] py-[0px] md:px-[70px] px-[20px] bg-[#1a191f] shadow-[0_0_0_0.5px_rgba(255,255,255,0.3)]">
          <h1 className="text-[#faab00] text-[120px] p-0 m-0 font-bold">404</h1>
          <div className="w-full text-white text-[16px]">
            <p>Trang bạn đang tìm kiếm</p>
            <p>không có sẵn!</p>
          </div>
          <div className="mt-[35px]">
            <button
              type="button"
              onClick={() => navigate("/")} // Điều hướng về trang Home
              className="border-[2px] border-[#d6ac5a] text-[#d6ac5a] w-full h-[45px] hover:bg-[#d6ac5a] hover:text-white px-4 py-2 rounded-md"
            >
              QUAY LẠI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
