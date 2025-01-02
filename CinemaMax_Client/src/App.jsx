import "./App.css";
import Login from "./pages/client/Login";
import SignUp from "./pages/client/SignUp";
import Forgot from "./pages/client/Forgot";
import NotFound from "./pages/client/404";
import Home from "./pages/client/Home";
import Privacy from "./pages/client/Privacy";
import AboutUs from "./pages/client/AboutUs";
import PricingPlan from "./pages/client/PricingPlan";
import HelpCenter from "./pages/client/HelpCenter";
import MovieDetails from "./pages/client/MovieDetails";
import Catalog from "./pages/client/Catalog";
import Contacts from "./pages/client/Contacts";
import MyCinemaMax from "./pages/client/MyCinemaMax";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import path from "./ultils/Path";
import Dashboard from "./pages/admin/Dashboard";
import Catalogs from "./pages/admin/Catalogs";
import Users from "./pages/admin/Users";
import Comments from "./pages/admin/Comments";
import Reviews from "./pages/admin/Reviews";
import Setting from "./pages/admin/Setting";
import EditUser from "./pages/admin/EditUser";
import AddItem from "./pages/admin/AddItem";

// Cấu hình router với createBrowserRouter
const router = createBrowserRouter([
  //{ path: "/", element: <></>, loader: () => redirect(path.LOGIN) }, // Điều hướng về /login khi người dùng vào trang chủ
  { path: path.LOGIN, element: <Login /> },
  { path: path.SIGNUP, element: <SignUp /> },
  { path: path.FORGOT, element: <Forgot /> },
  { path: path.NOT_FOUND, element: <NotFound /> },
  { path: path.HOME, element: <Home /> },
  { path: path.PRIVACY, element: <Privacy /> },
  { path: path.ABOUT, element: <AboutUs /> },
  { path: path.PRICING, element: <PricingPlan /> },
  { path: path.FAQ, element: <HelpCenter /> },
  { path: path.DETAILS, element: <MovieDetails /> },
  { path: path.CATALOG, element: <Catalog /> },
  { path: path.CONTACTS, element: <Contacts /> },
  { path: path.MYCINEMAMAX, element: <MyCinemaMax /> },

  // Path admin
  { path: path.DASHBOARD, element: <Dashboard /> },
  { path: path.CATALOGS, element: <Catalogs /> },
  { path: path.USERS, element: <Users /> },
  { path: path.COMMENTS, element: <Comments /> },
  { path: path.REVIEWS, element: <Reviews /> },
  { path: path.SETTING, element: <Setting /> },
  { path: path.EDITUSER, element: <EditUser /> },
  { path: path.ADDITEM, element: <AddItem /> },
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
