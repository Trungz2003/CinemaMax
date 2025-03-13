import { jwtDecode } from "jwt-decode";
import { ShowToast } from "./ToastUtils";

export const getToken = () => {
  return localStorage.getItem("token"); // Lấy token từ localStorage
};

export const getUserRole = () => {
  const token = getToken(); // Lấy token
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    console.log(decoded.scope);

    return decoded.scope || null; // Giả sử token có dạng { scope: "ROLE_ADMIN" }
  } catch (error) {
    ShowToast("error", "Không đủ quyền hạn truy cập!");
    console.log(error);
    return null;
  }
};
