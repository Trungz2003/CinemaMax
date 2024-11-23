import React from "react";
import Navbar from "../components/Navbar";
import Icons from "../ultils/Icons";

const RenderHome = () => {
  return (
    <div className="w-full pt-[80px] bg-[#1a191f]">
      <div className="w-full border-b border-gray-600 box-border">
        <div className="w-full h-full pl-[16%] absolute top-[31%] text-left text-white">
          <div className="w-[84%] h-[60px] flex items-center">
            <p className="text-white text-[30px]">Ten phim</p>
            <p className="rounded-full w-[40px] h-[40px] border-2 border-green-500 ml-[10px] flex justify-center items-center text-white">
              9.2
            </p>
          </div>
          <div className="mt-[20px]">
            <p className="w-[470px]">
              A brilliant scientist discovers a way to harness the power of the
              ocean's currents to create a new, renewable energy source. But
              when her groundbreaking technology falls into the wrong hands, she
              must race against time to stop it from being used for evil.
            </p>
          </div>
          <div className="mt-[20px]">
            <button className="bg-transparent text-white px-[10px] py-[5px] w-[165px] h-[45px] border-[2px] border-[#faab00] rounded-md hover:bg-[#f2d19480] transition">
              WATCH NOW
            </button>
          </div>

          <div className="mt-[120px] h-[35px] flex items-center">
            <div className="flex space-x-[10px]">
              <button className=" text-white px-[10px] py-[5px] h-[35px] w-[35px] rounded-[8px] border-[2px] border-[#faab00] hover:text-[#faab00] flex justify-center items-center">
                <Icons.Home.left />
              </button>
              <button className=" text-white px-[10px] py-[5px] h-[35px] w-[35px] rounded-[8px] border-[2px] border-[#faab00] hover:text-[#faab00] flex justify-center items-center">
                <Icons.Home.right />
              </button>
            </div>

            <div className="w-[70%] flex justify-center">
              <label>
                <Icons.Home.dotBlack />
              </label>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <div className="w-[84%] h-[630px] py-[30px]">
            <img
              src="src/assets/home/slide__bg-1.jpg"
              alt=""
              className="h-full w-full rounded-[10px] shadow-lg object-cover"
            />
          </div>
        </div>
      </div>

      <div className="w-full h-[80px] border-b border-gray-600 box-border flex justify-center">
        <div className="w-[84%] flex">
          <div className="flex h-full w-[70%] gap-4 ">
            <div className="mt-[20px]">
              <button className="bg-[#222129] text-white w-full px-[10px] py-[5px] h-[40px] rounded-md transition flex justify-center items-center">
                Thể loại <Icons.Home.down className="p-[2px]" />
              </button>
            </div>
            <div className="mt-[20px]">
              <button className="bg-[#222129] text-white px-[10px] py-[5px] h-[40px] rounded-md transition flex justify-center items-center">
                Đánh giá <Icons.Home.down className="p-[2px]" />
              </button>
            </div>
            <div className="mt-[20px]">
              <button className="bg-[#222129] text-white px-[10px] py-[5px] h-[40px] rounded-md transition flex justify-center items-center">
                Thời gian <Icons.Home.down className="p-[2px]" />
              </button>
            </div>
          </div>
          <div className="flex w-[30%] justify-end">
            <div className="mt-[20px] right-0">
              <button className="bg-transparent text-white px-[10px] py-[5px] w-[110px] h-[40px] border-[2px] border-[#faab00] rounded-md hover:bg-[#f2d19480] transition">
                ÁP DỤNG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="w-full h-full relative">
      <div className=" w-full h-full absolute">
        <RenderHome />
      </div>
      <div className=" w-full h-full">
        <Navbar />
      </div>
    </div>
  );
};

export default Home;
