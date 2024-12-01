import React from "react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { MoviePlans } from "../components/MoviePlans";
import Features from "../components/Features";

const RenderPricingPlan = () => {
  return (
    <div className="bg-[#1a191f] text-white w-full border-b border-gray-600 box-border">
      <PageTitle title="Kế hoạch giá cả" />
      <MoviePlans />

      <div className="w-full md:px-[8%] px-[4%] pt-[80px] pb-[70px] text-[16px] border-b border-gray-600 box-border">
        <div className="w-full md:text-[36px] text-[26px] flex justify-start">
          <span className="text-left">Tính năng của chúng tôi</span>
        </div>
        <div className="w-full text-justify mt-[10px] md:text-[16px] text-[14px]">
          <span className="w-full">
            Chào mừng đến với trang web phim HotFlix, điểm đến tuyệt vời cho tất
            cả những người đam mê phim ảnh. Đắm mình vào thế giới của những câu
            chuyện hấp dẫn, hình ảnh tuyệt đẹp và những màn trình diễn khó quên.
            Khám phá thư viện phim đồ sộ của chúng tôi, trải dài trên nhiều thể
            loại, thời đại và nền văn hóa.
          </span>
        </div>
        <Features />
      </div>
    </div>
  );
};

const PricingPlan = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      {/* Navbar cố định */}
      <div className="w-full h-[80px]">
        <Navbar />
      </div>

      {/* Nội dung chính cuộn dưới Navbar */}
      <div className="w-full mt-[80px]">
        <RenderPricingPlan />
      </div>

      {/* Footer */}
      <div className="w-full md:h-[85px] h-[300 px]">
        <Footer />
      </div>
    </div>
  );
};

export default PricingPlan;
