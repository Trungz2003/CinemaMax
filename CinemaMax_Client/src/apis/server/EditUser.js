import axios from "axios";

const API_URL = "http://localhost:8081/api";

// 🟢 Lấy thông tin user theo ID
export const getUserDetailsById = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/admin/userDetails/${userId}`, {
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

export const deleteComment = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `${API_URL}/admin/commentById/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi lấy thông tin user:", error.response?.data || error);
    throw error; // Quăng lỗi để xử lý trong component
  }
};

export const deleteReview = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `${API_URL}/admin/reviewById/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi lấy thông tin user:", error.response?.data || error);
    throw error; // Quăng lỗi để xử lý trong component
  }
};

export const getRole = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/admin/role`, {
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

export const getSubscriptions = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/admin/subscription`, {
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
