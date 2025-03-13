import axios from "axios";

const API_URL = "http://localhost:8081/api";

export const getDashboard = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${API_URL}/admin/getInfoDashboard`, // Không cần thêm token vào URL
      {
        headers: {
          "Content-Type": "application/json", // Chỉ cần chỉ định loại nội dung là JSON
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("Thành công: ", response.data.result);
      return response.data; // Trả về dữ liệu thành công
    }
  } catch (error) {
    if (error.response) {
      console.error("Lỗi từ server: ", error.response.data);
      return error.response.data; // Trả về thông tin lỗi từ server
    }
  }
};
