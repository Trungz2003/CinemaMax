import React from "react";
import Icons from "../ultils/Icons";

const Features = () => {
  return (
    <div className="w-full mt-[30px] flex gap-[68px] flex-wrap">
      <div className="md:w-[380px] w-full h-[120px] flex gap-3">
        <div className="w-[38px] h-full">
          <Icons.About.hd className="w-full h-[38px] text-[#faab00]" />
        </div>
        <div className="w-[342px] h-full">
          <div className="w-full text-left font-bold">Siêu HD</div>
          <div className="w-full text-left mt-[5px]">
            Trải nghiệm phim ảnh chưa từng có với tính năng Ultra HD của chúng
            tôi. Đắm chìm trong hình ảnh tuyệt đẹp, màu sắc sống động và chi
            tiết rõ nét.
          </div>
        </div>
      </div>
      <div className="md:w-[380px] w-full flex gap-3">
        <div className="w-[38px] h-full">
          <Icons.About.movie className="w-full h-[38px] text-[#faab00]" />
        </div>
        <div className="w-[342px] h-full">
          <div className="w-full text-left font-bold">
            Cơ sở dữ liệu phim lớn
          </div>
          <div className="w-full text-left mt-[5px]">
            Khám phá bộ sưu tập phim đa dạng và phong phú trong cơ sở dữ liệu
            rộng lớn của chúng tôi. Với hàng ngàn tựa phim để lựa chọn, bạn sẽ
            không bao giờ hết lựa chọn.
          </div>
        </div>
      </div>
      <div className="md:w-[380px] w-full flex gap-3">
        <div className="w-[38px] h-full">
          <Icons.About.tv className="w-full h-[38px] text-[#faab00]" />
        </div>
        <div className="w-[342px] h-full">
          <div className="w-full text-left font-bold">
            Truyền hình trực tuyến
          </div>
          <div className="w-full text-left mt-[5px]">
            Mở rộng phạm vi giải trí của bạn với TV trực tuyến của chúng tôi.
            Phát trực tiếp các kênh truyền hình, theo dõi các chương trình yêu
            thích và thưởng thức nhiều nội dung truyền hình trực tuyến.
          </div>
        </div>
      </div>
      <div className="md:w-[380px] w-full flex gap-3">
        <div className="w-[38px] h-full">
          <Icons.About.ticket className="w-full h-[38px] text-[#faab00]" />
        </div>
        <div className="w-[342px] h-full">
          <div className="w-full text-left font-bold">
            Truy cập sớm vào các mục mới
          </div>
          <div className="w-full text-left mt-[5px]">
            Hãy là người đầu tiên trải nghiệm những bộ phim mới nhất và nội dung
            độc quyền với tính năng Early Access của chúng tôi. Xem trước các
            bản phát hành sắp tới, được quyền truy cập vào các buổi chiếu đặc
            biệt và luôn đi đầu xu hướng.
          </div>
        </div>
      </div>
      <div className="md:w-[380px] w-full flex gap-3">
        <div className="w-[38px] h-full">
          <Icons.About.cast className="w-full h-[38px] text-[#faab00]" />
        </div>
        <div className="w-[342px] h-full">
          <div className="w-full text-left font-bold">Phát sóng</div>
          <div className="w-full text-left mt-[5px]">
            Truyền phát phim liền mạch từ thiết bị của bạn đến màn hình lớn với
            tích hợp Airplay. Trải nghiệm sự kỳ diệu của điện ảnh trong sự thoải
            mái tại phòng khách của bạn và chia sẻ sự phấn khích với bạn bè và
            gia đình.
          </div>
        </div>
      </div>
      <div className="md:w-[380px] w-full flex gap-3">
        <div className="w-[38px] h-full">
          <Icons.About.language className="w-full h-[38px] text-[#faab00]" />
        </div>
        <div className="w-[342px] h-full">
          <div className="w-full text-left font-bold">Phụ đề đa ngôn ngữ</div>
          <div className="w-full text-left mt-[5px]">
            Phá vỡ rào cản ngôn ngữ và thưởng thức phim từ khắp nơi trên thế
            giới với phụ đề đa ngôn ngữ của chúng tôi. Khám phá các nền văn hóa
            khác nhau, mở rộng tầm nhìn điện ảnh của bạn và đánh giá cao vẻ đẹp
            của điện ảnh toàn cầu.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
