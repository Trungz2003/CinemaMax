import React from "react";
import { useState } from "react";
import ReviewTables from "../../components/admin/ReviewTables";

const ReviewUser = ({ data, setData }) => {
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
    <ReviewTables
      title="Phim mới nhất"
      data={data}
      setData={setData}
      sortOption={sortOption}
      searchQuery={searchQuery}
      columnTitles={{
        id: "ID",
        name: "TÊN PHIM",
        rating: "TÁC GIẢ",
        type: "NỘI DUNG",
        views: "ĐÁNH GIÁ",
        creationstatus: "NGÀY TẠO",
        actions: "HÀNH ĐỘNG",
      }}
      className="mt-[25px]"
      currentPage={currentPage} // Truyền currentPage để reset phân trang
      setCurrentPage={setCurrentPage} // Cập nhật currentPage khi phân trang thay đổi
    />
  );
};

export default ReviewUser;
