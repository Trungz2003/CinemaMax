import axios from "axios";
import { jwtDecode } from "jwt-decode";
import path from "../../ultils/Path";
import { ShowToast } from "../../ultils/ToastUtils";

const API_URL = "http://localhost:8081/api";

export const executePayment = async (userData) => {
  let token = localStorage.getItem("token");

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token");
    return { code: 401 }; // Không ép logout ngay
  }

  try {
    const response = await axios.post(`${API_URL}/paypal/pay`, userData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      return { code: 401 }; // Trả về lỗi thay vì redirect ngay
    } else if (error.response?.status === 500) {
      ShowToast("error", "Đang gặp vấn đề bên phía Paypal!");
      return { code: 403 };
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
