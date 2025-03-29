import React from "react";
import Navbar from "../../components/client/Navbar";
import { Footer } from "../../components/client/Footer";
import PageTitle from "../../components/client/PageTitle";
import Features from "../../components/client/Features";

const RenderAbout = () => {
  return (
    <div className="bg-[#1a191f] text-white w-full border-b border-gray-600 box-border">
      <PageTitle title="Giới thiệu về chúng tôi" />
      <div className="w-full md:px-[8%] px-[4%] pt-[80px] pb-[70px] text-[16px] border-b border-gray-600 box-border">
        <div className="w-full md:text-[36px] text-[26px] flex justify-start">
          <span className="text-left">
            <span className="font-bold">StreamPhim</span> – Nơi tốt nhất để xem
            phim
          </span>
        </div>
        <div className="w-full text-justify mt-[10px] md:text-[16px] text-[14px]">
          <span className="w-full">
            Chào mừng đến với trang web phim{" "}
            <span className="font-bold">StreamPhim</span> , điểm đến tuyệt vời
            cho tất cả những người đam mê phim ảnh. Đắm mình vào thế giới của
            những câu chuyện hấp dẫn, hình ảnh tuyệt đẹp và những màn trình diễn
            khó quên. Khám phá thư viện phim đồ sộ của chúng tôi, trải dài trên
            nhiều thể loại, thời đại và nền văn hóa.
          </span>
        </div>
        <div className="w-full text-justify mt-[20px]">
          <span className="w-full">
            Hãy đắm mình vào niềm vui của điện ảnh với bộ sưu tập được tuyển
            chọn của chúng tôi, gồm những bộ phim được chọn lọc kỹ lưỡng theo
            chủ đề, đạo diễn hoặc diễn viên. Đắm mình vào thế giới ma thuật điện
            ảnh và để bản thân được đưa đến những miền đất mới của trí tưởng
            tượng và cảm xúc.
          </span>
        </div>

        <Features />
      </div>

      <div className="w-full pt-[80px] pb-[70px] md:px-[8%] px-[4%] text-[16px] border-b border-gray-600 box-border">
        <div className="text-[36px] w-full text-left">
          Nó hoạt động thế nào?
        </div>
        <div className="w-full flex flex-wrap justify-start mt-[30px] gap-[23px]">
          <div className="w-[410px] h-[270px] rounded-[8px] p-[30px] text-left bg-[#222129]">
            <div className="text-[46px] text-[#faab00] font-bold p-0 m-0">
              01
            </div>
            <div className="text-[20px] mt-[5px]">Tạo một tài khoản</div>
            <div className="mt-[10px]">
              Bắt đầu hành trình xem phim của bạn bằng cách tạo một tài khoản cá
              nhân trên nền tảng của chúng tôi. Đăng ký dễ dàng và truy cập vào
              thế giới giải trí.
            </div>
          </div>
          <div className="w-[410px] h-[270px] rounded-[8px] p-[30px] text-left bg-[#222129]">
            <div className="text-[46px] text-[#faab00] font-bold p-0 m-0">
              02
            </div>
            <div className="text-[20px] mt-[5px]">Chọn gói của bạn</div>
            <div className="mt-[10px]">
              Chọn gói dịch vụ hoàn hảo phù hợp với sở thích và thói quen xem
              của bạn. Chúng tôi cung cấp nhiều tùy chọn đăng ký từ gói cơ bản
              đến gói cao cấp.
            </div>
          </div>
          <div className="w-[410px] h-[270px] rounded-[8px] p-[30px] text-left bg-[#222129]">
            <div className="text-[46px] text-[#faab00] font-bold p-0 m-0">
              03
            </div>
            <div className="text-[20px] mt-[5px]">Thưởng thức StreamPhim</div>
            <div className="mt-[10px]">
              Đắm mình vào thế giới StreamPhim, nơi có dịch vụ phát trực tuyến phim
              không giới hạn đang chờ đón. Với bộ sưu tập phim đồ sộ của chúng
              tôi, sẽ có phim dành cho mọi người.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutUs = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      {/* Navbar cố định */}
      <div className="w-full h-[80px]">
        <Navbar />
      </div>

      {/* Nội dung chính cuộn dưới Navbar */}
      <div className="w-full mt-[80px]">
        <RenderAbout />
      </div>

      {/* Footer */}
      <div className="w-full md:h-[85px] h-[300 px]">
        <Footer />
      </div>
    </div>
  );
};

export default AboutUs;
