import React from "react";
import Icons from "../../ultils/Icons";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShowToast } from "../../ultils/ToastUtils";
import { getRole, getSubscriptions } from "../../apis/server/EditUser";
import { uploadFile } from "../../cloudinary/upload";
import { updateUserProfile } from "../../apis/server/User";
import { forgotPassword } from "../../apis/client/Auth";

const Filter = ({ options, onSortChange, view }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(view);

  useEffect(() => {
    setSelectedOption(view);
  }, [view]); // Khi `view` thay đổi, cập nhật `selectedOption`

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSortChange) onSortChange(option); // Gọi callback nếu có
  };

  return (
    <div className="relative w-full mt-[11px]">
      <div
        className="h-[45px] rounded-[8px] bg-[#222129] flex items-center px-4 cursor-pointer gap-[5px]"
        role="combobox"
        tabIndex="0"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
      >
        <div className="flex-1 text-white text-left">{selectedOption}</div>
        <div className="flex items-center">
          <svg
            className={`w-2 h-2 text-white transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            viewBox="0 0 100 100"
          >
            <path
              d="M10,30 L50,70 L90,30"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
            ></path>
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="absolute bg-[#222129] w-[200px] mt-2 rounded-[8px] shadow-lg z-10 text-left">
          {options.map((option, index) => (
            <div
              key={index}
              className={`px-4 py-2 cursor-pointer text-white hover:text-[#f9ab00] ${
                selectedOption === option ? "text-custom" : ""
              }`}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ProfileUser = ({ user, setData }) => {
  // lấy giá trị mật khẩu
  const [passwordOld, setPasswordOld] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [confirmPassword, setConfirmPasswordText] = useState("");

  // Sử lý hiển thị mật khẩu
  const [showPasswordOld, setShowPasswordOld] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [urlImg, setUrlImg] = useState(null);
  const [subscription, setSubscription] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const [status, setStatus] = useState("");

  const [isUploading, setIsUploading] = useState(false); // Trạng thái tải lên
  const [dataRole, setDataRole] = useState([]);
  const [dataSubscription, setDataSubscription] = useState([]);

  const handleUserName = (event) => {
    return setUserName(event.target.value);
  };
  const handleEmail = (event) => {
    return setEmail(event.target.value);
  };
  const handleFullName = (event) => {
    return setFullName(event.target.value);
  };
  const handleSubscription = (value) => {
    setSubscription(value);
  };
  const handleRole = (value) => {
    return setRole(value);
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    setIsUploading(true); // Bắt đầu quá trình tải lên

    try {
      const data = await uploadFile(file, "image", `StreamPhim/image/user`); // Upload ảnh vào folder động
      setIsUploading(false); // Bắt đầu quá trình tải lên
      setUrlImg(data.secure_url);
      console.log("Ảnh đã upload:", data.secure_url);
    } catch (error) {
      console.error("Lỗi upload ảnh:", error);
    }
  };

  const handleGetRole = async () => {
    try {
      const response = await getRole();
      if (response.code === 0) {
        const roleNames = response.result.map((role) => role.name); // ✅ Chỉ lấy mảng tên
        setDataRole(roleNames); // ✅ Truyền đúng định dạng ["ADMIN", "USER"]
      } else {
        setDataRole([]); // Nếu không phải mảng, set giá trị mặc định là []
        console.error("Dữ liệu trả về không phải mảng:", response);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách quyền:", error);
      setDataRole([]); // Nếu lỗi, tránh lỗi `.map()`
    }
  };

  const handleGetSubscriptions = async () => {
    try {
      const response = await getSubscriptions();
      if (response.code === 0) {
        const subName = response.result.map((sub) => sub.name); // ✅ Chỉ lấy mảng tên
        setDataSubscription(subName); // ✅ Truyền đúng định dạng ["ADMIN", "USER"]
      } else {
        setDataSubscription([]); // Nếu không phải mảng, set giá trị mặc định là []
        console.error("Dữ liệu trả về không phải mảng:", response);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách quyền:", error);
      setDataRole([]); // Nếu lỗi, tránh lỗi `.map()`
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedUser = {
        id,
        userName,
        email,
        fullName,
        subscription,
        role,
        thumbnail: urlImg,
        status,
      };

      const response = await updateUserProfile(id, updatedUser);
      if (response.code === 0) {
        ShowToast("success", "Cập nhật thành công!");
        // Gọi callback từ component cha để cập nhật dữ liệu
        setData(updatedUser);
      } else {
        ShowToast("Cập nhật thất bại!", "error");
      }
    } catch (error) {
      console.error("Lỗi cập nhật thông tin:", error);
      ShowToast("Đã xảy ra lỗi khi cập nhật.", "error");
    }
  };

  const handleForgotPassword = async () => {
    try {
      if (passwordNew === confirmPassword) {
        const updatedPassword = {
          passwordOld,
          passwordNew,
        };

        console.log(updatedPassword);

        const response = await forgotPassword(id, updatedPassword);
        if (response.code === 0) {
          ShowToast("success", "Cập nhật thành công!");
        } else {
          ShowToast("error", response.message);
        }
      }
    } catch (error) {
      console.error("Lỗi cập nhật thông tin:", error);
    }
  };

  useEffect(() => {
    handleGetRole();
    handleGetSubscriptions();
  }, []);

  useEffect(() => {
    console.log("User state:", user);
    if (user) {
      setId(user.id || "");
      setUserName(user.userName || "");
      setEmail(user.email || "");
      setFullName(user.fullName || "");
      setSubscription(user.subscriptionName || "");
      setRole(user.role || "");
      setUrlImg(user.thumbnail || ""); // Nếu có ảnh đại diện
      setStatus(user.status || "");
    }
  }, [user]);

  return (
    <div className="w-full h-full md:flex gap-[24px]">
      <div className="md:w-[65%] rounded-[8px] border border-[#222129]  md:h-[500px] px-[35px] py-[35px]">
        {isUploading && (
          <div className="flex justify-center items-center mt-4">
            <div className="animate-spin rounded-full border-t-4 border-blue-500 w-8 h-8"></div>
          </div>
        )}
        <div className="text-[20px] w-full text-left">Chi tiết hồ sơ</div>
        <div className="w-full md:flex gap-[11px]">
          <div className="md:w-[49%] w-full mt-[20px]">
            <div className="w-full text-left">Tên tài khoản</div>
            <input
              id="username"
              name="username"
              type="username"
              placeholder="Manhz2003"
              value={userName}
              onChange={handleUserName}
              className="block w-full h-[45px] bg-[#222129] mt-[10px] text-white rounded-[8px] py-1 pl-[20px] focus:ring-1 focus:ring-custom-yellow focus:outline-none"
            />
          </div>

          <div className="md:w-[49%] w-full mt-[20px]">
            <div className="w-full text-left">E-mail</div>
            <input
              id="mail"
              name="mail"
              type="mail"
              placeholder="email@gmail.com"
              value={user.email}
              onChange={handleEmail}
              className="block w-full h-[45px] bg-[#222129] mt-[10px] text-white rounded-[8px] py-1 pl-[20px] focus:ring-1 focus:ring-custom-yellow focus:outline-none"
            />
          </div>
        </div>
        <div className="w-full md:flex md:gap-[11px] mt-[10px]">
          <div className="md:w-[49%] w-full mt-[20px]">
            <div className="w-full text-left">Tên người dùng</div>
            <input
              id="name"
              name="name"
              type="name"
              placeholder="Manh"
              value={fullName}
              onChange={handleFullName}
              className="block w-full h-[45px] bg-[#222129] mt-[10px] text-white rounded-[8px] py-1 pl-[20px] focus:ring-1 focus:ring-custom-yellow focus:outline-none"
            />
          </div>

          <div className="md:w-[49%] w-full mt-[20px] flex items-end">
            <div
              className="w-full mt-[20px]"
              onClick={() => {
                document.getElementById("fileInput").click(); // Nếu đã có title, mở hộp thoại chọn file
              }}
            >
              <div className="w-full h-[45px] cursor-pointer hover:border-[#f9ab00] border-[2px] border-[#222129] rounded-[8px] bg-[#222129] flex justify-between items-center px-[20px]">
                <span className="truncate w-[80%] overflow-hidden text-ellipsis whitespace-nowrap">
                  {urlImg || user.thumbnail || "Tải lên (40x40)"}
                </span>
                <div className="text-[20px]">
                  <Icons.Setting.img />
                </div>
              </div>

              <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>

        <div className="w-full md:flex md:gap-[11px] mt-[10px]">
          <div className="md:w-[49%] w-full mt-[20px]">
            <div className="w-full text-left">Đăng ký</div>
            <Filter
              options={dataSubscription} // Truyền đúng kiểu mảng
              view={subscription}
              onSortChange={handleSubscription}
            />
          </div>

          <div className="md:w-[49%] mt-[20px]">
            <div className="w-full text-left">Quyền</div>
            <Filter
              options={dataRole} // Truyền đúng kiểu mảng
              view={role}
              onSortChange={handleRole}
            />
          </div>
        </div>

        <div className="w-full flex justify-center">
          <div
            className="mt-[40px] border-[2px] border-[#f9ab00] hover:bg-[#f2d19480] text-white p-2 rounded-lg w-[140px] h-[45px] cursor-pointer select-none"
            onClick={handleUpdate}
          >
            Lưu
          </div>
        </div>
      </div>
      <div className="md:w-[33%] w-full px-[30px] py-[35px] rounded-[8px] border-[1px] border-[#222129] md:mt-0 mt-[20px]">
        <div className="text-[20px] w-full text-left">Thay đổi mật khẩu</div>
        <div className="w-full mt-[20px]">
          <div className="w-full text-left">Mật khẩu cũ</div>
          <div className="w-full h-[45px] relative flex justify-end">
            <input
              id="password"
              name="password"
              type={showPasswordOld ? "text" : "password"}
              value={passwordOld}
              onChange={(e) => setPasswordOld(e.target.value)}
              className="block w-full h-[45px] bg-[#222129] mt-[10px] text-white rounded-[8px] py-1 pl-[20px] focus:ring-1 focus:ring-custom-yellow focus:outline-none"
            />
            <div
              onClick={() => setShowPasswordOld(!showPasswordOld)}
              className="absolute mt-[20px] text-[23px] mr-[15px] cursor-pointer hover:text-[#f9ab00] select-none"
            >
              {showPasswordOld ? (
                <Icons.Setting.hide />
              ) : (
                <Icons.Setting.show />
              )}
            </div>
          </div>
        </div>

        <div className="w-full mt-[40px]">
          <div className="w-full text-left">Mật khẩu mới</div>
          <div className="w-full h-[45px] relative flex justify-end">
            <input
              id="password"
              name="password"
              type={showPasswordNew ? "text" : "password"}
              value={passwordNew}
              onChange={(e) => setPasswordNew(e.target.value)}
              className="block w-full h-[45px] bg-[#222129] mt-[10px] text-white rounded-[8px] py-1 pl-[20px] focus:ring-1 focus:ring-custom-yellow focus:outline-none"
            />
            <div
              onClick={() => setShowPasswordNew(!showPasswordNew)}
              className="absolute mt-[20px] text-[23px] mr-[15px] cursor-pointer hover:text-[#f9ab00] select-none"
            >
              {showPasswordNew ? (
                <Icons.Setting.hide />
              ) : (
                <Icons.Setting.show />
              )}
            </div>
          </div>
        </div>
        <div className="w-full mt-[40px]">
          <div className="w-full text-left">Xác nhận mật khẩu mới</div>
          <div className="w-full h-[45px] relative flex justify-end">
            <input
              id="password"
              name="password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPasswordText(e.target.value)}
              className="block w-full h-[45px] bg-[#222129] mt-[10px] text-white rounded-[8px] py-1 pl-[20px] focus:ring-1 focus:ring-custom-yellow focus:outline-none"
            />
            <div
              onClick={() => setConfirmPassword(!showConfirmPassword)}
              className="absolute mt-[20px] text-[23px] mr-[15px] cursor-pointer hover:text-[#f9ab00] select-none"
            >
              {showConfirmPassword ? (
                <Icons.Setting.hide />
              ) : (
                <Icons.Setting.show />
              )}
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <div
            className="mt-[40px] border-[2px] border-[#f9ab00] hover:bg-[#f2d19480] text-white p-2 rounded-lg w-[140px] h-[45px] cursor-pointer select-none"
            onClick={handleForgotPassword}
          >
            Lưu
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
