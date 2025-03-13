import React, { useState } from "react";
import Navbar from "../../components/admin/Navbar";
import { sendUpdateAlluser } from "../../apis/server/Setting";
import { ShowToast } from "../../ultils/ToastUtils";

const RenderSetting = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isUploading, setIsUploading] = useState(false); // Trạng thái tải lên
  const handleSendEmail = async () => {
    const contentEmail = {
      title,
      content,
    };
    setIsUploading(true); // Bắt đầu quá trình tải lên
    // Nếu movieId hợp lệ thì gọi API update
    try {
      const response = await sendUpdateAlluser(contentEmail);
      if (response.code === 0) {
        ShowToast("success", "Gửi thông báo thành công!");
        setIsUploading(false); // Bắt đầu quá trình tải lên
      } else {
        ShowToast("error", "Không thể Gửi thông báo!");
        setIsUploading(false); // Bắt đầu quá trình tải lên
      }
    } catch (error) {
      setIsUploading(false); // Bắt đầu quá trình tải lên
      console.error("Lỗi khi cập nhật phim:", error);
    }
  };
  return (
    <div className="md:px-[2%] px-[4%] w-full text-[14px] mb-[40px]">
      <div className="text-left text-[32px] w-full h-full border-b border-[#222129] box-border md:h-[80px] flex justify-start items-center">
        Thông báo update website
      </div>

      <div className="w-full h-full border border-[#222129] box-border rounded-[8px] mt-[30px] p-[30px] text-[#C0C0C0]">
        {/* Spinner khi đang tải lên */}
        {isUploading && (
          <div className="flex justify-center items-center mt-4">
            <div className="animate-spin rounded-full border-t-4 border-blue-500 w-8 h-8"></div>
          </div>
        )}
        <div className="w-full text-[20px] flex justify-start text-white">
          Cài đặt meta
        </div>
        <div className="w-full">
          <div className="mt-[30px] flex gap-[5px]">
            <div>Tiêu đề</div>
            <div className="text-[#EB5757]">*</div>
          </div>
          <div className="relative w-full pt-[10px]">
            <input
              id="title"
              name="title"
              placeholder="Tiêu đề"
              value={title} // Liên kết giá trị input với state
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full h-[45px] bg-[#222129] text-white rounded-[8px] py-1.5 px-3 focus:ring-2 focus:ring-[#f9ab00] focus:outline-none"
            />
          </div>
        </div>
        <div className="w-full h-full">
          <div className="mt-[30px] flex gap-[5px]">
            <div>Sự miêu tả</div>
            <div className="text-[#EB5757]">*</div>
          </div>
          <div className="relative w-full pt-[10px]">
            <textarea
              id="describe"
              name="describe"
              placeholder="Sự miêu tả"
              value={content} // Liên kết giá trị input với state
              onChange={(e) => setContent(e.target.value)}
              className="block w-full h-[300px] bg-[#222129] text-white rounded-[8px] py-1.5 px-3 focus:ring-2 focus:ring-[#f9ab00] focus:outline-none resize-none"
            />
          </div>
        </div>

        <div className="w-full mt-[30px]">
          <div
            onClick={handleSendEmail}
            className="w-[170px] h-[42px] rounded-[8px] border-[2px] border-[#f9ab00] flex justify-center items-center cursor-pointer select-none"
          >
            Gửi
          </div>
        </div>
      </div>
    </div>
  );
};

const Setting = () => {
  return (
    <div className="w-full md:h-[100vh] bg-[#1a191f] text-white md:flex">
      <div className="md:w-[18%] w-full md:h-full ">
        <Navbar />
      </div>
      <div className="md:w-[82%] w-full md:h-full  md:pt-0 pt-[70px] overflow-auto">
        <RenderSetting />
      </div>
    </div>
  );
};

export default Setting;
