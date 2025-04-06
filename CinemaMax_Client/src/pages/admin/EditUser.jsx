import React from "react";
import Navbar from "../../components/admin/Navbar";
import ProfileUser from "./ProfileUser";
import CommentUser from "./CommentUser";
import ReviewUser from "./ReviewUser";
import Icons from "../../ultils/Icons";
import { useState } from "react";
import { getUserDetailsById } from "../../apis/server/EditUser";
import { ShowToast } from "../../ultils/ToastUtils";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { updateUserStatus, deleteUser } from "../../apis/server/User";
import StatusModal from "../../components/admin/StatusModal";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../../assets/img_user/img_user_not_avata.png";

const ContentNavbar = ({
  index,
  userInfo,
  setUserInfo,
  userComments,
  setUserComments,
  userReviews,
  setUserReviews,
}) => {
  return (
    <div className="w-full">
      {index === 0 && <ProfileUser user={userInfo} setData={setUserInfo} />}
      {index === 1 && (
        <CommentUser data={userComments} setData={setUserComments} />
      )}
      {index === 2 && (
        <ReviewUser data={userReviews} setData={setUserReviews} />
      )}
    </div>
  );
};

const RenderNavBar = ({ activeIndex, setActiveIndex }) => {
  const menuItems = ["HỒ SƠ", "BÌNH LUẬN", "ĐÁNH GIÁ"];

  return (
    <div className="w-full flex h-full items-center justify-start md:gap-[40px] gap-[39px] md:pt-0 pt-[10px] md:pb-0 pb-[20px]">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className="relative h-full cursor-pointer flex items-center hover:text-[#f9ab00] select-none"
          onClick={() => setActiveIndex(index)} // Đặt trạng thái khi click
        >
          <span
            className={`${
              activeIndex === index ? "text-[#f9ab00]" : "text-white"
            } transition-all duration-300`}
          >
            {item}
          </span>
          {activeIndex === index && (
            <div
              className="absolute md:bottom-[-2px] bottom-[-19px] left-0 w-full h-[2px]"
              style={{ backgroundColor: "#f9ab00" }}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

const RenderEditUser = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0); // Theo dõi mục đang
  const [userInfo, setUserInfo] = useState({
    id: null,
    userName: "",
    fullName: "",
    email: "",
    thumbnail: "",
    status: "",
    role: "",
    subscriptionName: "",
  });

  const [userComments, setUserComments] = useState([]); // Lưu dữ liệu comment
  const [userReviews, setUserReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [actionType, setActionType] = useState("");

  const { id } = useParams(); // Lấy id từ URL
  const handleUserDetailsById = async () => {
    if (!id) {
      ShowToast("error", "Không tìm thấy ID người dùng!");
      return;
    }

    const result = await getUserDetailsById(id); // Giả sử hàm này nhận ID và token

    if (result.code === 0) {
      setUserInfo(result.result.user);
      setUserComments(result.result.comments);
      setUserReviews(result.result.reviews);
    } else {
      ShowToast("error", "Không thể lấy thông tin người dùng!");
    }
  };

  const handleOpenModal = (userId, type) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
    setActionType(type);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
    setActionType("");
  };

  const handleConfirmAction = async (userId) => {
    let result;
    if (actionType === "update") {
      result = await updateUserStatus(userId);

      if (result.code === 0) {
        // ✅ Cập nhật trạng thái mới của userInfo
        setUserInfo((prevUser) => ({
          ...prevUser,
          status: result.result, // Giả sử API trả về trạng thái mới
        }));
      }
    } else if (actionType === "delete") {
      result = await deleteUser(userId);
      if (result.code === 0) {
        navigate("/admin/users");
      }
    }

    if (result?.code === 0) {
      ShowToast(
        "success",
        `${actionType === "delete" ? "Xóa" : "Cập nhật"} thành công!`
      );
    } else if (result.code === 401) {
      ShowToast("error", "Token hết hạn!");
    } else {
      ShowToast(
        "error",
        `${actionType === "delete" ? "Xóa" : "Cập nhật"} thất bại!`
      );
    }

    handleCloseModal();
  };

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        await handleUserDetailsById(); // Lấy thông tin user
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu user:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="md:px-[2%] px-[4%] w-full text-[14px] mb-[40px]">
      <div className="text-left text-[32px] w-full h-full border-b border-[#222129] box-border md:h-[80px] flex justify-start items-center">
        Chỉnh sửa người dùng
      </div>
      <div className="bg-[#1a191f] text-white w-full text-[16px] pt-[80px]">
        <div className="w-full ">
          <div className="w-full md:px-[2%] px-[1%] md:flex md:flex-row flex-col md:h-[80px] h-auto bg-[#222129] rounded-[8px]">
            <div className="md:w-[23%] h-full flex items-center ">
              <div className="flex md:w-full w-[75%] md:pt-0 pt-[20px]">
                {/* Thông tin người dùng (Tên và ID) */}
                <div className="md:w-full w-[600px] h-full flex items-center justify-start mb-4 md:mb-0">
                  <div className="w-[40px] h-[40px] rounded-full bg-[#212026] flex justify-center items-center">
                    <img
                      src={userInfo.thumbnail || defaultAvatar}
                      alt="User Avatar"
                      className="w-[100%] object-cover rounded-full h-full"
                    />
                  </div>

                  <div className="h-full w-[80%] ml-[10px] relative">
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
                      <p className="font-bold text-left flex gap-1 items-center">
                        {userInfo.userName}{" "}
                        <p className="text-[12px] text-[#29B474] mt-[2px]">
                          ({userInfo.status})
                        </p>
                      </p>
                      <p className="text-left">id: {userInfo.id}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:hidden h-full w-[20%] items-center flex gap-[15px] justify-end">
                <button
                  className="w-[32px] h-[32px] rounded-[8px] bg-[rgba(41,180,116,0.1)] hover:bg-[rgba(41,180,116,0.2)] text-[#29B474] flex font-bold justify-center items-center"
                  onClick={() => {
                    handleOpenModal(userInfo.id, "update");
                  }}
                >
                  <Icons.Catalog.lock />
                </button>

                <button
                  className="w-[32px] h-[32px] rounded-[8px] bg-[rgba(235,87,87,0.1)] hover:bg-[rgba(235,87,87,0.2)] text-[#EB5757] flex font-bold justify-center items-center"
                  onClick={() => handleOpenModal(userInfo.id, "delete")}
                >
                  <Icons.Catalog.trash />
                </button>
              </div>
            </div>

            {/* Navbar */}
            <div className="md:w-[57%] w-full h-full mb-4 md:mb-0">
              <RenderNavBar
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            </div>

            <div className="hidden h-full w-[20%] items-center md:flex gap-[15px] justify-end">
              <button
                className="w-[32px] h-[32px] rounded-[8px] bg-[rgba(41,180,116,0.1)] hover:bg-[rgba(41,180,116,0.2)] text-[#29B474] flex font-bold justify-center items-center"
                onClick={() => {
                  handleOpenModal(userInfo.id, "update");
                }}
              >
                <Icons.Catalog.lock />
              </button>
              <button
                className="w-[32px] h-[32px] rounded-[8px] bg-[rgba(235,87,87,0.1)] hover:bg-[rgba(235,87,87,0.2)] text-[#EB5757] flex font-bold justify-center items-center"
                onClick={() => handleOpenModal(userInfo.id, "delete")}
              >
                <Icons.Catalog.trash />
              </button>
            </div>
          </div>

          <StatusModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={() => handleConfirmAction(selectedUserId)}
            userId={selectedUserId}
            actionType={actionType}
            name="tài khoản"
          />

          <div className=" w-full  pt-[35px] pb-[70px]">
            <ContentNavbar
              index={activeIndex}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              userComments={userComments}
              setUserComments={setUserComments}
              userReviews={userReviews}
              setUserReviews={setUserReviews}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const EditUser = () => {
  return (
    <div className="w-full md:h-[100vh] bg-[#1a191f] text-white md:flex">
      <div className="md:w-[18%] w-full md:h-full ">
        <Navbar />
      </div>
      <div className="md:w-[82%] w-full md:h-full  md:pt-0 pt-[70px] overflow-auto">
        <RenderEditUser />
      </div>
    </div>
  );
};

export default EditUser;
