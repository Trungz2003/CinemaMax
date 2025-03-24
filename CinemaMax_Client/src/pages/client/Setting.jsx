import React from "react";
import Icons from "../../ultils/Icons";
import { useState } from "react";
import { updateUserProfile } from "../../apis/client/Setting";
import { uploadFile } from "../../cloudinary/upload";
import { useEffect } from "react";
import { ShowToast } from "../../ultils/ToastUtils";
import { forgotPassword } from "../../apis/client/Auth";
const Setting = ({ myInfo, setMyInfo }) => {
  const [showPasswordOld, setShowPasswordOld] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);

  //Lưu giá trị mật khẩu
  const [passwordOld, setPasswordOld] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [confirmPassword, setConfirmPasswordText] = useState("");

  const [isUploading, setIsUploading] = useState(false); // Trạng thái tải lên

  const [id, setId] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [urlImg, setUrlImg] = useState(null);

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

  const handleUpdateUser = async () => {
    try {
      const updatedUser = {
        userName,
        email,
        fullName,
        thumbnail: urlImg,
      };

      const response = await updateUserProfile(updatedUser);
      if (response.code === 0) {
        ShowToast("success", "Cập nhật thành công!");
        // Gọi callback từ component cha để cập nhật dữ liệu
        console.log("Cập nhật thành công, user mới:", updatedUser); // Log kiểm tra
        setMyInfo(updatedUser);
      } else {
        ShowToast("Cập nhật thất bại!", "error");
      }
    } catch (error) {
      console.error("Lỗi cập nhật thông tin:", error);
    }
  };

  const handleForgotPassword = async () => {
    try {
      // Kiểm tra nếu bất kỳ giá trị nào trống
      if (!passwordOld || !passwordNew || !confirmPassword) {
        ShowToast("error", "Vui lòng nhập đầy đủ thông tin!");
        return;
      }
      if (passwordNew === confirmPassword) {
        const updatedPassword = {
          passwordOld,
          passwordNew,
        };

        const response = await forgotPassword(id, updatedPassword);
        if (response.code === 0) {
          ShowToast("success", "Cập nhật thành công!");
        } else {
          ShowToast("error", response.message);
        }
      } else {
        ShowToast("error", "Mật khẩu mới không trùng khớp!");
      }
    } catch (error) {
      console.error("Lỗi cập nhật thông tin:", error);
    }
  };

  useEffect(() => {
    console.log("User state:", myInfo);
    if (myInfo) {
      setId(myInfo.id);
      setUserName(myInfo.userName || "");
      setEmail(myInfo.email || "");
      setFullName(myInfo.fullName || "");
      setUrlImg(myInfo.thumbnail || ""); // Nếu có ảnh đại diện
    }
  }, [myInfo]);

  return (
    <div className="w-full h-full md:px-[8%] px-[4%] md:flex md:gap-[27px]">
      {isUploading && (
        <div className="flex justify-center items-center mt-4">
          <div className="animate-spin rounded-full border-t-4 border-blue-500 w-8 h-8"></div>
        </div>
      )}
      <div className="md:w-[65%] w-full px-[30px] py-[35px] rounded-[8px] border-[1px] border-[#222129]">
        <div className="text-[20px] w-full text-left">Chi tiết hồ sơ</div>
        <div className="w-full md:flex gap-[11px]">
          <div className="md:w-[49%] w-full mt-[20px]">
            <div className="w-full text-left">Tên tài khoản</div>
            <input
              id="username"
              name="userName"
              type="text"
              placeholder="Manhz2003"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
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
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
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
              value={fullName || "null"}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              className="block w-full h-[45px] bg-[#222129] mt-[10px] text-white rounded-[8px] py-1 pl-[20px] focus:ring-1 focus:ring-custom-yellow focus:outline-none"
            />
          </div>

          <div className="md:w-[49%] mt-[20px]">
            <div className="w-full text-left">Hình đại diện</div>
            <div className=" mt-[10px] w-full flex items-end">
              <div
                className="w-full"
                onClick={() => {
                  document.getElementById("fileInput").click(); // Nếu đã có title, mở hộp thoại chọn file
                }}
              >
                <div className="w-full h-[45px] cursor-pointer hover:border-[#f9ab00] border-[2px] border-[#222129] rounded-[8px] bg-[#222129] flex justify-between items-center px-[20px]">
                  <span className="truncate w-[80%] overflow-hidden text-ellipsis whitespace-nowrap">
                    {urlImg || myInfo.thumbnail || "Tải lên (40x40)"}
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
        </div>

        <div className="w-full flex justify-center">
          <div
            className="mt-[40px] border-[2px] border-[#f9ab00] hover:bg-[#f2d19480] text-white p-2 rounded-lg w-[140px] h-[45px] cursor-pointer select-none"
            onClick={handleUpdateUser}
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

        <div className="w-full mt-[20px]">
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
        <div className="w-full mt-[20px]">
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

export default Setting;
