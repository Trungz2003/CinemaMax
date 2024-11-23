import React from "react";
import { useState } from "react";
//import { ApiLogin } from "../apis/User";
import { ShowToast } from "../ultils/ToastUtils";
import { Link, useNavigate } from "react-router-dom";
import path from "../ultils/Path";
import Icons from "../ultils/Icons";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Email validation
  const validateEmail = (value) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!value) {
      setEmailError("Hãy nhập thông tin trường!");
      return false;
    } else if (!regex.test(value)) {
      setEmailError("Định dạng email không chính xác!");
      return false;
    }
    setEmailError("");
    return true;
  };

  // Password validation
  const validatePassword = (value) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    if (!value) {
      setPasswordError("Hãy nhập thông tin trường!");
      return false;
    } else if (!regex.test(value)) {
      setPasswordError(
        "Mật khẩu cần độ dài là 8 kí tự, ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt."
      );
      return false;
    }
    setPasswordError("");
    return true;
  };

  // Handle blur event for email and password
  const handleBlur = (field) => {
    if (field === "email") validateEmail(email);
    else if (field === "password") validatePassword(password);
  };

  // Clear error message on focus
  const handleFocus = (field) => {
    if (field === "email") {
      setEmailError("");
    } else if (field === "password") {
      setPasswordError("");
    }
  };

  // Form submission
  //   async function handleSubmit(e) {
  //     e.preventDefault();
  //     const isEmailValid = validateEmail(email);
  //     const isPasswordValid = validatePassword(password);

  //     if (isEmailValid && isPasswordValid) {
  //       const data = {
  //         email: email,
  //         password: password,
  //       };

  //       ApiLogin(data)
  //         .then((response) => {
  //           if (response.status === 200) {
  //             ShowToast("success", "Đăng nhập thành công!");
  //             navigate(path.HOME);
  //           }
  //         })
  //         .catch((error) => {
  //           if (!error.response) {
  //             ShowToast(
  //               "error",
  //               "Không thể kết nối đến server. Vui lòng kiểm tra lại!"
  //             );
  //           } else if (error.response && error.response.status === 404) {
  //             ShowToast("error", "Tài khoản hoặc mật khẩu không chính xác!");
  //           } else {
  //             console.log(error);

  //             ShowToast("error", "Đã xảy ra lỗi không xác định!");
  //           }
  //         });
  //     }
  //   }

  return (
    <div className="flex justify-center items-center md:h-[100%]  h-full w-full text-[14px]">
      <div className=" absolute h-full w-full">
        <img
          src="src/assets/bg/section__bg.jpg"
          alt=""
          className="h-full w-full"
        />
      </div>
      <form
        //onSubmit={handleSubmit}
        className="w-full h-full flex justify-center items-center"
      >
        <div className="absolute md:w-[400px] w-[85%] max-w-[400px] h-[330px] md:h-[50%] rounded-[10px] md:py-[30px] py-[20px] md:px-[70px] px-[20px] bg-[#1a191f] shadow-[0_0_0_0.5px_rgba(255,255,255,0.3)]">
          <h1 className="font-bold md:text-[2rem] text-[26px] text-center w-full m-0 p-0">
            <span className="text-[#faab00]">Cinema</span>
            <span className="text-white">Max</span>
          </h1>
          <div className="mt-4 w-full">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur("email")}
              onFocus={() => handleFocus("email")}
              className="block w-full h-[45px] bg-[#222129] text-white rounded-md py-1.5 pl-3 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            />
            <div className="w-full flex flex-col items-start">
              <span className="text-red-500 text-left text-sm">
                {emailError}
              </span>
            </div>
            <div className="flex items-center space-x-2 mt-[20px]">
              <input
                type="checkbox"
                //checked={rememberMe}
                //onChange={() => setRememberMe(!rememberMe)}
                className="h-5 w-5 bg-[#261e2a] appearance-none border-2 border-gray-500 rounded-md checked:before:content-['✔'] checked:before:text-[12px] checked:before:text-[#F9AB00] checked:before:flex checked:before:justify-center checked:before:items-center cursor-pointer"
              />
              <div className="flex items-center">
                <p className="text-white">Tôi đồng ý với</p>
                <Link
                  to={path.Privacy}
                  className="text-sm text-[#F9AB00] ml-1 pt-[1px]"
                >
                  Chính sách bảo mật
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-[35px]">
            <button
              href="#"
              type="submit"
              className="border-[2px] border-[#d6ac5a] text-[#d6ac5a] w-full h-[45px] hover:bg-[#d6ac5a] hover:text-white px-4 py-2 rounded-md"
            >
              XÁC NHẬN
            </button>
          </div>

          <div className="w-full flex justify-center mt-[15px]">
            <p className="text-white">
              Chúng tôi sẽ gửi mật khẩu vào Email của bạn
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Forgot;
