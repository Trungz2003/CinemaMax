import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getUserRole, getToken } from "./GetRole"; // Hàm lấy token từ localStorage
import path from "./Path";

// Hàm kiểm tra token có hết hạn không
const isTokenExpired = () => {
  const token = getToken();
  if (!token) return true; // Không có token => xem như hết hạn

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Giải mã token (JWT)
    const now = Math.floor(Date.now() / 1000); // Thời gian hiện tại
    return now >= payload.exp; // Hết hạn => true
  } catch (error) {
    return true; // Token không hợp lệ
  }
};

const PrivateRoute = () => {
  const userRole = getUserRole();
  const location = useLocation();

  // Các trang PUBLIC (ai cũng truy cập được, kể cả chưa đăng nhập)
  const publicPaths = [
    path.LOGIN,
    path.SIGNUP,
    path.FORGOT,
    path.PRIVACY,
    path.HOME,
    path.NOT_FOUND,
    path.ABOUT,
    path.PRICING,
    path.FAQ,
    path.CATALOG,
    path.CONTACTS,
    path.DETAILS,
  ];

  // Kiểm tra đường dẫn có phải trang admin không
  const isAdminPath = location.pathname.startsWith("/admin");

  // Danh sách các trang client mà USER được truy cập
  const clientPaths = [path.MYCINEMAMAX];
  const isClientPath = clientPaths.includes(location.pathname);

  // Nếu token hết hạn và đang truy cập các route quan trọng (admin hoặc client), xóa token và điều hướng đến login
  if ((isAdminPath || isClientPath) && isTokenExpired()) {
    localStorage.removeItem("token");
    localStorage.removeItem("adminInfo");

    return <Navigate to={path.LOGIN} replace />;
  }

  // Nếu user là ADMIN, cho phép truy cập tất cả
  if (userRole === "ROLE_ADMIN") {
    return <Outlet />;
  }

  // Nếu user là USER, chỉ cho phép truy cập các trang client
  if (userRole === "ROLE_USER") {
    return isAdminPath ? <Navigate to={path.NOT_FOUND} replace /> : <Outlet />;
  }

  // Nếu chưa đăng nhập, chỉ cho phép vào trang public
  if (!userRole) {
    return publicPaths.some((path) => location.pathname.startsWith(path)) ? (
      <Outlet />
    ) : (
      <Navigate to={path.LOGIN} replace />
    );
  }

  return <Navigate to={path.LOGIN} replace />;
};

export default PrivateRoute;
