import React from "react";
import Navbar from "../../components/admin/Navbar";
import ProfileUser from "./ProfileUser";
import CommentUser from "./CommentUser";
import ReviewUser from "./ReviewUser";
import Icons from "../../ultils/Icons";
import { useState } from "react";

const code = 67089;
const userStatus = "Đã phê duyệt";

const dataReview = [
  {
    id: 1,
    title: "Tôi mơ bằng một ngôn ngữ khác",
    author: "Charlize Theron",
    description: "Khi một nhà khảo cổ học nổi tiếng đi...",
    rating: 7.3, // Random rating
    creationDate: "2024-01-05", // Adjusted date format to yyyy-mm-dd
  },
  {
    id: 2,
    title: "Hành trình của những vì sao",
    author: "Chris Hemsworth",
    description: "Một cuộc phiêu lưu đến những thế giới xa xôi...",
    rating: 8.1, // Random rating
    creationDate: "2024-01-06",
  },
  {
    id: 3,
    title: "Những bí mật không lời",
    author: "Emma Watson",
    description: "Khám phá một bí mật giấu kín hàng thế kỷ...",
    rating: 6.9, // Random rating
    creationDate: "2024-01-07",
  },
  {
    id: 4,
    title: "Bí ẩn đại dương sâu thẳm",
    author: "Leonardo DiCaprio",
    description: "Một cuộc hành trình vào lòng biển cả...",
    rating: 7.6, // Random rating
    creationDate: "2024-01-08",
  },
  {
    id: 5,
    title: "Câu chuyện cổ tích hiện đại",
    author: "Anne Hathaway",
    description: "Một câu chuyện tình yêu trong thế giới tương lai...",
    rating: 8.3, // Random rating
    creationDate: "2024-01-09",
  },
  {
    id: 6,
    title: "Sự trở lại của ánh sáng",
    author: "Tom Holland",
    description: "Cuộc chiến chống lại bóng tối...",
    rating: 7.5, // Random rating
    creationDate: "2024-01-10",
  },
  {
    id: 7,
    title: "Những ngày không kết thúc",
    author: "Margot Robbie",
    description: "Cuộc sống trong một vòng lặp vô tận...",
    rating: 6.8, // Random rating
    creationDate: "2024-01-11",
  },
  {
    id: 8,
    title: "Hành trình vượt thời gian",
    author: "Robert Downey Jr.",
    description:
      "Khám phá quá khứ và tương lai trong chuyến du hành thời gian...",
    rating: 9.0, // Random rating
    creationDate: "2024-01-12",
  },
  {
    id: 9,
    title: "Người bạn kỳ diệu",
    author: "Scarlett Johansson",
    description: "Một người bạn từ hành tinh khác...",
    rating: 7.2, // Random rating
    creationDate: "2024-01-13",
  },
  {
    id: 10,
    title: "Thành phố dưới lòng đất",
    author: "Chris Evans",
    description: "Cuộc sống ở một thế giới ngầm...",
    rating: 6.5, // Random rating
    creationDate: "2024-01-14",
  },
  {
    id: 11,
    title: "Hành tinh màu xanh",
    author: "Zoe Saldana",
    description: "Khám phá một hành tinh hoàn toàn khác lạ...",
    rating: 7.7, // Random rating
    creationDate: "2024-01-15",
  },
  {
    id: 12,
    title: "Bí mật trên đỉnh Everest",
    author: "Brad Pitt",
    description: "Những điều chưa từng được kể về Everest...",
    rating: 7.4, // Random rating
    creationDate: "2024-01-16",
  },
  {
    id: 13,
    title: "Giấc mơ và thực tại",
    author: "Jennifer Lawrence",
    description: "Phân định giữa mơ và thực...",
    rating: 8.0, // Random rating
    creationDate: "2024-01-17",
  },
  {
    id: 14,
    title: "Những bóng tối trong tâm trí",
    author: "Benedict Cumberbatch",
    description: "Một cuộc chiến tâm lý đầy căng thẳng...",
    rating: 6.7, // Random rating
    creationDate: "2024-01-18",
  },
  {
    id: 15,
    title: "Vùng đất lãng quên",
    author: "Gal Gadot",
    description: "Một cuộc hành trình khám phá một thế giới bị lãng quên...",
    rating: 8.2, // Random rating
    creationDate: "2024-01-19",
  },
  {
    id: 16,
    title: "Ngày tận thế",
    author: "Matt Damon",
    description: "Khi thế giới đối mặt với ngày tận thế...",
    rating: 7.1, // Random rating
    creationDate: "2024-01-20",
  },
  {
    id: 17,
    title: "Chuyến đi vô tận",
    author: "Natalie Portman",
    description: "Một hành trình không điểm dừng...",
    rating: 8.5, // Random rating
    creationDate: "2024-01-21",
  },
  {
    id: 18,
    title: "Người bảo vệ thời gian",
    author: "Chris Pratt",
    description: "Một người bảo vệ giữ cân bằng thời gian...",
    rating: 7.8, // Random rating
    creationDate: "2024-01-22",
  },
  {
    id: 19,
    title: "Hội nghị vũ trụ",
    author: "Vin Diesel",
    description: "Khi các nền văn minh trong vũ trụ hội họp...",
    rating: 6.6, // Random rating
    creationDate: "2024-01-23",
  },
  {
    id: 20,
    title: "Người máy và nhân loại",
    author: "Ryan Reynolds",
    description: "Sự cộng sinh giữa con người và máy móc...",
    rating: 8.0, // Random rating
    creationDate: "2024-01-24",
  },
];

const dataCommment = [
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

const ContentNavbar = ({ index }) => {
  return (
    <div className="w-full">
      {index === 0 && <ProfileUser />}
      {index === 1 && <CommentUser data={dataCommment} />}
      {index === 2 && <ReviewUser data={dataReview} />}
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
  const [activeIndex, setActiveIndex] = useState(0); // Theo dõi mục đang

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
                  <div className="w-[40px] h-[40px] rounded bg-[#212026] flex justify-center items-center">
                    <Icons.MovieDetails.persion className="w-[70%] h-[70%]" />
                  </div>

                  <div className="h-full w-full ml-[20px] relative">
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
                      <p className="font-bold text-left flex gap-1 items-center">
                        John Doe{" "}
                        <p className="text-[12px] text-[#29B474]">
                          ({userStatus})
                        </p>
                      </p>
                      <p className="text-left">id: {code}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:hidden h-full w-[20%] items-center flex gap-[15px] justify-end">
                <button className="w-[32px] h-[32px] rounded-[8px] bg-[rgba(41,180,116,0.1)] hover:bg-[rgba(41,180,116,0.2)] text-[#29B474] flex font-bold justify-center items-center">
                  <Icons.Catalog.lock />
                </button>
                <button className="w-[32px] h-[32px] rounded-[8px] bg-[rgba(235,87,87,0.1)] hover:bg-[rgba(235,87,87,0.2)] text-[#EB5757] flex font-bold justify-center items-center">
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
              <button className="w-[32px] h-[32px] rounded-[8px] bg-[rgba(41,180,116,0.1)] hover:bg-[rgba(41,180,116,0.2)] text-[#29B474] flex font-bold justify-center items-center">
                <Icons.Catalog.lock />
              </button>
              <button className="w-[32px] h-[32px] rounded-[8px] bg-[rgba(235,87,87,0.1)] hover:bg-[rgba(235,87,87,0.2)] text-[#EB5757] flex font-bold justify-center items-center">
                <Icons.Catalog.trash />
              </button>
            </div>
          </div>

          <div className=" w-full  pt-[35px] pb-[70px]">
            <ContentNavbar index={activeIndex} />
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
