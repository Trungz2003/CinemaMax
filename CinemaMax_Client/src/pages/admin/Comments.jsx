import React from "react";
import Navbar from "../../components/admin/Navbar";
import Filter from "../../components/admin/Filter";
import SearchBox from "../../components/admin/SearchBox";
import Icons from "../../ultils/Icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CommentTables from "../../components/admin/CommentTables";
import { getComment } from "../../apis/server/Comments";
import { ShowToast } from "../../ultils/ToastUtils";

const RenderComments = () => {
  const [sortOption, setSortOption] = useState("Ngày tạo");
  const [searchQuery, setSearchQuery] = useState(""); // Thêm state cho tìm kiếm
  const [currentPage, setCurrentPage] = useState(1); // Để reset lại trang khi tìm kiếm thay đổi
  const [dataComment, setDataComment] = useState([]);
  const [totalComment, setTotalComment] = useState(0);

  const handleSortChange = (option) => {
    if (!option) {
      // Nếu option bị null (bấm x để bỏ lọc), khôi phục dữ liệu ban đầu
      setDataComment([...dataComment]);
      setSortOption(null); // Đặt lại trạng thái sắp xếp
      return;
    }
    let sortedData = [...dataComment];

    sortedData = sortedData.map((item) => {
      const [likeCount, dislikeCount] = item.thichKhongThich
        .split("/")
        .map(Number);
      return { ...item, like_count: likeCount, dislike_count: dislikeCount };
    });

    switch (option.value) {
      case "date":
        sortedData.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
          const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
          return dateB - dateA;
        });
        break;
      case "like_desc": // Thích nhiều → ít
        sortedData.sort((a, b) => b.like_count - a.like_count);
        break;
      case "like_asc": // Thích ít → nhiều
        sortedData.sort((a, b) => a.like_count - b.like_count);
        break;
      case "dislike_desc": // Không thích nhiều → ít
        sortedData.sort((a, b) => b.dislike_count - a.dislike_count);
        break;
      case "dislike_asc": // Không thích ít → nhiều
        sortedData.sort((a, b) => a.dislike_count - b.dislike_count);
        break;
      default:
        return;
    }

    setDataComment(sortedData);
    setSortOption(option.value); // Lưu lại lựa chọn đã sắp xếp
  };

  const handleReviewDetails = async () => {
    const result = await getComment(); // Giả sử hàm này nhận ID và token

    if (result.code === 0) {
      console.log(result.result.comments);

      setDataComment(result.result.comments);
      setTotalComment(result.result.totalComments);
    } else {
      ShowToast("error", "Không thể lấy thông tin người dùng!");
    }
  };

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query); // Cập nhật searchQuery khi người dùng tìm kiếm
    setCurrentPage(1); // Reset về trang đầu khi tìm kiếm thay đổi
  };

  useEffect(() => {
    handleReviewDetails();
  }, []);
  return (
    <div className="md:px-[2%] px-[4%] w-full text-[16px] mb-[40px]">
      <div className="md:h-[80px] md:flex items-center border-b border-[#222129] box-border">
        <div className="text-[32px] md:w-[30%] w-full flex gap-[20px]">
          <div className="text-left">Bình luận</div>
          <div className="flex text-[14px] text-[#C0C0C0] items-end mb-[7px] gap-1">
            <div>Tổng cộng </div>
            <div>{totalComment}</div>
          </div>
        </div>
        <div className="md:w-[40%] w-full flex gap-[20px] md:justify-end justify-start mt-[20px] md:mt-0">
          <div className="mr-[10px]">
            <Filter
              options={[
                { name: "Ngày tạo", value: "date" },
                { name: "Like (Cao → Thấp)", value: "like_desc" },
                { name: "Like (Thấp → Cao)", value: "like_asc" },
                { name: "Dislike (Cao → Thấp)", value: "dislike_desc" },
                { name: "Dislike (Thấp → Cao)", value: "dislike_asc" },
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
      <CommentTables
        title="Phim mới nhất"
        data={dataComment}
        setData={setDataComment}
        sortOption={sortOption}
        searchQuery={searchQuery}
        columnTitles={{
          id: "ID",
          name: "TÊN PHIM",
          rating: "TÁC GIẢ",
          type: "NỘI DUNG",
          views: "THÍCH / KHÔNG THÍCH",
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

const Comments = () => {
  return (
    <div className="w-full md:h-[100vh] bg-[#1a191f] text-white md:flex">
      <div className="md:w-[18%] w-full md:h-full ">
        <Navbar />
      </div>
      <div className="md:w-[82%] w-full md:h-full  md:pt-0 pt-[70px] overflow-auto">
        <RenderComments />
      </div>
    </div>
  );
};

export default Comments;
