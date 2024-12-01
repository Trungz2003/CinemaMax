import React from "react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import PageTitle from "../components/PageTitle";
import Icons from "../ultils/Icons";
import { useState } from "react";

const RenderHelpCenter = () => {
  // Dữ liệu các câu hỏi và câu trả lời
  const faqData = [
    {
      question: "Tại sao video không tải được?",
      answer:
        "Một thực tế đã được chứng minh từ lâu là người đọc sẽ bị phân tâm bởi nội dung dễ đọc của một trang khi nhìn vào bố cục của nó . Mục đích của việc sử dụng Lorem Ipsum là nó có sự phân bổ các chữ cái ít nhiều bình thường, trái ngược với việc sử dụng 'Nội dung ở đây, nội dung ở đây', khiến nó trông giống như tiếng Anh dễ đọc.",
    },
    {
      question: "Làm thế nào để tôi có thể phát video toàn màn hình?",
      answer:
        "Nếu bạn định sử dụng một đoạn văn bản Lorem Ipsum, bạn cần chắc chắn rằng không có bất kỳ điều gì đáng xấu hổ ẩn giấu ở giữa văn bản. Tất cả các trình tạo Lorem Ipsum trên Internet có xu hướng lặp lại các đoạn được xác định trước khi cần thiết, khiến đây trở thành trình tạo thực sự đầu tiên trên Internet.",
    },
    {
      question: "Tại sao video này lại không có phiên bản HD?",
      answer:
        "Nhiều gói xuất bản trên máy tính để bàn và trình chỉnh sửa trang web hiện sử dụng Lorem Ipsum làm văn bản mẫu mặc định và tìm kiếm 'lorem ipsum' sẽ khám phá ra nhiều trang web vẫn còn trong giai đoạn trứng nước. Nhiều phiên bản đã phát triển qua nhiều năm, đôi khi là vô tình, đôi khi là cố ý (thêm vào sự hài hước và những thứ tương tự).",
    },
    {
      question: "Trình duyệt nào được hỗ trợ?",
      answer:
        "Nó sử dụng một từ điển gồm hơn 200 từ tiếng Latin, kết hợp với một số ít cấu trúc câu mẫu, để tạo ra Lorem Ipsum trông có vẻ hợp lý. Do đó, Lorem Ipsum được tạo ra luôn không có sự lặp lại, sự hài hước được đưa vào hoặc các từ không đặc trưng, ​​v.v.",
    },
    {
      question: "Tại sao âm thanh lại bị méo?",
      answer:
        "Có nhiều phiên bản khác nhau của Lorem Ipsum, nhưng phần lớn đã bị thay đổi ở một hình thức nào đó, bằng cách thêm yếu tố hài hước hoặc các từ ngẫu nhiên trông thậm chí không có vẻ đáng tin chút nào.",
    },
    {
      question: "Bạn xử lý quyền riêng tư của tôi như thế nào?",
      answer:
        "Nhiều gói xuất bản trên máy tính để bàn và trình chỉnh sửa trang web hiện sử dụng Lorem Ipsum làm văn bản mẫu mặc định và tìm kiếm 'lorem ipsum' sẽ khám phá ra nhiều trang web vẫn còn trong giai đoạn trứng nước. Nhiều phiên bản đã phát triển qua nhiều năm, đôi khi là vô tình, đôi khi là cố ý (thêm vào sự hài hước và những thứ tương tự).",
    },
    {
      question: "Tại sao Video bị giật, dừng đột ngột hoặc dừng đột ngột?",
      answer:
        "Nếu bạn định sử dụng một đoạn văn bản Lorem Ipsum, bạn cần chắc chắn rằng không có bất kỳ điều gì đáng xấu hổ ẩn giấu ở giữa văn bản. Tất cả các trình tạo Lorem Ipsum trên Internet có xu hướng lặp lại các đoạn được xác định trước khi cần thiết, khiến đây trở thành trình tạo thực sự đầu tiên trên Internet.",
    },
    {
      question: "Tôi có thể liên lạc với bạn bằng cách nào?",
      answer:
        "Nhiều gói xuất bản trên máy tính để bàn và trình chỉnh sửa trang web hiện sử dụng Lorem Ipsum làm văn bản mẫu mặc định và tìm kiếm 'lorem ipsum' sẽ khám phá ra nhiều trang web vẫn còn trong giai đoạn trứng nước. Nhiều phiên bản đã phát triển qua nhiều năm, đôi khi là vô tình, đôi khi là cố ý (thêm vào sự hài hước và những thứ tương tự).",
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
