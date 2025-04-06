import React from "react";
import { useState, useEffect } from "react";
import fuzzy from "fuzzy";
import { Link } from "react-router-dom";
import Icons from "../../ultils/Icons";
import { deleteMovie, updateMovieStatus } from "../../apis/server/Catalog";
import { ShowToast } from "../../ultils/ToastUtils";
import StatusModal from "./StatusModal";
import { useNavigate } from "react-router-dom";

const MovieTable = ({
  data,
  setData,
  columnTitles,
  sortOption,
  searchQuery,
}) => {
  const itemsPerPage = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, text: "" });

  const [actionType, setActionType] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const navigate = useNavigate();

  const handleConfirmAction = async (userId) => {
    let result;
    if (actionType === "update") {
      result = await updateMovieStatus(userId); // Giả sử hàm này nhận ID và token

      if (result.code === 0) {
        setData((prevData) =>
          prevData.map((movie) =>
            movie.id === userId
              ? {
                  ...movie,
                  status: movie.status === "PUBLIC" ? "PRIVATE" : "PUBLIC",
                }
              : movie
          )
        );
      } else {
        ShowToast("error", "Không thể lấy thông tin người dùng!");
      }
    } else if (actionType === "delete") {
      result = await deleteMovie(userId); // Giả sử hàm này nhận ID và token

      if (result.code === 0) {
        setData(data.filter((c) => c.id !== userId)); // Xóa phần tử có id = id
      } else {
        ShowToast("error", "Không thể xóa bộ phim này!");
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

  const handleEditMovie = (movieId) => {
    navigate(`/admin/additem/${movieId}`);
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

  // Hàm hiển thị Tooltip khi di chuột
  const handleMouseMove = (e, text) => {
    const { clientX, clientY } = e;
    setTooltip({ show: true, x: clientX, y: clientY, text: text });
  };

  // Hàm ẩn Tooltip khi di chuột ra ngoài
  const handleMouseLeave = () => {
    setTooltip({ show: false, x: 0, y: 0, text: "" });
  };

  const searchData =
    Array.isArray(data) && searchQuery.trim()
      ? data.filter((item) => {
          const fieldsToSearch = [item.title, item.actor]; // Các trường cần tìm kiếm
          const result = fuzzy.filter(
            searchQuery,
            fieldsToSearch.filter(Boolean)
          ); // Chỉ lọc những trường không phải undefined/null

          return result.length > 0; // Nếu có kết quả tìm kiếm thì giữ lại
        })
      : Array.isArray(data)
      ? data
      : []; // Nếu `data` không phải mảng, trả về mảng rỗng

  const sortedData = [...searchData].sort((a, b) => {
    if (sortOption === "Xếp hạng") {
      const likeA = a.like ?? 0;
      const likeB = b.like ?? 0;
      return likeB - likeA;
    } else if (sortOption === "Ngày tạo") {
      const dateA = a.creationDate ? new Date(a.creationDate) : new Date(0);
      const dateB = b.creationDate ? new Date(b.creationDate) : new Date(0);
      return dateB - dateA;
    }
    return 0; // Trả về 0 nếu không khớp bất kỳ điều kiện nào
  });

  // Tính toán số trang
  const totalMovies = sortedData.length;
  const totalPages = Math.ceil(totalMovies / itemsPerPage);

  // Cập nhật lại trang khi có thay đổi về `searchQuery`
  useEffect(() => {
    setCurrentPage(1); // Reset về trang đầu tiên khi thay đổi `searchQuery`
  }, [searchQuery]);

  // Tính toán dữ liệu cho trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMovies = sortedData.slice(startIndex, startIndex + itemsPerPage);
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full bg-[#222129] rounded-[8px] pb-[35px] mt-[30px]">
      <div className="w-full rounded-b-[8px] mt-[10px] px-[30px] overflow-x-auto">
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
                  ? "md:w-[8%] w-[80px]"
                  : index === 3
                  ? "md:w-[15%] w-[150px]"
                  : index === 4
                  ? "md:w-[10%] w-[90px] flex justify-center"
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

        {/* Table Content */}
        <div className="w-full whitespace-nowrap">
          {currentMovies.map((item, index) => (
            <div key={index} className="w-full h-[60px] flex text-white">
              <div className="flex-shrink-0 md:w-[5%] w-[50px] h-full flex items-center justify-start text-[#C0C0C0]">
                {item.id} {/* ID */}
              </div>
              <div
                className="flex-shrink-0 md:w-[30%] w-[300px] h-full flex items-center justify-start text-[#fff] overflow-hidden whitespace-nowrap text-ellipsis"
                onMouseMove={(e) => handleMouseMove(e, item.title)} // Tooltip hiển thị tên phim
                onMouseLeave={handleMouseLeave} // Ẩn tooltip khi di chuột ra ngoài
              >
                <Link
                  to={`/details/${item.id}`}
                  className="hover:text-[#f9ab00] select-none"
                >
                  {item.title} {/* Title */}
                </Link>
              </div>
              <div
                className="flex-shrink-0 md:w-[8%] w-[80px] h-full flex items-center justify-start"
                onMouseLeave={handleMouseLeave}
              >
                {item.rating && (
                  <Icons.MyCinemaMax.star className="text-[#f9ab00]" />
                )}
                <div className={item.rating ? "font-bold" : ""}>
                  {item.rating || item.username}
                </div>
              </div>
              <div
                className="flex-shrink-0 md:w-[15%] w-[150px] h-full flex items-center justify-start overflow-hidden whitespace-nowrap text-ellipsis pl-[10px]"
                onMouseMove={(e) => handleMouseMove(e, item.genres)} // Tooltip hiển thị mô tả
                onMouseLeave={handleMouseLeave}
              >
                {item.genres} {/* Description */}
              </div>
              <div className="flex-shrink-0 md:w-[10%] w-[90px] h-full flex items-center justify-center">
                {item.view} {/*like */}
              </div>
              <div
                className="flex-shrink-0 md:w-[10%] w-[100px] h-full flex items-center justify-start"
                style={{
                  color: item.status === "PUBLIC" ? "#29B474" : "#EB5757",
                }}
              >
                {item.status}
              </div>
              <div className="flex-shrink-0 md:w-[10%] w-[100px] h-full flex items-center justify-start">
                {item.releaseDate} {/* Creation Date */}
              </div>
              <div className="h-full items-center flex gap-[15px] justify-start">
                <button
                  className="w-[32px] h-[32px] rounded-[8px] bg-[rgba(41,180,116,0.1)] hover:bg-[rgba(41,180,116,0.2)] text-[#29B474] flex font-bold justify-center items-center"
                  // onClick={() => handleUpdateMovieStatus(item.id)}
                  onClick={() => handleOpenModal(item.id, "update")}
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
                  className="w-[32px] h-[32px] rounded-[8px] bg-[rgba(255,195,18,0.1)] hover:bg-[rgba(255,195,18,0.2)] text-[#FFC312] flex font-bold justify-center items-center"
                  onClick={() => handleEditMovie(item.id)} // Giả sử movie.id là ID của phim cần sửa
                >
                  <Icons.Catalog.edit />
                </button>
                <button
                  className="w-[32px] h-[32px] rounded-[8px] bg-[rgba(235,87,87,0.1)] hover:bg-[rgba(235,87,87,0.2)] text-[#EB5757] flex font-bold justify-center items-center"
                  // onClick={() => handleDeleteMovie(item.id)}
                  onClick={() => handleOpenModal(item.id, "delete")}
                >
                  <Icons.Catalog.trash />
                </button>
              </div>
            </div>
          ))}

          {/* Tooltip hiển thị dưới con trỏ chuột */}
          {tooltip.show && (
            <div
              className="absolute text-white bg-black text-[13px] p-2 rounded-md"
              style={{
                left: tooltip.x + 10, // Offset để tránh chồng lên con trỏ chuột
                top: tooltip.y + 10, // Offset để tránh chồng lên con trỏ chuột
                zIndex: 1000,
                pointerEvents: "none", // Đảm bảo tooltip không gây ảnh hưởng đến các sự kiện chuột khác
              }}
            >
              {tooltip.text} {/* Hiển thị thông tin Tooltip */}
            </div>
          )}
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

export default MovieTable;
