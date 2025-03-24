import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:8081/api";

export const getAllMovie = async () => {
  let token = localStorage.getItem("token");

  // Kiểm tra nếu token không tồn tại hoặc đã hết hạn
  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token"); // Xóa token nếu hết hạn
    return fetchMovieSuggestWithoutToken();
  }

  try {
    const response = await axios.get(`${API_URL}/user/movie`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("token"); // Xóa token khi hết hạn
      return fetchMovieSuggestWithoutToken();
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

// ✅ **Hàm gọi API không cần token**
const fetchMovieSuggestWithoutToken = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/movie`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw error;
  }
};
