import React from "react";
import Icons from "../../ultils/Icons";
import { Link } from "react-router-dom";
import path from "../../ultils/Path";
import RenderMoviesTableDashboard from "../../components/admin/RenderMoviesTableDashboard";

const Profile = ({
  totalCommentUser,
  totalRatingUser,
  userSubscriptions,
  topRatedMovies,
  latestRatedMovies,
}) => {
  return (
    <div className="w-full h-full md:px-[8%] px-[4%]">
      <div className="w-full md:h-[110px] md:flex md:gap-[64px]">
        <div className=" md:w-[30%] w-full h-full px-[30px] py-[15px] rounded-[8px] bg-[#222129]">
          <div className="text-[26px] w-full text-left">
            {userSubscriptions.name}
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="text-[18px] text-[#C0C0C0]">
              {userSubscriptions.name === "Free"
                ? `$${userSubscriptions.price} / 7 ngày`
                : userSubscriptions.name === "Premium"
                ? `$${userSubscriptions.price} / tháng`
                : userSubscriptions.name === "Cinematic"
                ? `$${userSubscriptions.price} / 2 tháng`
                : `$${userSubscriptions.price}`}
            </div>
            <div className="text-[42px] text-[#f9ab00]">
              <Icons.MyCinemaMax.creditCard />
            </div>
          </div>
        </div>
        <div className="md:w-[30%] w-full h-full px-[30px] py-[15px] mt-[20px] md:mt-0 rounded-[8px] bg-[#222129]">
          <div className="text-[26px] w-full text-left">Bình luận của bạn</div>
          <div className="w-full flex justify-between items-center">
            <div className="text-[18px] text-[#C0C0C0]">{totalCommentUser}</div>
            <div className="text-[42px] text-[#f9ab00]">
              <Icons.MyCinemaMax.comment />
            </div>
          </div>
        </div>
        <div className="md:w-[30%] w-full px-[30px] py-[15px] rounded-[8px] mt-[20px] md:mt-0 bg-[#222129]">
          <div className="text-[26px] w-full text-left">Đánh giá của bạn</div>
          <div className="w-full flex justify-between items-center">
            <div className="text-[18px] text-[#C0C0C0]">{totalRatingUser}</div>
            <div className="text-[42px] text-[#f9ab00]">
              <Icons.MyCinemaMax.starHalf />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-[30px] md:flex gap-[25px]">
        <RenderMoviesTableDashboard
          title="Phim có đánh giá cao nhất"
          data={topRatedMovies}
          columnTitles={{
            id: "ID",
            name: "TÊN PHIM",
            type: "LOẠI",
            rating: "ĐÁNH GIÁ",
          }}
          headerIcons={[Icons.Dashboard.trophy, Icons.Dashboard.refresh]}
        />

        <div className="md:hidden pt-[30px]"></div>

        <RenderMoviesTableDashboard
          title="Đánh giá mới nhất"
          data={latestRatedMovies}
          columnTitles={{
            id: "ID",
            name: "TÊN PHIM",
            type: "TÁC GIẢ",
            rating: "ĐÁNH GIÁ",
          }}
          headerIcons={[Icons.Dashboard.star, Icons.Dashboard.refresh]}
        />
      </div>
    </div>
  );
};

export default Profile;
