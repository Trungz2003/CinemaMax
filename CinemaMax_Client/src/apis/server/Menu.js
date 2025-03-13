import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:8081/api";

export const getInfoAdmin = async () => {
  try {
    const token = localStorage.getItem("token");

    // Decode the JWT token to get the email
    const decodedToken = jwtDecode(token);

    const email = decodedToken.sub; // Extract email from the "sub" field

    const response = await axios.get(`${API_URL}/admin/info/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // Trả về dữ liệu user
  } catch (error) {
    console.error("Lỗi lấy thông tin user:", error.response?.data || error);
    throw error; // Quăng lỗi để xử lý trong component
  }
};
