import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Forgot from "./pages/Forgot";
import NotFound from "./pages/404";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import path from "./ultils/Path";

// Cấu hình router với createBrowserRouter
const router = createBrowserRouter([
  //{ path: "/", element: <></>, loader: () => redirect(path.LOGIN) }, // Điều hướng về /login khi người dùng vào trang chủ
  { path: path.LOGIN, element: <Login /> },
  { path: path.SIGNUP, element: <SignUp /> },
  { path: path.FORGOT, element: <Forgot /> },
  { path: path.NOT_FOUND, element: <NotFound /> },
  { path: path.HOME, element: <Home /> },
  { path: path.Privacy, element: <Privacy /> },
  // { path: path.PROJECT_LIST, element: <ProjectList /> },
]);

function App() {
  return (
    <div className=" font-sans text-[14px] h-full w-full ">
      {/* Sử dụng RouterProvider để cung cấp cấu hình router cho ứng dụng */}
      <RouterProvider router={router} />

      {/* ToastContainer để hiển thị các thông báo */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
