import React from "react";
import Navbar from "../../components/admin/Navbar";
import Filter from "../../components/admin/Filter";
import SearchBox from "../../components/admin/SearchBox";
import Icons from "../../ultils/Icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ReviewTables from "../../components/admin/ReviewTables";
import { getReview } from "../../apis/server/Reviews";
import { ShowToast } from "../../ultils/ToastUtils";

const RenderReviews = () => {
  const [sortOption, setSortOption] = useState("date");
  const [searchQuery, setSearchQuery] = useState(""); // Thêm state cho tìm kiếm
  const [currentPage, setCurrentPage] = useState(1); // Để reset lại trang khi tìm kiếm thay đổi
  const [dataReview, setDataReview] = useState([]);
  const [totalReview, setTotalReview] = useState(0);

  const handleSortChange = (option) => {
    if (!option) {
      // Nếu option bị null (bấm x để bỏ lọc), khôi phục dữ liệu ban đầu
      setDataReview([...dataReview]);
      setSortOption(null); // Đặt lại trạng thái sắp xếp
      return;
    }
    let sortedData = [...dataReview];

    switch (option.value) {
      case "rating_asc":
        sortedData.sort((a, b) => a.rating - b.rating);
        break;
      case "rating_desc":
        sortedData.sort((a, b) => b.rating - a.rating);
        break;
      case "date":
        sortedData.sort((a, b) => {
          if (!a.releaseDate) return 1; // Đẩy a xuống cuối nếu null hoặc undefined
          if (!b.releaseDate) return -1; // Đẩy b xuống cuối nếu null hoặc undefined
          return new Date(b.releaseDate) - new Date(a.releaseDate); // Sắp xếp từ mới nhất -> cũ nhất
        });
        break;
      default:
        return;
    }

    setDataReview(sortedData);
    setSortOption(option.value); // Lưu lại lựa chọn đã sắp xếp
  };

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query); // Cập nhật searchQuery khi người dùng tìm kiếm
    setCurrentPage(1); // Reset về trang đầu khi tìm kiếm thay đổi
  };

  const handleReviewDetails = async () => {
    const result = await getReview(); // Giả sử hàm này nhận ID và token
    console.log("kết quả: ", result);

    if (result.code === 0) {
      setDataReview(result.result.reviews);
      setTotalReview(result.result.totalReview);
    } else {
      ShowToast("error", "Không thể lấy thông tin người dùng!");
    }
  };

  useEffect(() => {
    handleReviewDetails();
  }, []);

  return (
    <div className="md:px-[2%] px-[4%] w-full text-[16px] mb-[40px]">
      <div className="md:h-[80px] md:flex items-center border-b border-[#222129] box-border">
        <div className="text-[32px] md:w-[30%] w-full flex gap-[20px]">
          <div className="text-left">Đánh giá</div>
          <div className="flex text-[14px] text-[#C0C0C0] items-end mb-[7px] gap-1">
            <div>Tổng cộng </div>
            <div>{totalReview}</div>
          </div>
        </div>
        <div className="md:w-[40%] w-full flex gap-[20px] md:justify-end justify-start mt-[20px] md:mt-0">
          <div className="mr-[10px]">
            <Filter
              options={[
                { name: "Ngày tạo", value: "date" },
                { name: "Xếp hạng (Thấp → Cao)", value: "rating_asc" },
                { name: "Xếp hạng (Cao → Thấp)", value: "rating_desc" },
              ]}
              onSortChange={handleSortChange}
              dropdownWidth="200px"
              test="Sắp xếp"
            />
          </div>
        </div>
        <div className="md:w-[30%] w-full flex md:justify-end mt-[20px] md:mt-0">
          <SearchBox
            placeholderText="Tìm kiếm tên phim hoặc tên tác giả!"
            onSearchQueryChange={handleSearchQueryChange}
          />
        </div>
      </div>
      <ReviewTables
        title="Phim mới nhất"
        data={dataReview}
        setData={setDataReview}
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
    </div>
  );
};

const Reviews = () => {
  return (
    <div className="w-full md:h-[100vh] bg-[#1a191f] text-white md:flex">
      <div className="md:w-[18%] w-full md:h-full ">
        <Navbar />
      </div>
      <div className="md:w-[82%] w-full md:h-full  md:pt-0 pt-[70px] overflow-auto">
        <RenderReviews />
      </div>
    </div>
  );
};

export default Reviews;
