import axios from "axios";
const API_URL = "http://localhost:8081/api";

export const getMoviesAdmin = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/admin/movie`, {
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

export const deleteMovie = async (movieId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/admin/movie/${movieId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi xóa phim:", error.response?.data || error);
    throw error;
  }
};

export const updateMovieStatus = async (movieId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${API_URL}/admin/movie/status/${movieId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Lỗi cập nhật trạng thái phim:",
      error.response?.data || error
    );
    throw error;
  }
};
