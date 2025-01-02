import React from "react";
import Navbar from "../../components/admin/Navbar";
import Filter from "../../components/admin/Filter";
import SearchBox from "../../components/admin/SearchBox";
import Icons from "../../ultils/Icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CommentTables from "../../components/admin/CommentTables";

const totalComments = 12.343;

const data = [
  {
    id: 1,
    title: "Tôi mơ bằng một ngôn ngữ khác",
    author: "Charlize Theron",
    description: "Khi một nhà khảo cổ học nổi tiếng đi...",
    like: 12,
    dislike: 7,
    creationDate: "2023-02-10",
  },
  {
    id: 2,
    title: "Hành trình của những vì sao",
    author: "Chris Hemsworth",
    description: "Một cuộc phiêu lưu đến những thế giới xa xôi...",
    like: 13,
    dislike: 8,
    creationDate: "2023-02-15",
  },
  {
    id: 3,
    title: "Những bí mật không lời",
    author: "Emma Watson",
    description: "Khám phá một bí mật giấu kín hàng thế kỷ...",
    like: 14,
    dislike: 6,
    creationDate: "2023-02-07",
  },
  {
    id: 4,
    title: "Bí ẩn đại dương sâu thẳm",
    author: "Leonardo DiCaprio",
    description: "Một cuộc hành trình vào lòng biển cả...",
    like: 15,
    dislike: 5,
    creationDate: "2023-02-08",
  },
  {
    id: 5,
    title: "Câu chuyện cổ tích hiện đại",
    author: "Anne Hathaway",
    description: "Một câu chuyện tình yêu trong thế giới tương lai...",
    like: 16,
    dislike: 4,
    creationDate: "2023-02-09",
  },
  {
    id: 6,
    title: "Sự trở lại của ánh sáng",
    author: "Tom Holland",
    description: "Cuộc chiến chống lại bóng tối...",
    like: 17,
    dislike: 3,
    creationDate: "2023-02-10",
  },
  {
    id: 7,
    title: "Những ngày không kết thúc",
    author: "Margot Robbie",
    description: "Cuộc sống trong một vòng lặp vô tận...",
    like: 18,
    dislike: 2,
    creationDate: "2023-02-11",
  },
  {
    id: 8,
    title: "Hành trình vượt thời gian",
    author: "Robert Downey Jr.",
    description:
      "Khám phá quá khứ và tương lai trong chuyến du hành thời gian...",
    like: 19,
    dislike: 1,
    creationDate: "2023-02-12",
  },
  {
    id: 9,
    title: "Người bạn kỳ diệu",
    author: "Scarlett Johansson",
    description: "Một người bạn từ hành tinh khác...",
    like: 20,
    dislike: 0,
    creationDate: "2023-02-13",
  },
  {
    id: 10,
    title: "Thành phố dưới lòng đất",
    author: "Chris Evans",
    description: "Cuộc sống ở một thế giới ngầm...",
    like: 21,
    dislike: 1,
    creationDate: "2023-02-14",
  },
  {
    id: 11,
    title: "Hành tinh màu xanh",
    author: "Zoe Saldana",
    description: "Khám phá một hành tinh hoàn toàn khác lạ...",
    like: 22,
    dislike: 2,
    creationDate: "2023-02-15",
  },
  {
    id: 12,
    title: "Bí mật trên đỉnh Everest",
    author: "Brad Pitt",
    description: "Những điều chưa từng được kể về Everest...",
    like: 23,
    dislike: 3,
    creationDate: "2023-02-16",
  },
  {
    id: 13,
    title: "Giấc mơ và thực tại",
    author: "Jennifer Lawrence",
    description: "Phân định giữa mơ và thực...",
    like: 24,
    dislike: 4,
    creationDate: "2023-02-17",
  },
  {
    id: 14,
    title: "Những bóng tối trong tâm trí",
    author: "Benedict Cumberbatch",
    description: "Một cuộc chiến tâm lý đầy căng thẳng...",
    like: 25,
    dislike: 5,
    creationDate: "2023-02-18",
  },
  {
    id: 15,
    title: "Vùng đất lãng quên",
    author: "Gal Gadot",
    description: "Một cuộc hành trình khám phá một thế giới bị lãng quên...",
    like: 26,
    dislike: 6,
    creationDate: "2023-02-19",
  },
  {
    id: 16,
    title: "Ngày tận thế",
    author: "Matt Damon",
    description: "Khi thế giới đối mặt với ngày tận thế...",
    like: 27,
    dislike: 7,
    creationDate: "2023-02-20",
  },
  {
    id: 17,
    title: "Chuyến đi vô tận",
    author: "Natalie Portman",
    description: "Một hành trình không điểm dừng...",
    like: 28,
    dislike: 8,
    creationDate: "2023-02-21",
  },
  {
    id: 18,
    title: "Người bảo vệ thời gian",
    author: "Chris Pratt",
    description: "Một người bảo vệ giữ cân bằng thời gian...",
    like: 29,
    dislike: 9,
    creationDate: "2023-02-22",
  },
  {
    id: 19,
    title: "Hội nghị vũ trụ",
    author: "Vin Diesel",
    description: "Khi các nền văn minh trong vũ trụ hội họp...",
    like: 30,
    dislike: 10,
    creationDate: "2023-02-23",
  },
  {
    id: 20,
    title: "Người máy và nhân loại",
    author: "Ryan Reynolds",
    description: "Sự cộng sinh giữa con người và máy móc...",
    like: 31,
    dislike: 11,
    creationDate: "2023-02-24",
  },
];

const RenderComments = () => {
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
          <div className="text-left">Bình luận</div>
          <div className="flex text-[14px] text-[#C0C0C0] items-end mb-[7px] gap-1">
            <div>Tổng cộng </div>
            <div>{totalComments}</div>
          </div>
        </div>
        <div className="md:w-[40%] w-full flex gap-[20px] md:justify-end justify-start mt-[20px] md:mt-0">
          <div className="w-[170px] h-[42px] rounded-[8px] border-[2px] border-[#f9ab00] flex justify-center items-center cursor-pointer select-none">
            THÊM NGƯỜI DÙNG
          </div>

          <div className="mr-[10px]">
            <Filter
              options={["Ngày tạo", "Xếp hạng"]} // Truyền đúng kiểu mảng
              onSortChange={handleSortChange}
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
        data={data}
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
