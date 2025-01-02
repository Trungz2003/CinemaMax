import React from "react";
import Navbar from "../../components/admin/Navbar";
import { useState, useEffect } from "react";
import Icons from "../../ultils/Icons";
import Filter from "../../components/admin/Filter";
import SearchBox from "../../components/admin/SearchBox";
import fuzzy from "fuzzy";

const totalUsers = 14000;

const data = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    username: "Tấn Dũng",
    comments: 15,
    reviews: 3,
    status: "Tán thành",
    pricingPlan: "Premium",
    creationDate: "2024-02-05",
  },
  {
    id: 2,
    name: "Lê Thị B",
    email: "lethib@example.com",
    username: "Minh Phúc",
    comments: 10,
    reviews: 8,
    status: "Bị cấm",
    pricingPlan: "Free",
    creationDate: "2023-02-06",
  },
  {
    id: 3,
    name: "Trần Văn C",
    email: "tranvanc@example.com",
    username: "Hạnh An",
    comments: 20,
    reviews: 5,
    status: "Tán thành",
    pricingPlan: "Cinematic",
    creationDate: "2023-02-07",
  },
  {
    id: 4,
    name: "Phan Thị D",
    email: "phanthid@example.com",
    username: "Thảo Linh",
    comments: 12,
    reviews: 4,
    status: "Bị cấm",
    pricingPlan: "Basic",
    creationDate: "2023-02-08",
  },
  {
    id: 5,
    name: "Vũ Minh E",
    email: "vuminhe@example.com",
    username: "Thu Lan",
    comments: 18,
    reviews: 7,
    status: "Tán thành",
    pricingPlan: "Premium",
    creationDate: "2023-02-09",
  },
  {
    id: 6,
    name: "Đỗ Thị F",
    email: "dothif@example.com",
    username: "Trúc Ly",
    comments: 11,
    reviews: 6,
    status: "Bị cấm",
    pricingPlan: "Free",
    creationDate: "2024-02-10",
  },
  {
    id: 7,
    name: "Hoàng Minh G",
    email: "hoangming@example.com",
    username: "Hải Yến",
    comments: 14,
    reviews: 9,
    status: "Tán thành",
    pricingPlan: "Premium",
    creationDate: "2023-02-11",
  },
  {
    id: 8,
    name: "Nguyễn Thị H",
    email: "nguyenthih@example.com",
    username: "Diễm Quỳnh",
    comments: 13,
    reviews: 5,
    status: "Bị cấm",
    pricingPlan: "Free",
    creationDate: "2023-02-12",
  },
  {
    id: 9,
    name: "Lê Văn I",
    email: "levani@example.com",
    username: "Bích Vân",
    comments: 16,
    reviews: 2,
    status: "Tán thành",
    pricingPlan: "Premium",
    creationDate: "2023-02-13",
  },
  {
    id: 10,
    name: "Trần Thị J",
    email: "tranthij@example.com",
    username: "Hoàng Lan",
    comments: 8,
    reviews: 10,
    status: "Bị cấm",
    pricingPlan: "Free",
    creationDate: "2023-02-14",
  },
  {
    id: 11,
    name: "Phan Minh K",
    email: "phanmink@example.com",
    username: "Quang Duy",
    comments: 9,
    reviews: 3,
    status: "Tán thành",
    pricingPlan: "Premium",
    creationDate: "2023-02-15",
  },
  {
    id: 12,
    name: "Vũ Thị L",
    email: "vuthil@example.com",
    username: "Khánh Vy",
    comments: 12,
    reviews: 4,
    status: "Bị cấm",
    pricingPlan: "Free",
    creationDate: "2023-02-16",
  },
  {
    id: 13,
    name: "Đỗ Minh M",
    email: "dominhm@example.com",
    username: "Minh Tuấn",
    comments: 17,
    reviews: 8,
    status: "Tán thành",
    pricingPlan: "Premium",
    creationDate: "2023-02-17",
  },
  {
    id: 14,
    name: "Nguyễn Thị N",
    email: "nguyenthinn@example.com",
    username: "Thế Vinh",
    comments: 6,
    reviews: 12,
    status: "Bị cấm",
    pricingPlan: "Free",
    creationDate: "2023-02-18",
  },
  {
    id: 15,
    name: "Lê Thị O",
    email: "lethio@example.com",
    username: "Bảo Trân",
    comments: 14,
    reviews: 6,
    status: "Tán thành",
    pricingPlan: "Premium",
    creationDate: "2023-02-19",
  },
  {
    id: 16,
    name: "Trần Văn P",
    email: "tranvanp@example.com",
    username: "Quỳnh Như",
    comments: 15,
    reviews: 7,
    status: "Bị cấm",
    pricingPlan: "Free",
    creationDate: "2023-02-20",
  },
  {
    id: 17,
    name: "Phan Thị Q",
    email: "phanthiq@example.com",
    username: "Hoàng Anh",
    comments: 8,
    reviews: 5,
    status: "Tán thành",
    pricingPlan: "Premium",
    creationDate: "2023-02-21",
  },
  {
    id: 18,
    name: "Vũ Minh R",
    email: "vuminhr@example.com",
    username: "Dương Thảo",
    comments: 10,
    reviews: 9,
    status: "Bị cấm",
    pricingPlan: "Free",
    creationDate: "2023-02-22",
  },
  {
    id: 19,
    name: "Đỗ Thị S",
    email: "dothis@example.com",
    username: "Trường Quân",
    comments: 13,
    reviews: 4,
    status: "Tán thành",
    pricingPlan: "Premium",
    creationDate: "2023-02-23",
  },
  {
    id: 20,
    name: "Hoàng Minh T",
    email: "hoangmint@example.com",
    username: "Mỹ Hạnh",
    comments: 18,
    reviews: 6,
    status: "Bị cấm",
    pricingPlan: "Free",
    creationDate: "2023-02-24",
  },
];

const pricingOrder = {
  Free: 4,
  Basic: 3,
  Premium: 2,
  Cinematic: 1,
};

const statusUser = {
  "Tán thành": 1,
  "Bị cấm": 2,
};

const RenderMoviesTable = ({ data, columnTitles, sortOption, searchQuery }) => {
  const itemsPerPage = 10; // Số lượng mục mỗi trang
  const [currentPage, setCurrentPage] = useState(1);

  const searchData = searchQuery.trim()
    ? data.filter((item) => {
        // Lọc dữ liệu theo nhiều trường
        const fieldsToSearch = [item.name, item.username, item.email]; // Các trường cần tìm kiếm
        const result = fuzzy.filter(
          searchQuery,
          fieldsToSearch.filter(Boolean)
        ); // Chỉ lọc những trường không phải undefined/null

        return result.length > 0; // Nếu có kết quả tìm kiếm thì giữ lại
      })
    : data;

  // Sắp xếp dữ liệu đã lọc
  const sortedData = [...searchData].sort((a, b) => {
    if (sortOption === "Kế hoạch giá cả") {
      return pricingOrder[a.pricingPlan] - pricingOrder[b.pricingPlan];
    } else if (sortOption === "Trạng thái") {
      return statusUser[a.status] - statusUser[b.status];
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
                <button className="w-[32px] h-[32px] rounded-[8px] bg-[rgba(41,180,116,0.1)] hover:bg-[rgba(41,180,116,0.2)] text-[#29B474] flex font-bold justify-center items-center">
                  <Icons.Catalog.lock />
                </button>
                <button className="w-[32px] h-[32px] rounded-[8px] bg-[rgba(255,195,18,0.1)] hover:bg-[rgba(255,195,18,0.2)] text-[#FFC312] flex font-bold justify-center items-center">
                  <Icons.Catalog.edit />
                </button>
                <button className="w-[32px] h-[32px] rounded-[8px] bg-[rgba(235,87,87,0.1)] hover:bg-[rgba(235,87,87,0.2)] text-[#EB5757] flex font-bold justify-center items-center">
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

const RenderUsers = () => {
  const [sortOption, setSortOption] = useState("Ngày tạo");
  const [searchQuery, setSearchQuery] = useState(""); // Thêm state cho tìm kiếm
  const [currentPage, setCurrentPage] = useState(1); // Để reset lại trang khi tìm kiếm thay đổi

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query); // Cập nhật searchQuery khi người dùng tìm kiếm
    setCurrentPage(1); // Reset về trang đầu khi tìm kiếm thay đổi
  };
  return (
    <div className="md:px-[2%] px-[4%] w-full text-[16px] mb-[40px]">
      <div className="md:h-[80px] md:flex items-center border-b border-[#222129] box-border">
        <div className="text-[32px] md:w-[30%] w-full flex gap-[20px]">
          <div className="text-left">Người sử dụng</div>
          <div className="flex text-[14px] text-[#C0C0C0] items-end mb-[7px] gap-1">
            <div>Tổng cộng </div>
            <div>{totalUsers}</div>
          </div>
        </div>
        <div className="md:w-[40%] w-full flex gap-[20px] md:justify-end justify-start mt-[20px] md:mt-0">
          <div className="w-[170px] h-[42px] rounded-[8px] border-[2px] border-[#f9ab00] flex justify-center items-center cursor-pointer select-none">
            THÊM NGƯỜI DÙNG
          </div>

          <div className="mr-[10px]">
            <Filter
              options={["Ngày tạo", "Kế hoạch giá cả", "Trạng thái"]}
              onSortChange={handleSortChange}
            />
          </div>
        </div>
        <div className="md:w-[30%] w-full flex md:justify-end mt-[20px] md:mt-0">
          <SearchBox
            placeholderText="Tìm kiếm name, username hoặc email!"
            onSearchQueryChange={handleSearchQueryChange}
          />
        </div>
      </div>
      <RenderMoviesTable
        title="Phim mới nhất"
        data={data}
        sortOption={sortOption}
        searchQuery={searchQuery}
        columnTitles={{
          id: "ID",
          basicInfo: "THÔNG TIN CƠ BẢN",
          username: "TÊN NGƯỜI DÙNG",
          pricingPlan: "KẾ HOẠCH GIÁ",
          comments: "BÌNH LUẬN",
          reviews: "ĐÁNH GIÁ",
          status: "TRẠNG THÁI",
          creationDate: "NGÀY TẠO",
          actions: "HÀNH ĐỘNG",
        }}
        className="mt-[25px]"
        currentPage={currentPage} // Truyền currentPage để reset phân trang
        setCurrentPage={setCurrentPage} // Cập nhật currentPage khi phân trang thay đổi
      />
    </div>
  );
};

const Users = () => {
  return (
    <div className="w-full md:h-[100vh] bg-[#1a191f] text-white md:flex">
      <div className="md:w-[18%] w-full md:h-full ">
        <Navbar />
      </div>
      <div className="md:w-[82%] w-full md:h-full  md:pt-0 pt-[70px] overflow-auto">
        <RenderUsers />
      </div>
    </div>
  );
};

export default Users;
