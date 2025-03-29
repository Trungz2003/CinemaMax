import React from "react";
import Navbar from "../../components/client/Navbar";
import { Footer } from "../../components/client/Footer";
import PageTitle from "../../components/client/PageTitle";
import Icons from "../../ultils/Icons";
import { useState } from "react";

const RenderHelpCenter = () => {
  // Dữ liệu các câu hỏi và câu trả lời
  const faqData = [
    {
      question: "Tại sao video không tải được?",
      answer:
        "Có thể do kết nối mạng của bạn không ổn định hoặc máy chủ đang gặp sự cố. Hãy kiểm tra lại đường truyền internet của bạn hoặc thử tải lại trang.",
    },
    {
      question: "Làm thế nào để tôi có thể phát video toàn màn hình?",
      answer:
        "Bạn có thể nhấp vào biểu tượng toàn màn hình ở góc dưới cùng bên phải của trình phát video hoặc nhấn phím 'F' trên bàn phím để chuyển sang chế độ toàn màn hình.",
    },
    {
      question: "Tại sao video này không có phiên bản HD?",
      answer:
        "Phiên bản HD có thể không khả dụng do bản quyền hoặc do tốc độ mạng của bạn không đủ để phát ở độ phân giải cao. Hãy kiểm tra cài đặt chất lượng trong trình phát video.",
    },
    {
      question: "Trình duyệt nào được hỗ trợ?",
      answer:
        "Trang web hỗ trợ các trình duyệt phổ biến như Google Chrome, Firefox, Safari và Microsoft Edge. Để có trải nghiệm tốt nhất, hãy đảm bảo trình duyệt của bạn được cập nhật lên phiên bản mới nhất.",
    },
    {
      question: "Tại sao âm thanh lại bị méo hoặc không đồng bộ?",
      answer:
        "Điều này có thể do kết nối mạng không ổn định hoặc lỗi trình duyệt. Hãy thử làm mới trang, kiểm tra loa/tai nghe của bạn hoặc đổi sang trình duyệt khác.",
    },
    {
      question: "Bạn xử lý quyền riêng tư của tôi như thế nào?",
      answer:
        "Chúng tôi cam kết bảo vệ quyền riêng tư của bạn. Mọi thông tin cá nhân đều được mã hóa và không chia sẻ với bên thứ ba mà không có sự đồng ý của bạn.",
    },
    {
      question: "Tại sao video bị giật, dừng đột ngột?",
      answer:
        "Nguyên nhân có thể do tốc độ mạng chậm hoặc thiết bị của bạn đang chạy nhiều ứng dụng khác cùng lúc. Hãy thử giảm chất lượng video hoặc đóng bớt các ứng dụng nền.",
    },
    {
      question: "Tôi có thể liên lạc với bạn bằng cách nào?",
      answer:
        "Bạn có thể liên hệ với chúng tôi qua email hỗ trợ hoặc gửi tin nhắn qua trang liên hệ trên website. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.",
    },
  ];

  // Khai báo state để quản lý trạng thái mở/đóng của từng câu hỏi
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Hàm xử lý sự kiện toggle
  const toggleAnswer = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="bg-[#1a191f] text-white w-full border-b border-gray-600 box-border">
      <PageTitle title="Câu hỏi thường gặp" />

      <div className="w-full px-[8%] py-[70px] flex flex-wrap gap-[16px]">
        {faqData.map((item, index) => (
          <div key={index} className="w-[630px]">
            <div
              className={`w-full h-[83px] bg-[#222129] ${
                expandedIndex === index ? "rounded-t-[8px]" : "rounded-[8px]"
              } px-[30px] flex border-b-[0.5px] border-black box-border`}
            >
              <div className="w-[90%] h-full text-left text-[18px] flex items-center">
                {item.question}
              </div>
              <div className="w-[10%] h-full flex items-center justify-center">
                <div
                  className="w-[35px] h-[35px] rounded-[8px] md:ml-0 ml-[10px] bg-[#1a191f] hover:text-[#faab00] text-[25px] cursor-pointer flex justify-center items-center"
                  onClick={() => toggleAnswer(index)}
                >
                  {expandedIndex === index ? (
                    <Icons.Faq.minus />
                  ) : (
                    <Icons.Faq.add />
                  )}
                </div>
              </div>
            </div>

            {/* Hiển thị câu trả lời nếu mở */}
            <div
              className={`answer-container ${
                expandedIndex === index ? "expanded" : ""
              }`}
            >
              <div className="text-[16px] py-[10px] px-[20px] text-left bg-[#222129] text-[#C0C0C0] rounded-b-[8px]">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const HelpCenter = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      {/* Navbar cố định */}
      <div className="w-full h-[80px]">
        <Navbar />
      </div>

      {/* Nội dung chính cuộn dưới Navbar */}
      <div className="w-full mt-[80px]">
        <RenderHelpCenter />
      </div>

      {/* Footer */}
      <div className="w-full md:h-[85px] h-[300 px]">
        <Footer />
      </div>
    </div>
  );
};

export default HelpCenter;
