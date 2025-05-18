import axios from "axios";
import { ShowToast } from "../../ultils/ToastUtils";

const API_URL = "http://localhost:8081";

// login

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/login`,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json", // Đảm bảo header được set đúng
        },
      }
    );
    if (response.status === 200) {
      // Lưu token vào localStorage (hoặc sessionStorage/cookies tùy chọn)
      localStorage.setItem("token", response.data.result.token); // Lưu token vào localStorage
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      // Server trả lỗi có status code (ví dụ 403)
      return {
        code: error.response.status,
        message: error.response.data?.message || "Lỗi không xác định",
      };
    } else {
      console.error("Error:", error);
      throw error;
    }
  }
};

export const signupGG = async (token) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/login-gg`,
      {
        token: token,
      },
      {
        headers: {
          "Content-Type": "application/json", // Đảm bảo header được set đúng
        },
      }
    );

    if (response.status === 200) {
      localStorage.setItem("token", response.data.result.token); // Lưu token vào localStorage
      return response.data; // Trả về dữ liệu thành công
    }
  } catch (error) {
    if (error.response.status === 400) {
      ShowToast("error", error.response.data.message);
      return;
    }
    // Kiểm tra nếu error.response có dữ liệu để lấy thông tin lỗi chi tiết
    if (error.response) {
      console.error("Lỗi từ server: ", error.response.data);
      return error.response.data; // Trả về thông tin lỗi từ server
    }
  }
};

// register

export const signup = async (email, password, userName) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/users/add`,
      {
        email: email.trim(),
        password: password.trim(),
        userName: userName.trim(),
      },
      {
        headers: {
          "Content-Type": "application/json", // Đảm bảo header được set đúng
        },
      }
    );

    if (response.status === 200) {
      console.log("Thành công: ", response.data);
      return response.data; // Trả về dữ liệu thành công
    }
  } catch (error) {
    // Kiểm tra nếu error.response có dữ liệu để lấy thông tin lỗi chi tiết
    if (error.response) {
      console.error("Lỗi từ server: ", error.response.data);
      return error.response.data; // Trả về thông tin lỗi từ server
    }
  }
};

// reset password

export const resetPassword = async (email) => {
  try {
    const response = await axios.post(
      `${API_URL}/users/reset-password`,
      {
        email: email,
      },
      {
        headers: {
          "Content-Type": "application/json", // Đảm bảo header được set đúng
        },
      }
    );

    if (response.status === 200) {
      console.log("Thành công: ", response.data);
      return response.data; // Trả về dữ liệu thành công
    }
  } catch (error) {
    // Kiểm tra nếu error.response có dữ liệu để lấy thông tin lỗi chi tiết
    if (error.response) {
      console.error("Lỗi từ server: ", error.response.data);
      return error.response.data; // Trả về thông tin lỗi từ server
    }
  }
};

export const forgotPassword = async (id, passwordData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_URL}/api/update-password/${id}`,
      passwordData,
      {
        headers: {
          "Content-Type": "application/json", // Đảm bảo header được set đúng
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data; // Trả về dữ liệu thành công
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

// logout

export const logout = async (token) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/logout`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Thêm token vào header
        },
      }
    );

    if (response.status === 200) {
      console.log("Thành công: ", response.data);
      return response.data; // Trả về dữ liệu thành công
    }
  } catch (error) {
    if (error.response) {
      console.error("Lỗi từ server: ", error.response.data);
      return error.response.data; // Trả về thông tin lỗi từ server
    }
  }
};
