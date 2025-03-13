import React from "react";

import { useState } from "react";
import Filter from "../../components/admin/Filter";
import { getSubscriptions, getRole } from "../../apis/server/EditUser";
import { useEffect } from "react";
import { addUser } from "../../apis/server/User";
import { ShowToast } from "../../ultils/ToastUtils";

const AddUser = ({ isOpen, toggleModal, status }) => {
  const [dataSubscription, setDataSubscription] = useState([]);
  const [dataRole, setDataRole] = useState([]);
  const [subscription, setSubscription] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGetSubscriptions = async () => {
    try {
      const response = await getSubscriptions();
      console.log(response);
      if (response.code === 0) {
        const subName = response.result.map((sub) => sub.name); // ✅ Chỉ lấy mảng tên
        setDataSubscription(subName); // ✅ Truyền đúng định dạng ["ADMIN", "USER"]
      } else {
        setDataSubscription([]); // Nếu không phải mảng, set giá trị mặc định là []
        console.error("Dữ liệu trả về không phải mảng:", response);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách quyền:", error);
    }
  };

  const handleSubscription = (value) => {
    setSubscription(value);
  };
  const handleRole = (value) => {
    return setRole(value);
  };

  const handleGetRole = async () => {
    try {
      const response = await getRole();
      console.log(response);

      if (response.code === 0) {
        const roleNames = response.result.map((role) => role.name); // ✅ Chỉ lấy mảng tên
        setDataRole(roleNames); // ✅ Truyền đúng định dạng ["ADMIN", "USER"]
      } else {
        setDataRole([]); // Nếu không phải mảng, set giá trị mặc định là []
        console.error("Dữ liệu trả về không phải mảng:", response);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách quyền:", error);
    }
  };

  const handleAddUser = async () => {
    try {
      const dataUser = {
        email,
        password,
        subscription: subscription?.name || subscription, // Đảm bảo là String
        role: role?.name || role, // Đảm bảo là String
      };
      const response = await addUser(dataUser);

      if (response.code === 0) {
        status(true);
        toggleModal();
        ShowToast("succes", "Tạo tài khoản thành công!");
      } else {
        status(false);
        toggleModal();
        ShowToast("error", "Tạo tài khoản thất bại!");
      }
    } catch (error) {
      ShowToast("error", "Tạo tài khoản thất bại!");
      console.error("Lỗi khi tạo tài khoản:", error);
    }
  };

  const formatOptions = (data) => data.map((name) => ({ name }));

  useEffect(() => {
    handleGetRole();
    handleGetSubscriptions();
  }, []);
  return (
    <div
      id="userModal"
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-[#1a191f] p-6 rounded-lg w-[400px] shadow-lg relative md:mt-0 mt-[115px]">
        <h4 className="text-[30px] mb-4">Thêm người dùng</h4>
        <form className="space-y-4">
          <div>
            <input
              id="email"
              type="text"
              className="w-full h-[45px] p-2 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-[#222129] mb-2"
              placeholder="Nhập Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <input
              id="password"
              type="password"
              className="w-full h-[45px] p-2 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-[#222129] mb-2"
              placeholder="Nhập Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <Filter
              options={formatOptions(dataSubscription)}
              onSortChange={handleSubscription}
              dropdownWidth="342px"
              test="Chọn gói đăng kí"
              view={subscription}
            />
          </div>

          <div className="m-0 pt-[0.5px]"></div>

          <div>
            <Filter
              options={formatOptions(dataRole)}
              onSortChange={handleRole}
              dropdownWidth="342px"
              test="Quyền sử dụng"
              view={role}
            />
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mt-[15px]"
              onClick={handleAddUser}
            >
              Thêm
            </button>
          </div>
        </form>

        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 mr-2 mt-1"
          onClick={toggleModal}
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default AddUser;
