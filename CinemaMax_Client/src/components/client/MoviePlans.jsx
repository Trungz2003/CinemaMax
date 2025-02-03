import React from "react";
import Icons from "../../ultils/Icons";
import SelectPlans from "../../pages/client/SelectPlans";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import path from "../../ultils/Path";

export const MoviePlans = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Thêm/lớp `no-scroll` vào body
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Dọn dẹp khi component bị unmount
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isModalOpen]);

  const SettingCircleCheck = () => {
    return (
      <Icons.MoviePlans.circleCheck className="text-[20px] text-[#29b474]" />
    );
  };

  const SettingCricleMinus = () => {
    return (
      <Icons.MoviePlans.cricleMinus className="text-[20px] text-[#a5a6a6]" />
    );
  };

  return (
    <div className="w-full h-full pb-[60px] md:px-[8%] px-[4%] ">
      <div className="w-full h-full md:text-[30px] text-[20px] text-white text-left">
        <p>Chọn kế hoạch của bạn</p>
      </div>
      <div className="w-full md:h-[360px] h-full mt-[20px] md:flex gap-[20px] justify-between">
        <div className="md:w-[410px] w-full h-[360px] mb-[10px] p-[30px] border-t-[3px] border-[#f4aa14] shadow-xl bg-[#222129] rounded-lg">
          <div className="w-full flex pb-[20px]">
            <p className="text-[26px] text-white w-[50%] text-left">Basic</p>
            <p className="text-[27px] text-[#f4aa14] font-bold w-[50%] text-right">
              Free
            </p>
          </div>
          <div className="w-full text-white">
            <div className="w-full flex text-[16px] items-center mb-[10px]">
              <SettingCircleCheck />
              <p className="ml-[10px]">7 ngày</p>
            </div>
            <div className="w-full flex text-[16px] items-center mb-[10px]">
              <SettingCircleCheck />
              <p className="ml-[10px]">Độ phân giải 720p</p>
            </div>
            <div className="w-full flex text-[16px] items-center mb-[10px]">
              <SettingCricleMinus />
              <p className="ml-[10px] text-[#a5a6a6]">Số lượng có hạn</p>
            </div>
            <div className="w-full flex text-[16px] items-center mb-[10px]">
              <SettingCricleMinus />
              <p className="ml-[10px] text-[#a5a6a6]">
                Chỉ dành cho máy tính để bàn
              </p>
            </div>
            <div className="w-full flex text-[16px] items-center mb-[10px]">
              <SettingCricleMinus />
              <p className="ml-[10px] text-[#a5a6a6]">Hỗ trợ hạn chế</p>
            </div>
          </div>

          <div className="w-[100%] mt-[30px] flex justify-center">
            <Link
              to={path.SIGNUP}
              className="bg-[#222129] text-white w-full py-[5px] h-[46px] transition flex justify-center items-center rounded-[8px] border-[2px] border-[#faab00] hover:text-[#faab00]"
            >
              ĐĂNG KÝ
            </Link>
          </div>
        </div>
        <div className="md:w-[410px] w-full h-[360px] mb-[10px] p-[30px] border-t-[3px] border-[#ef6430] shadow-xl bg-[#222129] rounded-lg">
          <div className="w-full flex pb-[20px]">
            <p className="text-[26px] text-white w-[50%] text-left">Premium</p>
            <div className="text-[27px] text-[#ef6430] font-bold w-[50%] flex items-baseline justify-end">
              <span>$34.99</span>
              <span className="text-[12px] ml-1">/ tháng</span>
            </div>
          </div>
          <div className="w-full text-white">
            <div className="w-full flex text-[16px] items-center mb-[10px]">
              <SettingCircleCheck />
              <p className="ml-[10px]">1 tháng</p>
            </div>
            <div className="w-full flex text-[16px] items-center mb-[10px]">
              <SettingCircleCheck />
              <p className="ml-[10px]">Độ phân giải Full HD</p>
            </div>
            <div className="w-full flex text-[16px] items-center mb-[10px]">
              <SettingCircleCheck />
              <p className="ml-[10px]">Số lượng có hạn</p>
            </div>
            <div className="w-full flex text-[16px] items-center mb-[10px]">
              <SettingCricleMinus />
              <p className="ml-[10px] text-[#a5a6a6]">TV & Máy tính để bàn</p>
            </div>
            <div className="w-full flex text-[16px] items-center mb-[10px]">
              <SettingCricleMinus />
              <p className="ml-[10px] text-[#a5a6a6]">Hỗ trợ 24/7</p>
            </div>
          </div>

          <div className="w-[100%] mt-[30px] flex justify-center">
            <button
              className="bg-[#222129] text-white w-full py-[5px] h-[46px] transition flex justify-center items-center rounded-[8px] border-[2px] border-[#ef6430] hover:text-[#ef6430]"
              onClick={handleOpenModal}
            >
              ĐĂNG KÝ
            </button>
          </div>
        </div>
        <div className="md:w-[410px] w-full h-[360px] p-[30px] mb-[10px] border-t-[3px] border-[#de585d] shadow-xl bg-[#222129] rounded-lg">
          <div className="w-full flex pb-[20px]">
            <p className="text-[26px] text-white w-[50%] text-left">
              Cinematic
            </p>
            <div className="text-[27px] text-[#de585d] font-bold w-[50%] flex items-baseline justify-end">
              <span>$49.99</span>
              <span className="text-[12px] ml-1">/ tháng</span>
            </div>
          </div>
          <div className="w-full text-white">
            <div className="w-full flex text-[16px] items-center mb-[10px]">
              <SettingCircleCheck />
              <p className="ml-[10px]">7 ngày</p>
            </div>
            <div className="w-full flex text-[16px] items-center mb-[10px]">
              <SettingCircleCheck />
              <p className="ml-[10px]">Độ phân giải 720p</p>
            </div>
            <div className="w-full flex text-[16px] items-center mb-[10px]">
              <SettingCircleCheck />
              <p className="ml-[10px]">Số lượng có hạn</p>
            </div>
            <div className="w-full flex text-[16px] items-center mb-[10px]">
              <SettingCircleCheck />
              <p className="ml-[10px]">Chỉ dành cho máy tính để bàn</p>
            </div>
            <div className="w-full flex text-[16px] items-center mb-[10px]">
              <SettingCircleCheck />
              <p className="ml-[10px]">Hỗ trợ hạn chế</p>
            </div>
          </div>

          <div className="w-[100%] mt-[30px] flex justify-center">
            <button
              className="bg-[#222129] text-white w-full py-[5px] h-[46px] transition flex justify-center items-center rounded-[8px] border-[2px] border-[#de585d] hover:text-[#de585d]"
              onClick={handleOpenModal}
            >
              ĐĂNG KÝ
            </button>
          </div>

          {isModalOpen && <SelectPlans onClose={handleCloseModal} />}
        </div>
      </div>
    </div>
  );
};
