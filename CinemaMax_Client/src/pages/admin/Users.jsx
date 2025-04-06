import React from "react";
import Navbar from "../../components/admin/Navbar";
import { useState, useEffect } from "react";
import Icons from "../../ultils/Icons";
import Filter from "../../components/admin/Filter";
import SearchBox from "../../components/admin/SearchBox";
import fuzzy from "fuzzy";
import { getAllUser } from "../../apis/server/User";
import UserTable from "../../components/admin/UserTable";
import { Link } from "react-router-dom";
import path from "../../ultils/Path";
import AddUser from "./AddUser";

const RenderUsers = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  const [sortOption, setSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // Thêm state cho tìm kiếm
  const [currentPage, setCurrentPage] = useState(1); // Để reset lại trang khi tìm kiếm thay đổi
  const [totalUser, setTotalUser] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const order = { Free: 1, Premium: 2, Cinematic: 3 };
  const handleSortChange = (option) => {
    if (!option) {
      // Nếu option bị null (bấm x để bỏ lọc), khôi phục dữ liệu ban đầu
      setData([...data]);
      setSortOption(null); // Đặt lại trạng thái sắp xếp
      return;
    }

    let sortedData = [...(data.length > 0 ? data : data)];

    switch (option.name) {
      case "Ngày tạo":
        sortedData.sort((a, b) => {
          if (!a.creationDate) return 1; // Đẩy a xuống cuối nếu null hoặc undefined
          if (!b.creationDate) return -1; // Đẩy b xuống cuối nếu null hoặc undefined
          return new Date(b.creationDate) - new Date(a.creationDate); // Sắp xếp từ mới nhất -> cũ nhất
        });
        break;
      case "Kế hoạch giá cả":
        sortedData.sort((a, b) => {
          const rankA = order[a.pricingPlan] || 0; // Nếu không tìm thấy, mặc định là 0
          const rankB = order[b.pricingPlan] || 0;
          return rankA - rankB; // Sắp xếp tăng dần
        });
        break;
      case "Trạng thái":
        sortedData.sort((a, b) => {
          if (a.status === "ACTIVE" && b.status !== "ACTIVE") return -1;
          if (a.status !== "ACTIVE" && b.status === "ACTIVE") return 1;
          return a.status.localeCompare(b.status);
        });
        break;
      default:
        return;
    }

    console.log("data đã lọc: ", sortedData);
    console.log("name: ", option.name);

    setData([...sortedData]);
    setSortOption(option);
    // if (!option || !option.name) {
    //   setSortOption("Sắp xếp");
    // } else {
    // }
  };

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query); // Cập nhật searchQuery khi người dùng tìm kiếm
    setCurrentPage(1); // Reset về trang đầu khi tìm kiếm thay đổi
  };

  const fetchUsers = async () => {
    try {
      const users = await getAllUser(token);
      if (users) {
        setData(users.userSummaryResponse);
        setTotalUser(users.totalUser);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    setIsCreate(false); // Reset lại isCreate sau khi fetch dữ liệu
  }, [token, isCreate]); // Đưa token và isCreate vào dependency

  return (
    <div className="md:px-[2%] px-[4%] w-full text-[16px] mb-[40px]">
      <div className="md:h-[80px] md:flex items-center border-b border-[#222129] box-border">
        <div className="text-[32px] md:w-[30%] w-full flex gap-[20px]">
          <div className="text-left">Người sử dụng</div>
          <div className="flex text-[14px] text-[#C0C0C0] items-end mb-[7px] gap-1">
            <div>Tổng cộng </div>
            <div>{totalUser}</div>
          </div>
        </div>
        <div className="md:w-[40%] w-full flex gap-[20px] md:justify-end justify-start mt-[40px] md:mt-0">
          <div
            className="w-[170px] h-[45px] rounded-[8px] border-[2px] border-[#f9ab00] cursor-pointer select-none flex justify-center items-center"
            onClick={() => setIsModalOpen(true)}
          >
            THÊM NGƯỜI DÙNG
          </div>

          <AddUser
            isOpen={isModalOpen}
            toggleModal={() => setIsModalOpen(false)}
            status={setIsCreate}
          />

          <div className="mr-[10px]">
            <Filter
              options={[
                { name: "Ngày tạo" },
                { name: "Kế hoạch giá cả" },
                { name: "Trạng thái" },
              ]}
              onSortChange={handleSortChange}
              dropdownWidth="150px"
              test={
                Array.isArray(sortOption) && sortOption.length > 0
                  ? sortOption
                      .filter((o) => o && o.name)
                      .map((o) => o.name)
                      .join(", ")
                  : sortOption?.name || "Sắp xếp"
              }
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
      <UserTable
        initialData={data}
        // sortOption={sortOption}
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
