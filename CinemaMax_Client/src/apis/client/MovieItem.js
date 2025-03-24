import axios from "axios";

const API_URL = "http://localhost:8081/api";
import path from "../../ultils/Path";

export const updateFavorites = async (movieId, navigate) => {
  const token = localStorage.getItem("token");

  try {
    // Gửi request với userId và movieID trong body
    const response = await axios.post(
      `${API_URL}/user/movie/favorites`,
      { movieId }, //movieID trong request body
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Lỗi từ server: ", error.response?.data || error.message);
    // Kiểm tra nếu mã lỗi là 401 (token không hợp lệ)
    if (error.response?.status === 401) {
      localStorage.removeItem("token"); // Xóa token cũ
      navigate(path.LOGIN); // Chuyển hướng về trang đăng nhập
    }
    return null;
  }
};
