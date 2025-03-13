import axios from "axios";

const API_URL = "http://localhost:8081/api";

export const sendUpdateAlluser = async (contentEmail) => {
  try {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    const response = await axios.post(
      `${API_URL}/admin/sendAllEmail`, // URL để thêm phim
      contentEmail, // Dữ liệu phim cần thêm
      {
        headers: {
          "Content-Type": "application/json", // Đảm bảo gửi dữ liệu ở định dạng JSON
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("Gửi thông báo thành công!");
      return response.data; // Trả về dữ liệu thêm thành công
    }
  } catch (error) {
    if (error.response) {
      console.error("Lỗi từ server: ", error.response.data);
      return error.response.data; // Trả về lỗi nếu có
    }
  }
};
