import React from "react";
import { useState, useEffect } from "react";
import fuzzy from "fuzzy";
import { Link } from "react-router-dom";
import Icons from "../../ultils/Icons";

const CommentTables = ({ data, columnTitles, sortOption, searchQuery }) => {
  const itemsPerPage = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, text: "" });

  // Hàm hiển thị Tooltip khi di chuột
  const handleMouseMove = (e, text) => {
    const { clientX, clientY } = e;
    setTooltip({ show: true, x: clientX, y: clientY, text: text });
  };

  // Hàm ẩn Tooltip khi di chuột ra ngoài
  const handleMouseLeave = () => {
    setTooltip({ show: false, x: 0, y: 0, text: "" });
  };

  const searchData = searchQuery.trim()
    ? data.filter((item) => {
        // Lọc dữ liệu theo nhiều trường
        const fieldsToSearch = [item.title, item.author]; // Các trường cần tìm kiếm
        const result = fuzzy.filter(
          searchQuery,
          fieldsToSearch.filter(Boolean)
        ); // Chỉ lọc những trường không phải undefined/null

        return result.length > 0; // Nếu có kết quả tìm kiếm thì giữ lại
      })
    : data;

  // Sắp xếp dữ liệu đã lọc
  const sortedData = [...searchData].sort((a, b) => {
    if (sortOption === "Xếp hạng") {
      return b.like - a.like;
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
                  ? "md:w-[25%] w-[300px]"
                  : index === 2
                  ? "md:w-[12%] w-[80px]"
                  : index === 3
                  ? "md:w-[30%] w-[150px] pl-[10px"
                  : index === 4
                  ? "md:w-[10%] w-[90px]"
                  : "md:w-[10%] w-[150px]"
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
                className="flex-shrink-0 md:w-[25%] w-[300px] h-full flex items-center justify-start text-[#fff] overflow-hidden whitespace-nowrap text-ellipsis"
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
                className="flex-shrink-0 md:w-[12%] w-[80px] h-full flex items-center justify-start overflow-hidden whitespace-nowrap text-ellipsis"
                onMouseMove={(e) => handleMouseMove(e, item.author)} // Tooltip hiển thị tên tác giả
                onMouseLeave={handleMouseLeave}
              >
                {item.author}
              </div>
              <div
                className="flex-shrink-0 md:w-[30%] w-[150px] h-full flex items-center justify-start overflow-hidden whitespace-nowrap text-ellipsis pl-[10px]"
                onMouseMove={(e) => handleMouseMove(e, item.description)} // Tooltip hiển thị mô tả
                onMouseLeave={handleMouseLeave}
              >
                {item.description} {/* Description */}
              </div>
              <div className="flex-shrink-0 md:w-[10%] w-[90px] h-full flex items-center justify-center">
                {item.like}/{item.dislike} {/*like */}
              </div>
              <div className="flex-shrink-0 md:w-[10%] w-[100px] h-full flex items-center justify-start">
                {item.creationDate} {/* Creation Date */}
              </div>
              <div className="h-full items-center flex gap-[15px] justify-start">
                <button className="w-[32px] h-[32px] rounded-[8px] bg-[rgba(235,87,87,0.1)] hover:bg-[rgba(235,87,87,0.2)] text-[#EB5757] flex font-bold justify-center items-center">
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

export default CommentTables;
