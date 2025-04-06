import React, { useState } from "react";
import Navbar from "../../components/client/Navbar";
import { Footer } from "../../components/client/Footer";
import PageTitle from "../../components/client/PageTitle";
import Icons from "../../ultils/Icons";
import { ShowToast } from "../../ultils/ToastUtils";
import { userSendMail } from "../../apis/client/contacts";

const RenderContacts = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Trạng thái loading

  // Hàm xử lý khi nhấn nút gửi
  const handleSubmit = async () => {
    if (!name || !email || !subject || !message) {
      ShowToast("error", "Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setLoading(true);
    const formData = { name, email, subject, message };

    try {
      const response = await userSendMail(formData);
      if (response.code === 401) {
        ShowToast("error", "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
      } else {
        ShowToast("success", "Gửi email thành công!");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      }
    } catch (error) {
      ShowToast("error", "Lỗi khi gửi email, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-[#1a191f] text-white pt-[80px] pb-[100px] w-full border-b border-gray-600 box-border text-[16px]">
      <PageTitle title={"Liên hệ"} />
      <div className="pt-[70px] md:px-[8%] px-[4%] md:flex">
        <div className="md:w-[67%] w-full md:p-[10px] ">
          <div className="text-[36px] w-full text-left">Biểu mẫu liên hệ</div>
          <div className="w-full  border rounded-[8px] border-gray-800 px-[30px] py-[40px] mt-[24px]">
            <div className="w-full md:flex ">
              <div className="md:w-[50%] md:pr-[10px] text-left">
                <p>Tên</p>
                <input
                  id="name"
                  name="name"
                  type="name"
                  placeholder="Manh"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full h-[45px] bg-[#222129] mt-[10px] text-white rounded-[8px] py-1 pl-[20px] focus:ring-1 focus:ring-custom-yellow focus:outline-none"
                />
              </div>
              <div className="md:w-[50%] md:pl-[10px] text-left mt-[30px] md:mt-0">
                <p>Email</p>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Namz2003@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full h-[45px] bg-[#222129] mt-[10px] text-white rounded-[8px] py-1 pl-[20px] focus:ring-1 focus:ring-custom-yellow focus:outline-none"
                />
              </div>
            </div>
            <div className="w-full text-left mt-[30px]">
              <p>Chủ thể</p>
              <input
                id="Subject"
                name="Subject"
                type="Subject"
                placeholder="Quan hệ đối tác"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="block w-full h-[45px] bg-[#222129] mt-[10px] text-white rounded-[8px] py-1 pl-[20px] focus:ring-1 focus:ring-custom-yellow focus:outline-none"
              />
            </div>
            <div className="w-full text-left mt-[30px]">
              <p>Tin nhắn</p>
              <textarea
                id="message"
                name="message"
                className="p-[15px] rounded-[8px] mt-[10px] w-full h-[150px] bg-[#222129] resize-none"
                placeholder="Thêm bình luận"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                type="button"
                className="mt-[40px] border-[2px] border-[#f9ab00] hover:bg-[#f2d19480] text-white p-2 rounded-lg w-[140px] h-[45px]"
              >
                {loading ? "Đang gửi..." : "Gửi"}
              </button>
            </div>
          </div>
        </div>
        <div className="md:w-[33%] md:p-[10px] md:mt-0 mt-[80px] w-full">
          <div className="text-[36px] w-full text-left">Liên hệ</div>
          <div className="w-full mt-[24px]">
            <p className="w-full text-left">
              Chúng tôi luôn sẵn lòng giúp đỡ và cung cấp thêm thông tin về các
              dịch vụ của chúng tôi. Bạn có thể liên hệ với chúng tôi qua email,
              điện thoại hoặc bằng cách điền vào biểu mẫu trên trang web của
              chúng tôi. Cảm ơn bạn đã cân nhắc đến chúng tôi!
            </p>

            <p className="w-full text-left mt-[15px]">+86 337196790</p>
            <div className="w-full mt-[15px] flex justify-start gap-3">
              {/* Icon Facebook */}
              <a
                href="https://www.facebook.com/quang.trung.502564/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#faab00] transition-all"
              >
                <Icons.Login.facebook />
              </a>

              <a
                href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=quangtrunghytq203@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#faab00] transition-all"
              >
                <Icons.Login.google />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Contacts = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-full h-[80px]">
        <Navbar />
      </div>
      <div className="w-full mt-[2px]">
        <RenderContacts />
      </div>
      <div className="w-full md:h-[85px] h-[300px]">
        <Footer />
      </div>
    </div>
  );
};

export default Contacts;
