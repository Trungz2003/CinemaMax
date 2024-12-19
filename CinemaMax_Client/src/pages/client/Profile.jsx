import React from "react";
import Icons from "../../ultils/Icons";
import { Link } from "react-router-dom";
import path from "../../ultils/Path";

const dataMoviesForYou = [
  { id: "241", name: "Thành phố đã mất", type: "Bộ phim", rating: "9.2" },
  { id: "825", name: "Dòng chảy ngầm", type: "Bộ phim", rating: "9.1" },
  {
    id: "9271",
    name: "Những câu chuyện từ thế giới ngầm",
    type: "Phim truyền hình",
    rating: "9.0",
  },
  {
    id: "635",
    name: "Thế giới vô hình",
    type: "Phim truyền hình",
    rating: "8.9",
  },
  {
    id: "825",
    name: "Con Đường Cứu Chuộc",
    type: "Phim truyền hình",
    rating: "8.9",
  },
];

const dataLatestReviews = [
  {
    id: "241",
    name: "Thành phố đã mất",
    author: "Eliza Josceline",
    rating: "9.2",
  },
  {
    id: "825",
    name: "Dòng chảy ngầm cua the gioi",
    author: "Ketut",
    rating: "9.1",
  },
  {
    id: "9271",
    name: "Những câu chuyện từ thế giới ngầm",
    author: "Brian Cranston",
    rating: "9.0",
  },
  {
    id: "635",
    name: "Thế giới vô hình",
    author: "Quang",
    rating: "8.9",
  },
  {
    id: "825",
    name: "Con Đường Cứu Chuộc",
    author: "Jackson Brown",
    rating: "8.9",
  },
];

const Profile = () => {
  return (
    <div className="w-full h-full md:px-[8%] px-[4%]">
      <div className="w-full md:h-[110px] md:flex md:gap-[64px]">
        <div className=" md:w-[30%] w-full h-full px-[30px] py-[15px] rounded-[8px] bg-[#222129]">
          <div className="text-[26px] w-full text-left">Gói cao cấp</div>
          <div className="w-full flex justify-between items-center">
            <div className="text-[18px] text-[#C0C0C0]">34,99$/tháng</div>
            <div className="text-[42px] text-[#f9ab00]">
              <Icons.MyCinemaMax.creditCard />
            </div>
          </div>
        </div>
        <div className="md:w-[30%] w-full h-full px-[30px] py-[15px] mt-[20px] md:mt-0 rounded-[8px] bg-[#222129]">
          <div className="text-[26px] w-full text-left">Bình luận của bạn</div>
          <div className="w-full flex justify-between items-center">
            <div className="text-[18px] text-[#C0C0C0]">2 573</div>
            <div className="text-[42px] text-[#f9ab00]">
              <Icons.MyCinemaMax.comment />
            </div>
          </div>
        </div>
        <div className="md:w-[30%] w-full px-[30px] py-[15px] rounded-[8px] mt-[20px] md:mt-0 bg-[#222129]">
          <div className="text-[26px] w-full text-left">Gói cao cấp</div>
          <div className="w-full flex justify-between items-center">
            <div className="text-[18px] text-[#C0C0C0]">34,99$/tháng</div>
            <div className="text-[42px] text-[#f9ab00]">
              <Icons.MyCinemaMax.starHalf />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-[30px] md:flex gap-[25px]">
        <div className="w-full md:w-[49%] h-[340px] bg-[#222129] rounded-[8px]">
          <div className="w-full h-[70px] flex rounded-t-[8px] border-b-[1px] border-[#1a191f]">
            <div className="w-[60%] h-full text-[20px] flex justify-start items-center md:gap-2 gap-[5px] md:px-[30px] pl-[10px]">
              <div className="text-[#f9ab00]">
                <Icons.MyCinemaMax.movie />
              </div>
              <div>Phim dành cho bạn</div>
            </div>

            <div className="w-[40%] h-full flex justify-end items-center text-[20px] md:gap-[30px] gap-[10px] md:px-[30px] pr-[10px]">
              <div className="text-[20px] cursor-pointer hover:text-[#f9ab00]">
                <Icons.MyCinemaMax.refresh />
              </div>

              <div className="h-[35px] w-[85px] md:w-[100px] rounded-[8px] bg-[#1a191f] cursor-pointer text-[16px] flex items-center justify-center hover:text-[#f9ab00]">
                Xem tất cả
              </div>
            </div>
          </div>

          <div className="w-full rounded-b-[8px] mt-[10px] pl-[30px] overflow-x-auto">
            <div className="w-full h-[50px] border-b-[1px] border-[#1a191f] text-[12px] text-[#C0C0C0] flex">
              <div className="flex-shrink-0 w-[60px] md:w-[10%] h-full flex items-center justify-start">
                ID
              </div>
              <div className="flex-shrink-0 w-[350px] md:w-[45%] h-full flex items-center justify-start">
                TÊN PHIM
              </div>
              <div className="flex-shrink-0 w-[200px] md:w-[30%] h-full flex items-center justify-start">
                LOẠI
              </div>
              <div className="flex-shrink-0 w-[80px] md:w-[15%] h-full flex items-center justify-start">
                ĐÁNH GIÁ
              </div>
            </div>

            {/* Nội dung bảng */}
            <div className="w-full whitespace-nowrap">
              {dataMoviesForYou.map((item, index) => (
                <div key={index} className="w-full h-[40px] flex text-white">
                  <div className="flex-shrink-0 w-[60px] md:w-[10%] h-full flex items-center justify-start text-[#C0C0C0]">
                    {item.id}
                  </div>
                  <div className="flex-shrink-0 w-[350px] md:w-[45%] h-full flex items-center justify-start text-[#fff]">
                    <Link
                      to={path.DETAILS}
                      className="hover:text-[#f9ab00] select-none"
                    >
                      {item.name}
                    </Link>
                  </div>
                  <div className="flex-shrink-0 w-[200px] md:w-[30%] h-full flex items-center justify-start">
                    {item.type}
                  </div>
                  <div className="flex-shrink-0 w-[80px] md:w-[15%] h-full flex items-center justify-start font-bold gap-2">
                    <Icons.MyCinemaMax.star className="text-[#f9ab00]" />
                    <div>{item.rating}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-[49%] h-[340px] bg-[#222129] rounded-[8px] md:mt-0 mt-[20px]">
          <div className="w-full h-[70px] flex rounded-t-[8px] border-b-[1px] border-[#1a191f]">
            <div className="w-[60%] h-full text-[20px] flex justify-start items-center md:gap-2 gap-[5px] md:px-[30px] pl-[10px]">
              <div className="text-[#f9ab00]">
                <Icons.MyCinemaMax.starHalf />
              </div>
              <div>Đánh giá mới nhất</div>
            </div>

            <div className="w-[40%] h-full flex justify-end items-center text-[20px] md:gap-[30px] gap-[10px] md:px-[30px] pr-[10px]">
              <div className="text-[20px] cursor-pointer hover:text-[#f9ab00]">
                <Icons.MyCinemaMax.refresh />
              </div>

              <div className="h-[35px] w-[85px] md:w-[100px] rounded-[8px] bg-[#1a191f] cursor-pointer text-[16px] flex items-center justify-center hover:text-[#f9ab00]">
                Xem tất cả
              </div>
            </div>
          </div>

          <div className="w-full rounded-b-[8px] mt-[10px] pl-[30px] overflow-x-auto">
            <div className="w-full h-[50px] border-b-[1px] border-[#1a191f] text-[12px] text-[#C0C0C0] flex">
              <div className="flex-shrink-0 w-[60px] md:w-[10%] h-full flex items-center justify-start">
                ID
              </div>
              <div className="flex-shrink-0 w-[350px] md:w-[45%] h-full flex items-center justify-start">
                TÊN PHIM
              </div>
              <div className="flex-shrink-0 w-[200px] md:w-[30%] h-full flex items-center justify-start">
                TÁC GIẢ
              </div>
              <div className="flex-shrink-0 w-[80px] md:w-[15%] h-full flex items-center justify-start">
                ĐÁNH GIÁ
              </div>
            </div>

            {/* Nội dung bảng */}
            <div className="w-full whitespace-nowrap">
              {dataLatestReviews.map((item, index) => (
                <div key={index} className="w-full h-[40px] flex text-white">
                  <div className="flex-shrink-0 w-[60px] md:w-[10%] h-full flex items-center justify-start text-[#C0C0C0]">
                    {item.id}
                  </div>
                  <div className="flex-shrink-0 w-[350px] md:w-[45%] h-full flex items-center justify-start text-[#fff]">
                    <Link
                      to={path.DETAILS}
                      className="hover:text-[#f9ab00] select-none"
                    >
                      {item.name}
                    </Link>
                  </div>
                  <div className="flex-shrink-0 w-[200px] md:w-[30%] h-full flex items-center justify-start">
                    {item.author}
                  </div>
                  <div className="flex-shrink-0 w-[80px] md:w-[15%] h-full flex items-center justify-start font-bold gap-2">
                    <Icons.MyCinemaMax.star className="text-[#f9ab00]" />
                    <div>{item.rating}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
