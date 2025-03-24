import axios from "axios";
const API_URL = "http://localhost:8081/api";

export const updateUserProfile = async (userData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(
      `${API_URL}/user`, // Endpoint API cập nhật người dùng
      userData, // Dữ liệu cập nhật
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("Cập nhật người dùng thành công:", response.data);
      return response.data;
    }
  } catch (error) {
    console.error(
      "Lỗi cập nhật người dùng:",
      error.response?.data || error.message
    );
    throw error;
  }
};
