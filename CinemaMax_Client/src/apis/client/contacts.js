import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:8081/api";

export const userSendMail = async (formData) => {
  let token = localStorage.getItem("token");

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token");
    return { code: 401 };
  }

  try {
    const response = await axios.post(
      `${API_URL}/user/contact`, // Gửi movieId lên server
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      return { code: 401 };
    }
    throw error;
  }
};

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now(); // Kiểm tra thời gian hết hạn
  } catch (error) {
    return true; // Nếu decode lỗi, coi như token không hợp lệ
  }
};
