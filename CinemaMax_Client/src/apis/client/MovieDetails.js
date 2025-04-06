import axios from "axios";
import { jwtDecode } from "jwt-decode";
import path from "../../ultils/Path";
import { ShowToast } from "../../ultils/ToastUtils";

const API_URL = "http://localhost:8081/api";

export const checkVideoAccess = async (movieId) => {
  if (!movieId) {
    console.log("Không tìm thấy movieId!");
    return { code: 400 }; // Lỗi nếu không có ID
  }

  let token = localStorage.getItem("token");

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token");
    return { code: 401 };
  }

  try {
    const response = await axios.post(
      `${API_URL}/user/movie/videoAccess/${movieId}`, // Gửi movieId lên server
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);

    if (error.response?.status === 401) {
      return { code: 401 };
    } else if (error.response?.status === 403) {
      ShowToast("error", "Gói đăng kí của bạn đã hết hạn!");
      return { code: 403 };
    } else if (error.response?.status === 400) {
      return { code: 400 };
    }
    throw error;
  }
};

export const incrementView = async (movieId) => {
  if (!movieId) {
    console.log("Không tìm thấy movieId!");
    return { code: 400 }; // Lỗi nếu không có ID
  }

  let token = localStorage.getItem("token");

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token");
    return { code: 401 };
  }

  try {
    const response = await axios.put(
      `${API_URL}/user/movie/${movieId}`, // Gửi movieId lên server
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);

    if (error.response?.status === 401) {
      return { code: 401 };
    } else if (error.response?.status === 403) {
      ShowToast("error", "Gói đăng kí của bạn đã hết hạn!");
      return { code: 403 };
    } else if (error.response?.status === 400) {
      return { code: 400 };
    }
    throw error;
  }
};

export const getRatingMovie = async (id) => {
  let token = localStorage.getItem("token");

  // Kiểm tra nếu token không tồn tại hoặc đã hết hạn
  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token"); // Xóa token nếu hết hạn
    return fetchRatingCommentById(id);
  }

  try {
    const response = await axios.get(`${API_URL}/user/movie/rating/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("token"); // Xóa token khi hết hạn
      return fetchRatingCommentById(id);
    }

    throw error;
  }
};

export const addRatingByMovie = async (id, content, navigate) => {
  let token = localStorage.getItem("token");

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token"); // Xóa token nếu hết hạn
    navigate(path.LOGIN); // Chuyển hướng bằng prop
    return null;
  }

  try {
    const response = await axios.post(
      `${API_URL}/user/movie/rating/${id}`,
      content,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("token"); // Xóa token khi hết hạn
      navigate("/login"); // Chuyển hướng về login
      return null;
    }
    return error.response?.data;
  }
};

export const addCommentByMovie = async (id, content, navigate) => {
  let token = localStorage.getItem("token");

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token"); // Xóa token nếu hết hạn
    navigate(path.LOGIN); // Chuyển hướng bằng prop
    return null;
  }

  try {
    const response = await axios.post(
      `${API_URL}/user/movie/comment/${id}`,
      { content },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("token"); // Xóa token khi hết hạn
      navigate("/login"); // Chuyển hướng về login
      return null;
    }
    throw error;
  }
};

export const updateReaction = async (id, reactionType, navigate) => {
  let token = localStorage.getItem("token");

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token"); // Xóa token nếu hết hạn
    navigate(path.LOGIN); // Chuyển hướng bằng prop
    return null;
  }

  try {
    const response = await axios.post(
      `${API_URL}/comment/${id}/react?reactionType=${reactionType}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("token"); // Xóa token khi hết hạn
      navigate("/login"); // Chuyển hướng về login
      return null;
    }
    throw error;
  }
};

export const getCommentMovie = async (id) => {
  let token = localStorage.getItem("token");

  // Kiểm tra nếu token không tồn tại hoặc đã hết hạn
  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token"); // Xóa token nếu hết hạn
    return fetchMovieCommentById(id);
  }

  try {
    const response = await axios.get(`${API_URL}/user/movie/comment/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("token"); // Xóa token khi hết hạn
      return fetchMovieCommentById(id);
    }

    throw error;
  }
};

export const getMovieSuggest = async () => {
  let token = localStorage.getItem("token");

  // Kiểm tra nếu token không tồn tại hoặc đã hết hạn
  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token"); // Xóa token nếu hết hạn
    return fetchMovieSuggestWithoutToken();
  }

  try {
    const response = await axios.get(`${API_URL}/user/movie/suggest`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("token"); // Xóa token khi hết hạn
      return fetchMovieSuggestWithoutToken();
    }

    throw error;
  }
};

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now(); // Kiểm tra thời gian hết hạn
  } catch (error) {
    return true; // Nếu decode lỗi, coi như token không hợp lệ
  }
};

// ✅ **Hàm gọi API không cần token**
const fetchMovieSuggestWithoutToken = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/movie/suggest`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw error;
  }
};

// lấy comment của 1 phim
const fetchMovieCommentById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/user/movie/comment/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw error;
  }
};

const fetchRatingCommentById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/user/movie/rating/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw error;
  }
};
