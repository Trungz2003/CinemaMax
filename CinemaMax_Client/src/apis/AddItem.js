import axios from "axios";

export const getDataCountry = async () => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    if (response.status === 200) {
      const data = response.data; // Lấy dữ liệu từ response
      const countryNames = data.map((country) => country.name.common); // Lấy danh sách tên quốc gia
      return countryNames; // Trả về danh sách tên quốc gia
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
