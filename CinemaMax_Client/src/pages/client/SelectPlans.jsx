import React from "react";
import Icons from "../../ultils/Icons";
import { useState } from "react";
import Filter from "../../components/admin/Filter";
import { executePayment } from "../../apis/client/SelectPlan";
import { ShowToast } from "../../ultils/ToastUtils";
import { useNavigate } from "react-router-dom";
import path from "../../ultils/Path";

const lstPayment = [
  { name: "Premium - $34.99" },
  { name: "Cinematic - $49.99" },
];

const SelectPlans = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [packageName, setPackageName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();
  const handlePaymentMethodChange = () => {
    // Nếu đã chọn "Paypal", chuyển sang chữ thường, nếu không thì để trống
    setPaymentMethod(paymentMethod === "paypal" ? "paypal" : "paypal");
  };

  const handlePayment = async () => {
    // Tạo đối tượng userData
    const userData = {
      name: name,
      email: email,
      packageName: packageName.name,
      paymentMethod: paymentMethod,
    };
    // Gọi hàm executePayment để thực hiện thanh toán
    const result = await executePayment(userData);

    onClose();
    if (result.code === 0) {
      // Xử lý kết quả trả về từ Paypal (thành công)
      window.open(result.result, "_blank"); // Mở link thanh toán trong tab mới
    } else if (result.code === 401) {
      // Xử lý nếu token hết hạn hoặc người dùng chưa đăng nhập
      navigate(path.LOGIN);
      ShowToast("error", "Vui lòng đăng nhập để thanh toán!");
    } else if (result.code === 403) {
      // Xử lý nếu có lỗi từ phía Paypal
      ShowToast("error", "Lỗi bên phía Paypal");
      return;
    }
  };
  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 text-white text-[14px]">
      <div className="bg-[#2E2D35] md:h-[680px] md:w-[420px] w-full px-[30px] py-[35px] rounded-lg shadow-lg relative">
        <div className="text-[24px] flex justify-between">
          <p>Chọn kế hoạch</p>
          <button
            className="text-[24px] hover:text-[#f9ab00]"
            onClick={onClose}
          >
            <Icons.Navbar.close />
          </button>
        </div>
        <div className="mt-[20px]">
          <div className="w-full text-left">Tên</div>
          <input
            id="username"
            name="username"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Họ tên đầy đủ"
            className="block  w-full h-[45px] bg-[#222129] md:mt-[10px] mt-[20px] text-white rounded-[8px] py-1 pl-[20px] focus:ring-1 focus:ring-custom-yellow focus:outline-none"
          />
        </div>
        <div className="mt-[20px]">
          <div className="w-full text-left">Email</div>
          <input
            id="email"
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ví dụ@tên miền.com"
            className="block  w-full h-[45px] bg-[#222129] md:mt-[10px] mt-[20px] text-white rounded-[8px] py-1 pl-[20px] focus:ring-1 focus:ring-custom-yellow focus:outline-none"
          />
        </div>
        <div className="w-full mt-[20px]">
          <div className="w-full text-left">Chọn gói:</div>
          <Filter
            options={lstPayment} // Truyền danh sách rating vào dropdown
            onSortChange={setPackageName} // Hàm xử lý khi chọn rating
            dropdownWidth="100%"
            test="Chọn gói đăng kí"
          />
        </div>
        <p className="mt-[20px] text-left">
          Bạn có thể chi tiền từ tài khoản của mình để gia hạn các gói dịch vụ
          được kết nối hoặc để đặt xe trên trang web của chúng tôi.
        </p>

        <div className="mt-[20px]">
          <p className="w-full text-left">Phương thức thanh toán:</p>
          <div className="flex items-center gap-2 mt-[10px]">
            <input
              type="checkbox"
              id="type3"
              className="hidden peer"
              checked={paymentMethod.toLowerCase() === "paypal"} // Đảm bảo checkbox được chọn khi giá trị là "paypal"
              onChange={handlePaymentMethodChange}
            />
            <label
              htmlFor="type3"
              className="flex items-center justify-center w-[18px] h-[18px] border-[4px] border-gray-400 rounded-[100%] cursor-pointer peer-checked:border-[#f9ab00] transition select-none"
            ></label>
            <label htmlFor="type3" className="cursor-pointer select-none">
              Paypal
            </label>
          </div>
        </div>
        <button
          className="w-[120px] h-[45px] rounded-[8px] border-[2px] border-[#f9ab00] text-[16px] mt-[20px] hover:bg-[#f9ab00]"
          onClick={handlePayment}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
};

export default SelectPlans;
