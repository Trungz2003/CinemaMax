import Navbar from "../../components/client/Navbar";
import { Footer } from "../../components/client/Footer";
import Icons from "../../ultils/Icons";
import React, { useState, useEffect, useRef } from "react";
import MovieItem from "../../components/client/MovieItem";
import VideoPlayer from "../../components/client/VideoPlayer";

const data = [
  {
    id: 1,
    title: "I Dream in Another Language",
    rating: 9.2,
    categories: ["Hoạt động", "Giật gân"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 2,
    title: "The Silent Voice",
    rating: 8.7,
    categories: ["Hoạt hình", "Tình cảm"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 3,
    title: "Interstellar",
    rating: 9.5,
    categories: ["Khoa học", "Phiêu lưu"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 4,
    title: "Parasite",
    rating: 8.6,
    categories: ["Tâm lý", "Giật gân"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 5,
    title: "The Dark Knight",
    rating: 9.0,
    categories: ["Hành động", "Tội phạm"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 6,
    title: "Inception",
    rating: 8.8,
    categories: ["Khoa học", "Giật gân"],
    image: "src/assets/test/cover.png",
  },
];

const movie = {
  title: "City of Lost Secrets",
  coverImage: "src/assets/test/cover.png",
  rating: 8.4,
  favorite: true,
  director: "Vince Gilligan",
  cast: [
    "Bryan Cranston",
    "Jesse Plemons",
    "Matt Jones",
    "Jonathan Banks",
    "Charles Baker",
    "Tess Harper",
  ],
  genres: ["Hành động", "Triler"],
  releaseYear: 2019,
  runtime: "128 phút",
  country: "Hoa Kỳ",
  videoLink: "v1736699428/Test_ahko4y.mp4",
  description: `
      Khi một nhà khảo cổ học nổi tiếng mất tích, con gái ông bắt đầu một hành trình nguy hiểm đến trung tâm của rừng nhiệt đới Amazon để tìm ông. Trên đường đi, cô phát hiện ra một thành phố ẩn giấu và một âm mưu nguy hiểm đe dọa đến sự cân bằng quyền lực trên thế giới.
      Với sự giúp đỡ của một kẻ lưu manh quyến rũ, cô phải vượt qua địa hình hiểm trở và đánh bại những kẻ thù mạnh mẽ để cứu cha mình và khám phá ra những bí mật của thành phố đã mất.
    `,
};

const comments = [
  {
    id: 1,
    name: "John Doe",
    time: "30.08.2018, 17:53",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    upvotes: 12,
    downvotes: 7,
  },
  {
    id: 2,
    name: "John Doe",
    time: "24.08.2018, 16:41",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    upvotes: 8,
    downvotes: 3,
  },
  {
    id: 3,
    name: "John Doe",
    time: "11.08.2018, 11:11",
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
    upvotes: 11,
    downvotes: 1,
  },
  {
    id: 4,
    name: "John Doe",
    time: "07.08.2018, 14:33",
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
    upvotes: 99,
    downvotes: 35,
  },
  {
    id: 5,
    name: "John Doe",
    time: "02.08.2018, 15:24",
    text: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.",
    upvotes: 74,
    downvotes: 13,
  },
];

const review = [
  {
    title: "Theo tôi thì đây là bộ phim hay nhất của Marvel",
    name: "John Doe",
    time: "30.08.2018, 17:53",
    rating: 9.2,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    title: "Theo tôi thì đây là bộ phim hay nhất của Marvel",
    name: "John Doe",
    time: "24.08.2018, 16:41",
    rating: 9.2,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    title: "Theo tôi thì đây là bộ phim hay nhất của Marvel",
    name: "John Doe",
    time: "11.08.2018, 11:11",
    rating: 9.2,
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
  },
  {
    title: "Theo tôi thì đây là bộ phim hay nhất của Marvel",
    name: "John Doe",
    time: "07.08.2018, 14:33",
    rating: 9.2,
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
  },
  {
    title: "Theo tôi thì đây là bộ phim hay nhất của Marvel",
    name: "John Doe",
    time: "02.08.2018, 15:24",
    rating: 9.2,
    text: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.",
  },
];
const TabMenu = () => {
  const tabs = ["BÌNH LUẬN", "ĐÁNH GIÁ"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const [votes, setVotes] = useState(
    comments.map((comment) => ({
      id: comment.id,
      liked: false,
      disliked: false,
    }))
  );

  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Trạng thái dropdown
  const [selectedRating, setSelectedRating] = useState(""); // Trạng thái giá trị được chọn
  const dropdownRef = useRef(null); // Tham chiếu đến container chứa dropdown

  const handleLike = (id) => {
    setVotes((prevVotes) =>
      prevVotes.map((vote) =>
        vote.id === id
          ? {
              ...vote,
              liked: !vote.liked,
              disliked: vote.liked ? vote.disliked : false,
            }
          : vote
      )
    );
  };

  const handleDislike = (id) => {
    setVotes((prevVotes) =>
      prevVotes.map((vote) =>
        vote.id === id
          ? {
              ...vote,
              disliked: !vote.disliked,
              liked: vote.disliked ? vote.liked : false,
            }
          : vote
      )
    );
  };

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    // Nếu click bên ngoài dropdown, đóng dropdown
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    // Lắng nghe sự kiện click trên document
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Dọn dẹp sự kiện khi component bị unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Xử lý khi chọn một giá trị
  const handleSelect = (rating) => {
    setSelectedRating(rating); // Cập nhật giá trị vào state
    setIsDropdownVisible(false); // Đóng dropdown
  };
  return (
    <div>
      {/* Tab Menu */}
      <div className="flex w-full md:px-[8%] px-[4%] gap-[40px] mt-[20px] border-b border-gray-600 box-border">
        {tabs.map((tab) => (
          <div
            key={tab}
            className="cursor-pointer flex flex-col items-center"
            onClick={() => setActiveTab(tab)} // Chuyển đổi tab khi click
          >
            <div
              className={`text-[16px] ${
                activeTab === tab ? "text-[#f9ab00]" : "text-white"
              }`}
            >
              {tab}
            </div>
            <div
              className={`mt-[5px] h-[2px] w-[73px] ${
                activeTab === tab ? "bg-[#f9ab00]" : "bg-transparent"
              }`}
            ></div>
          </div>
        ))}
      </div>

      <div className="w-[100%] md:px-[8%] px-[4%] md:flex">
        <div className="mt-5 mb-[30px] md:w-[65%] w-[100%] px-[1%] rounded-lg">
          {activeTab === "BÌNH LUẬN" && (
            <div className="mt-5 rounded-lg shadow-lg">
              <ul>
                {comments.map((comment) => {
                  const vote = votes.find((v) => v.id === comment.id); // Lấy trạng thái của bình luận hiện tại

                  return (
                    <li className="mb-5" key={comment.id}>
                      <div className="flex items-center space-x-2">
                        <div className="w-[40px] h-[40px] rounded bg-[#212026] flex justify-center items-center">
                          <Icons.MovieDetails.persion className="w-[70%] h-[70%]" />
                        </div>
                        <div className="text-left ml-[10px]">
                          <div className="text-[16px] font-semibold">
                            {comment.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {comment.time}
                          </div>
                        </div>
                      </div>
                      <div className="mt-[16px]">
                        <p className="text-sm text-left py-[20px] px-[30px] rounded-t-[8px] border border-gray-800">
                          {comment.text}
                        </p>
                        <div className="flex justify-between items-center px-[30px] py-[15px] rounded-b-[8px] border border-gray-800">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleLike(comment.id)}
                              className={`text-sm flex items-center ${
                                vote?.liked ? "text-blue-500" : "text-gray-500"
                              }`}
                            >
                              <i className="mr-1">
                                <Icons.MovieDetails.like />
                              </i>
                              {comment.upvotes}
                            </button>
                            <button
                              onClick={() => handleDislike(comment.id)}
                              className={`text-sm flex items-center ${
                                vote?.disliked
                                  ? "text-red-500"
                                  : "text-gray-500"
                              }`}
                            >
                              <i className="mr-1">
                                <Icons.MovieDetails.disLike />
                              </i>
                              {comment.downvotes}
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Paginator */}
              <div className="flex justify-between items-center mt-4">
                <span className="paginator-mob__pages text-sm">
                  5 trong số 628
                </span>
                <div className="paginator-mob__nav flex gap-4">
                  <button className="text-sm flex items-center">
                    <i className="ti ti-chevron-left mr-1"></i>Trước đó
                  </button>
                  <button className="text-sm flex items-center">
                    Kế tiếp<i className="ti ti-chevron-right ml-1"></i>
                  </button>
                </div>
              </div>
              <form
                action="#"
                className="mt-4 w-[100%] h-[295px] border rounded-[8px] border-gray-800"
              >
                <div className="rounded-[8px]  p-[30px] h-[70%]">
                  <textarea
                    id="text"
                    name="text"
                    className="p-[15px] rounded-[8px] w-full h-[100%] bg-[#222129] resize-none"
                    placeholder="Thêm bình luận"
                  ></textarea>
                </div>
                <button
                  type="button"
                  className="mt-[15px] border-[2px] border-[#f9ab00] hover:bg-[#f2d19480] text-white p-2 rounded-lg w-[140px] h-[45px]"
                >
                  Gửi
                </button>
              </form>
            </div>
          )}

          {activeTab === "ĐÁNH GIÁ" && (
            <div className="mt-5 rounded-lg shadow-lg">
              <ul>
                {review.map((review, index) => (
                  <li className="mb-5" key={index}>
                    <div className=" flex items-center space-x-2">
                      <div className="w-[85%] flex">
                        <div className=" w-[40px] h-[40px] rounded bg-[#212026] flex justify-center items-center">
                          <Icons.MovieDetails.persion className="w-[70%] h-[70%]" />
                        </div>
                        <div className=" text-left ml-[10px]">
                          <div className="text-[16px] font-semibold">
                            {review.title}
                          </div>
                          <div className=" text-xs text-gray-500 flex gap-1">
                            <div>{review.time}</div> {" bởi "}
                            <div>{review.name}</div>
                          </div>
                        </div>
                      </div>

                      <div className="w-[15%] flex justify-end">
                        <div className="items-center md:top-[20px] top-[10px]">
                          <p className="rounded-full md:w-[35px] md:h-[35px] w-[18px] h-[18px] md:text-[14px] text-[10px] border-2 border-green-500 flex justify-center items-center text-white font-bold bg-[rgba(23,20,20,0.5)]">
                            {review.rating}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-[16px]">
                      <p className=" text-sm text-left py-[20px] px-[30px] rounded-[8px] border border-gray-800 ">
                        {review.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              {/* Paginator */}
              <div className="flex justify-between items-center mt-4">
                <span className="paginator-mob__pages text-sm">
                  5 trong số 628
                </span>
                <div className="paginator-mob__nav flex gap-4">
                  <button className="text-sm flex items-center">
                    <i className="ti ti-chevron-left mr-1"></i>Trước đó
                  </button>
                  <button className="text-sm flex items-center">
                    Kế tiếp<i className="ti ti-chevron-right ml-1"></i>
                  </button>
                </div>
              </div>
              <form
                action="#"
                className="mt-4 pt-[3%] w-[100%] h-[460px] border rounded-[8px] border-gray-800"
              >
                <div className="rounded-[8px] px-[30px] h-[12%]">
                  <textarea
                    id="text"
                    name="text"
                    className="p-[15px] rounded-[8px] w-full h-[100%] bg-[#222129] resize-none"
                    placeholder="Tiêu đề"
                  ></textarea>
                </div>
                <div
                  className="rounded-[8px] px-[30px] mt-[20px] h-[12%] z-0 relative"
                  ref={dropdownRef}
                >
                  {/* Textarea để hiển thị giá trị */}
                  <textarea
                    id="text"
                    name="text"
                    className="p-[15px] rounded-[8px] w-full h-[100%] resize-none text-white cursor-pointer bg-[#222129]"
                    placeholder="Xếp hạng"
                    onClick={toggleDropdown}
                    value={selectedRating} // Hiển thị giá trị đã chọn
                    readOnly
                  ></textarea>

                  <Icons.MovieDetails.down
                    className="absolute top-[50%] right-[45px] transform -translate-y-[50%] text-white cursor-pointer"
                    onClick={toggleDropdown}
                  />

                  {/* Dropdown */}
                  {isDropdownVisible && (
                    <div
                      className="absolute bg-[#222129] rounded-[8px] border-[2px] border-gray-800 w-[200px] ml-[30px] z-[1000]"
                      style={{ top: "100%", left: "0" }}
                    >
                      {Array.from({ length: 10 }, (_, i) => i + 1).map(
                        (num) => (
                          <div
                            key={num}
                            onClick={() => handleSelect(`${num} sao`)} // Cập nhật giá trị
                            className="p-[4px] text-white hover:bg-[#f9ab00] cursor-pointer text-center"
                          >
                            {num} sao
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>

                <div className="rounded-[8px] p-[30px] h-[50%]">
                  <textarea
                    id="text"
                    name="text"
                    className="p-[15px] rounded-[8px] w-full h-[100%] bg-[#222129] resize-none"
                    placeholder="Thêm đánh giá"
                  ></textarea>
                </div>
                <button
                  type="button"
                  className="mt-[15px] border-[2px] border-[#f9ab00] hover:bg-[#f2d19480] text-white p-2 rounded-lg w-[140px] h-[45px]"
                >
                  Gửi
                </button>
              </form>
            </div>
          )}
        </div>
        <div className="md:w-[35%] w-[100%] md:h-[1300px] h-[950px] p-2 ">
          <div className="md:text-[36px] text-[26px] text-left">
            Bạn cũng có thể thích...
          </div>
          <div className="w-full flex flex-wrap gap-[30px] justify-center">
            {data.map((item) => (
              <MovieItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const RenderMovieDetals = () => {
  return (
    <div className="bg-[#1a191f] text-white w-full border-b border-gray-600 box-border">
      <div className="w-full md:px-[8%] px-[4%] py-[70px] border-b border-gray-600 box-border">
        {/* Sau này render tên phim từ database */}
        <div className="w-full text-[40px] text-left">{movie.title}</div>

        <div className="w-full md:h-[400px] h-full md:flex gap-[25px]">
          {/* Render thông tin phim */}
          <div className="md:w-[49%] w-[100%] h-full md:flex justify-between mt-[20px]">
            <div className="md:w-[40%] w-[100%] h-full">
              <div className="relative w-full h-full md:flex items-center group justify-center">
                {/* Phần ảnh */}
                <div className="w-full h-full rounded-[8px] relative hover:bg-black hover:bg-opacity-10">
                  <img
                    src={movie.coverImage}
                    alt={movie.title}
                    className="w-full rounded-[8px] object-cover"
                  />
                </div>

                {/* Phần rating */}
                <div className="absolute left-0 flex items-center md:px-[15px] px-[8px] md:top-[20px] top-[10px] z-20">
                  <p className="rounded-full md:w-[35px] md:h-[35px]  w-[18px] h-[18px] md:text-[14px] text-[10px] border-2 border-green-500 flex justify-center items-center text-white font-bold bg-[rgba(23,20,20,0.5)]">
                    {movie.rating}
                  </p>
                </div>

                {/* Phần bookmark button */}
                <div className="absolute right-0 flex items-center md:px-[15px] px-[8px] md:top-[20px] top-[10px] opacity-100 pointer-events-auto z-20">
                  <button className="md:w-[36px] md:h-[36px] w-[18px] h-[18px] text-white font-bold text-[16px] flex justify-center items-center bg-black rounded-[8px]">
                    <Icons.Home.bookmark />
                  </button>
                </div>
              </div>
            </div>

            {/* Phần thông tin */}
            <div className="md:w-[55%] w-[100%] text-left text-[16px]">
              <div className="w-full flex gap-2">
                <div className="text-[#f9ab00]">Giám đốc: </div>
                {movie.director}
              </div>
              <div className="w-full flex">
                <div className="text-[#f9ab00] w-[22%]">Diễn viên: </div>
                <div className="flex w-[78%] flex-wrap gap-2">
                  {movie.cast.map((item, index) => {
                    return (
                      <div key={index}>
                        {item}
                        {index !== movie.cast.length - 1 && ", "}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="w-full flex justify-start">
                <div className="text-[#f9ab00] w-[22%]">Thể loại: </div>
                <div className="flex w-[78%] flex-wrap gap-2">
                  {movie.genres.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className=" text-[#f9ab00] hover:underline hover:decoration-[0.5px] cursor-pointer"
                      >
                        {item}
                        {index !== movie.genres.length - 1 && ", "}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="w-full flex">
                <div className="text-[#f9ab00] w-[22%]">Ra mắt: </div>
                <div>{movie.releaseYear}</div>
              </div>
              <div className="w-full flex">
                <div className="text-[#f9ab00] w-[22%]">Thời gian: </div>
                <div>{movie.runtime}</div>
              </div>
              <div className="w-full flex">
                <div className="text-[#f9ab00] w-[22%]">Quốc gia: </div>
                <div>{movie.country}</div>
              </div>

              <div className="w-[340px] h-[160px] overflow-y-auto mt-[20px] p-4 pr-1 text-justify custom-scrollbar shadow-[1000px] bg-[#222129] rounded-[12px]">
                {movie.description}
              </div>
            </div>
          </div>

          {/* Render video phim */}
          <div className="md:w-[49%] w-[100%] md:h-full h-[250px] md:p-4 p-0 md:mt-0 mt-4">
            <VideoPlayer nameFile={movie.videoLink} />
          </div>
        </div>
      </div>
      <div className="w-full pt-[20px] border-b border-gray-600 box-border">
        <div className="md:px-[8%] px-[4%] text-[36px] text-left">
          Phát hiện
        </div>
        <TabMenu />
      </div>
    </div>
  );
};

const MovieDetails = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-full h-[80px]">
        <Navbar />
      </div>
      <div className="w-full mt-[80px]">
        <RenderMovieDetals />
      </div>
      <div className="w-full md:h-[85px] h-[300px]">
        <Footer />
      </div>
    </div>
  );
};

export default MovieDetails;
