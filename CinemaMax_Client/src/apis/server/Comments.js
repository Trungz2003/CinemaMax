import axios from "axios";

const API_URL = "http://localhost:8081";

export const getComment = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/api/admin/comment`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi lấy thông tin user:", error.response?.data || error);
    throw error; // Quăng lỗi để xử lý trong component
  }
};
