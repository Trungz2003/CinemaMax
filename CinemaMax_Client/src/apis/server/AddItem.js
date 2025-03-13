import axios from "axios";

const API_URL = "http://localhost:8081/api";

export const getGenres = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/admin/getGenres`, // Không cần thêm token vào URL
      {
        headers: {
          "Content-Type": "application/json", // Chỉ cần chỉ định loại nội dung là JSON
        },
      }
    );

    if (response.status === 200) {
      //   console.log("Thành công: ", response.data.result);
      return response.data.result; // Trả về dữ liệu thành công
    }
  } catch (error) {
    if (error.response) {
      console.error("Lỗi từ server: ", error.response.data);
      return error.response.data; // Trả về thông tin lỗi từ server
    }
  }
};

export const saveMovie = async (token, movieData) => {
  try {
    const response = await axios.post(
      `${API_URL}/admin/addMovie`, // URL để thêm phim
      movieData, // Dữ liệu phim cần thêm
      {
        headers: {
          "Content-Type": "application/json", // Đảm bảo gửi dữ liệu ở định dạng JSON
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("Thêm phim thành công:", response.data);
      return response.data; // Trả về dữ liệu thêm thành công
    }
  } catch (error) {
    if (error.response) {
      console.error("Lỗi từ server: ", error.response.data);
      return error.response.data; // Trả về lỗi nếu có
    }
  }
};

export const updateMovieById = async (id, movieData) => {
  try {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    const response = await axios.put(
      `${API_URL}/admin/movie/${id}`, // URL để thêm phim
      movieData, // Dữ liệu phim cần thêm
      {
        headers: {
          "Content-Type": "application/json", // Đảm bảo gửi dữ liệu ở định dạng JSON
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("Thêm phim thành công:", response.data);
      return response.data; // Trả về dữ liệu thêm thành công
    }
  } catch (error) {
    if (error.response) {
      console.error("Lỗi từ server: ", error.response.data);
      return error.response.data; // Trả về lỗi nếu có
    }
  }
};

export const getMovieById = async (id) => {
  try {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage

    const response = await axios.get(`${API_URL}/movie/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Thêm token vào headers
      },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      console.error("Lỗi từ server:", error.response.data);
      return error.response.data;
    } else {
      console.error("Lỗi kết nối hoặc lỗi không xác định:", error.message);
      return { error: "Lỗi kết nối hoặc lỗi không xác định" };
    }
  }
};

export const getDataCountry = async () => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    if (response.status === 200) {
      const data = response.data; // Lấy dữ liệu từ response
      // Chỉ lấy danh sách tên quốc gia
      const countries = data.map((country) => ({
        name: country.name.common, // Lấy tên phổ biến của quốc gia
      }));
      return countries; // Trả về danh sách tên quốc gia
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
