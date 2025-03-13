import axios from "axios";

const API_URL = "http://localhost:8081/api";

export const getAllUser = async (token) => {
  try {
    const response = await axios.get(
      `${API_URL}/users`, // Không cần thêm token vào URL
      {
        headers: {
          "Content-Type": "application/json", // Chỉ cần chỉ định loại nội dung là JSON
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("Thành công: ", response.data.result);
      return response.data.result; // Trả về dữ liệu thành công
    }
  } catch (error) {
    if (error.response) {
      console.error("Lỗi từ server: ", error.response.data);
      return error.response.data; // Trả về thông tin lỗi từ server
    }
  }
};

export const deleteUser = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/admin/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      console.error("Lỗi từ server: ", error.response.data);
      return error.response.data;
    }
  }
};

export const updateUserStatus = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_URL}/admin/status/${userId}`, // Có thể cần cập nhật endpoint API
      {}, // Body request (bỏ trống nếu API không yêu cầu)
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("Cập nhật trạng thái thành công: ", response.data);
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      console.error("Lỗi từ server: ", error.response.data);
      return error.response.data;
    }
  }
};

export const updateUserProfile = async (userId, userData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(
      `${API_URL}/admin/${userId}`, // Endpoint API cập nhật người dùng
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

export const addUser = async (userData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${API_URL}/admin/add`, // Endpoint API cập nhật người dùng
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
