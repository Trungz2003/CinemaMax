import axios from "axios";

const API_URL = "http://localhost:8081/api";

export const getProfileUser = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${API_URL}/user/userProfile`, {
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
      // Server trả lỗi có status code (ví dụ 403)
      return {
        code: error.response.status,
      };
    } else {
      console.error("Error:", error);
      throw error;
    }
  }
};
