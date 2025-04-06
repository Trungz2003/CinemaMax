import axios from "axios";
import path from "../ultils/Path";
import { ShowToast } from "../ultils/ToastUtils";

const API_URL = "http://localhost:8081"; // Base URL của API

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor để tự động thêm token vào tất cả request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 💥 Interceptor xử lý lỗi 401 từ server
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    console.log("Vao");

    if (status === 401) {
      localStorage.removeItem("token"); // Xoá token cũ
      // Hiển thị thông báo trước khi chuyển hướng
      // Chuyển hướng đến trang đăng nhập trước
      window.location.href = path.LOGIN;

      // Sau khi chuyển hướng, hiển thị thông báo
      setTimeout(() => {
        ShowToast(
          "error",
          "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!"
        );
      }, 100);
    }

    return Promise.reject(error);
  }
);

export default api;
