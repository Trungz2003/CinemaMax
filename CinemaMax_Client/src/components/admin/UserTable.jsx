import React from "react";
import { useState, useEffect } from "react";
import Icons from "../../ultils/Icons";
import fuzzy from "fuzzy";
import { deleteUser, updateUserStatus } from "../../apis/server/User";
import { ShowToast } from "../../ultils/ToastUtils";
import { useNavigate } from "react-router-dom";
import StatusModal from "../../components/admin/StatusModal";

const UserTable = ({ initialData, columnTitles, sortOption, searchQuery }) => {
  const navigate = useNavigate();
  const itemsPerPage = 10; // Số lượng mục mỗi trang
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(initialData); // Thêm state để quản lý danh sách
  const [actionType, setActionType] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleConfirmAction = async (userId) => {
    let result;
    if (actionType === "update") {
      result = await updateUserStatus(userId);
      console.log("arr: ", result);

      if (result.code === 0) {
        // ✅ Cập nhật trạng thái mới của userInfo
        setData((prevData) =>
          prevData.map((user) =>
            user.id === userId ? { ...user, status: result.result } : user
          )
        );
      }
    } else if (actionType === "delete") {
      result = await deleteUser(userId);
      if (result.code === 0) {
        setData((prevData) => prevData.filter((user) => user.id !== userId));
      } else {
        ShowToast("error", "Không thể xóa người dùng!");
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

  const handleEditUser = (userId) => {
    navigate(`/admin/editUser/${userId}`);
  };

  const searchData = Array.isArray(data)
    ? searchQuery.trim()
      ? data.filter((item) => {
          // Kiểm tra `item` có đầy đủ dữ liệu không
          if (!item) return false;

          // Lọc dữ liệu theo nhiều trường
          const fieldsToSearch = [item.name, item.username, item.email].filter(
            Boolean
          ); // Lọc bỏ undefined/null

          const result = fuzzy.filter(searchQuery, fieldsToSearch);
          return result.length > 0; // Nếu có kết quả tìm kiếm thì giữ lại
        })
      : data
    : []; // Nếu `data` không phải là mảng, trả về []

  const sortedData = [...searchData].sort((a, b) => {
    if (sortOption === "Kế hoạch giá cả") {
      return a.pricingPlan - b.pricingPlan;
    } else if (sortOption === "Trạng thái") {
      return a.status - b.status;
    } else {
      return new Date(b.creationDate) - new Date(a.creationDate);
    }
  });

  // Tính toán số trang
  const totalMovies = sortedData.length;
  const totalPages = Math.ceil(totalMovies / itemsPerPage);

  // Cập nhật lại trang khi có thay đổi về `searchQuery`
  useEffect(() => {
    setCurrentPage(1); // Reset về trang đầu tiên khi thay đổi `searchQuery`
  }, [searchQuery]);

  useEffect(() => {
    setData([...initialData]); // Clone để tạo tham chiếu mới
  }, [initialData]);

  // Tính toán dữ liệu cho trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMovies = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full rounded-[8px] pb-[35px] mt-[30px]">
      {/* Header của bảng */}
      <div
        className="w-full rounded-b-[8px] mt-[10px] px-[30px] overflow-x-auto bg-[#222129]"
        style={{ scrollbarWidth: "thin" }}
      >
        <div className="w-full h-[50px] border-b-[1px] border-[#1a191f] text-[12px] text-[#C0C0C0] flex">
          {Object.entries(columnTitles).map(([key, title], index) => (
            <div
              key={index}
              className={`flex-shrink-0 ${
                index === 0
                  ? "md:w-[5%] w-[50px]"
                  : index === 1
                  ? "md:w-[30%] w-[300px]"
                  : index === 2
                  ? "md:w-[15%] w-[150px]"
                  : index === 3
                  ? "md:w-[15%] w-[150px]"
                  : index === 4
                  ? "md:w-[9%] w-[90px]"
                  : index === 5
                  ? "md:w-[10%] w-[100px]"
                  : index === 6
                  ? "md:w-[10%] w-[100px]"
                  : "md:w-[15%] w-[150px]"
              } h-full flex items-center justify-start`}
            >
              {title}
            </div>
          ))}
        </div>

        {/* Nội dung bảng */}
        <div className="w-full whitespace-nowrap">
          {currentMovies.map((item, index) => (
            <div key={index} className="w-full h-[80px] flex text-white ">
              <div className="flex-shrink-0 md:w-[5%] w-[50px] h-full flex items-center justify-start text-[#C0C0C0]">
                {item.id}
              </div>
              <div className="flex-shrink-0 md:w-[30%] w-[300px] h-full flex items-center justify-start text-[#fff]">
                <div className="text-left">
                  <div className="font-bold">{item.name}</div>
                  <div>{item.email}</div>
                </div>
              </div>
              <div className="flex-shrink-0 md:w-[15%] w-[150px] h-full flex items-center justify-start">
                {item.username}
              </div>
              <div className="flex-shrink-0 md:w-[15%] w-[150px] h-full flex items-center justify-start">
                {item.pricingPlan}
              </div>
              <div className="flex-shrink-0 md:w-[9%] w-[90px] h-full flex items-center justify-start">
                {item.comments}
              </div>
              <div className="flex-shrink-0 md:w-[10%] w-[100px] h-full flex items-center justify-start">
                {item.reviews}
              </div>
              <div
                className={`flex-shrink-0 md:w-[10%] w-[100px] h-full flex items-center justify-start ${
                  item.status === "Tán thành"
                    ? "text-[#29B474]"
                    : item.status === "Bị cấm"
                    ? "text-[#EB5757]"
                    : ""
                }`}
              >
                {item.status}
              </div>

              <div className="flex-shrink-0 md:w-[15%] w-[150px] h-full flex items-center justify-start">
                {item.creationDate}
              </div>

              {/* Hành động */}
              <div className="h-full items-center flex gap-[15px] justify-start">
                <button
                  onClick={() => handleOpenModal(item.id, "update")}
                  className="w-[32px] h-[32px] rounded-[8px] bg-[rgba(41,180,116,0.1)] hover:bg-[rgba(41,180,116,0.2)] text-[#29B474] flex font-bold justify-center items-center"
                >
                  <Icons.Catalog.lock />
                </button>
                <StatusModal
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                  onConfirm={() => handleConfirmAction(selectedUserId)}
                  userId={selectedUserId}
                  actionType={actionType}
                  name="tài khoản"
                />
                <button
                  onClick={() => handleEditUser(item.id)}
                  className="w-[32px] h-[32px] rounded-[8px] bg-[rgba(255,195,18,0.1)] hover:bg-[rgba(255,195,18,0.2)] text-[#FFC312] flex font-bold justify-center items-center"
                >
                  <Icons.Catalog.edit />
                </button>
                <button
                  onClick={() => handleOpenModal(item.id, "delete")}
                  className="w-[32px] h-[32px] rounded-[8px] bg-[rgba(235,87,87,0.1)] hover:bg-[rgba(235,87,87,0.2)] text-[#EB5757] flex font-bold justify-center items-center"
                >
                  <Icons.Catalog.trash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Phân trang */}
      <div className="w-full mt-[30px] flex md:px-[30px] px-[10px]">
        <div className="w-[30%]">
          <div className="h-[40px] w-[120px] bg-[#222a37] rounded-[8px] flex items-center justify-center">
            {`${currentMovies.length} of ${totalMovies}`}
          </div>
        </div>
        <div className="w-[70%] flex justify-end gap-2 md:pr-[30px]">
          {/* Nút Previous */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="paginator__item paginator__item--prev text-white md:w-[40px] w-[30px] md:h-[40px] h-[30px] flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-[8px] hover:text-[#f9ab00]"
          >
            <Icons.Catalog.left />
          </button>

          {/* Nút số trang */}
          {Array.from({ length: totalPages }, (_, index) => {
            if (totalPages > 10) {
              const page = index + 1;
              // Hiển thị trang đầu tiên và nút ...
              if (page === 1 || page === totalPages) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`paginator__item text-white md:w-[40px] w-[30px] md:h-[40px] h-[30px] flex items-center justify-center font-bold bg-gray-800 hover:text-[#f9ab00] rounded-[8px] select-none${
                      currentPage === page
                        ? "border-[2px] border-[#f9ab00]"
                        : ""
                    }`}
                  >
                    {page}
                  </button>
                );
              }

              // Hiển thị ... nếu cần
              if (page === 2 && currentPage > 5) {
                return (
                  <span
                    key="left-ellipsis"
                    className="paginator__ellipsis text-white flex items-center justify-center select-none"
                  >
                    ...
                  </span>
                );
              }

              if (page === totalPages - 1 && currentPage < totalPages - 4) {
                return (
                  <span
                    key="right-ellipsis"
                    className="paginator__ellipsis text-white flex items-center justify-center select-none"
                  >
                    ...
                  </span>
                );
              }

              // Hiển thị các trang gần currentPage
              if (
                page >= currentPage - 2 &&
                page <= currentPage + 2 &&
                page !== 1 &&
                page !== totalPages
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`paginator__item text-white md:w-[40px] w-[30px] md:h-[40px] h-[30px] flex items-center justify-center font-bold bg-gray-800 hover:text-[#f9ab00] rounded-[8px] select-none${
                      currentPage === page
                        ? "border-[2px] border-[#f9ab00]"
                        : ""
                    }`}
                  >
                    {page}
                  </button>
                );
              }

              return null;
            }

            return (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`paginator__item text-white md:w-[40px] w-[30px] md:h-[40px] h-[30px] flex items-center justify-center font-bold bg-gray-800 hover:text-[#f9ab00] rounded-[8px] select-none${
                  currentPage === index + 1
                    ? "border-[2px] border-[#f9ab00]"
                    : ""
                }`}
              >
                {index + 1}
              </button>
            );
          })}

          {/* Nút Next */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="paginator__item paginator__item--next text-white md:w-[40px] w-[30px] md:h-[40px] h-[30px] flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-[8px] hover:text-[#f9ab00] select-none"
          >
            <Icons.Catalog.right />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
