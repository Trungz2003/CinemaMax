import Navbar from "../../components/client/Navbar";
import { Footer } from "../../components/client/Footer";
import Icons from "../../ultils/Icons";
import React, { useState, useEffect, useRef } from "react";
import MovieItem from "../../components/client/MovieItem";
import VideoPlayer from "../../components/client/VideoPlayer";
import {
  getMovieSuggest,
  getCommentMovie,
  updateReaction,
  addCommentByMovie,
  getRatingMovie,
} from "../../apis/client/MovieDetails";
import { ShowToast } from "../../ultils/ToastUtils";
import { useParams, useNavigate } from "react-router-dom";
import defaultAvatar from "../../assets/img_user/img_user_not_avata.png";

const TabMenu = () => {
  const { id } = useParams(); // Lấy id từ URL
  const navigate = useNavigate();

  const tabs = ["BÌNH LUẬN", "ĐÁNH GIÁ"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [movieData, setMoviDate] = useState([]);

  const [dataComment, setDataComment] = useState([]);
  const [dataRating, setDataRating] = useState([]);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Trạng thái dropdown
  const [selectedRating, setSelectedRating] = useState(""); // Trạng thái giá trị được chọn
  const dropdownRef = useRef(null); // Tham chiếu đến container chứa dropdown
  const [currentPageMovie, setCurrentPageMovie] = useState(1);
  const [currentPageRating, setCurrentPageRating] = useState(1);
  const limitPerPage = 5; // ✅ Số bình luận mỗi trang
  const [commentText, setCommentText] = useState("");

  // ✅ Tính tổng số trang dựa trên tổng số bình luận
  const totalPagesMovie = Math.ceil(dataComment.length / limitPerPage);

  // ✅ Lấy danh sách bình luận cho trang hiện tại
  const paginatedComments = dataComment.slice(
    (currentPageMovie - 1) * limitPerPage,
    currentPageMovie * limitPerPage
  );

  // ✅ Tính tổng số trang dựa trên tổng số bình luận
  const totalPagesRating = Math.ceil(dataRating.length / limitPerPage);

  // ✅ Lấy danh sách bình luận cho trang hiện tại
  const paginatedRating = dataRating.slice(
    (currentPageRating - 1) * limitPerPage,
    currentPageRating * limitPerPage
  );

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    // Nếu click bên ngoài dropdown, đóng dropdown
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };

  const handleReaction = async (commentId, reactionType) => {
    try {
      setDataComment((prev) =>
        prev.map((comment) => {
          if (comment.commentId !== commentId) return comment;

          let likeChange = 0;
          let dislikeChange = 0;

          if (reactionType === "LIKE") {
            if (comment.userReaction === "LIKE") {
              likeChange = -1; // Hủy like
            } else if (comment.userReaction === "DISLIKE") {
              likeChange = 1; // Đổi từ dislike sang like
              dislikeChange = -1;
            } else {
              likeChange = 1; // Bình thường bấm like
            }
          } else if (reactionType === "DISLIKE") {
            if (comment.userReaction === "DISLIKE") {
              dislikeChange = -1; // Hủy dislike
            } else if (comment.userReaction === "LIKE") {
              dislikeChange = 1; // Đổi từ like sang dislike
              likeChange = -1;
            } else {
              dislikeChange = 1; // Bình thường bấm dislike
            }
          }

          return {
            ...comment,
            userReaction:
              comment.userReaction === reactionType ? "NONE" : reactionType,
            likeCount: comment.likeCount + likeChange,
            dislikeCount: comment.dislikeCount + dislikeChange,
          };
        })
      );

      // Gửi API (vẫn giữ nguyên reactionType)
      const response = await updateReaction(commentId, reactionType, navigate);

      if (response?.code !== 0) {
        console.error("API update reaction failed:", response);
      }
    } catch (error) {
      console.error("Error in handleReaction:", error);
    }
  };

  const handleAddComment = async (content) => {
    try {
      if (!commentText.trim()) {
        ShowToast("error", "Vui lòng nhập bình luận!");
        return;
      }
      const response = await addCommentByMovie(id, content, navigate);

      if (response.code === 0) {
        setDataComment((prev) => [...prev, response.result]); // ✅ Thêm vào cuối mảng
        ShowToast("success", "Thêm bình luận thành công!");
        setCommentText("");
      }
    } catch (error) {
      console.log(error);
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

  const fetchDataMovie = async () => {
    try {
      const response = await getCommentMovie(id);
      console.log("Comment response:", response); // Debug API response

      if (response.code === 0) {
        setDataComment(response.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataRating = async () => {
    try {
      const response = await getRatingMovie(id);
      console.log("rating: ", response);
      if (response.code === 0) {
        setDataRating(response.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllMovie = async () => {
    try {
      const response = await getMovieSuggest();
      if (response.code === 0) {
        setMoviDate(response.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllMovie();
    fetchDataMovie();
    fetchDataRating();
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
                {paginatedComments.map((comment) => {
                  return (
                    <li className="mb-5" key={comment.commentId}>
                      <div className="flex items-center space-x-2">
                        <div className="w-[35px] h-[35px] rounded-[8px] bg-[#212026] flex justify-center items-center">
                          <img
                            src={comment.userAvatar || defaultAvatar}
                            alt="User Avatar"
                            className="w-[100%] object-cover rounded-[8px] h-full"
                          />
                        </div>
                        <div className="text-left ml-[10px]">
                          <div className="text-[16px] font-semibold">
                            {comment.userName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {comment.createdAt}
                          </div>
                        </div>
                      </div>
                      <div className="mt-[16px]">
                        <p className="text-sm text-left py-[20px] px-[30px] rounded-t-[8px] border border-gray-800">
                          {comment.content}
                        </p>
                        <div className="flex justify-between items-center px-[30px] py-[15px] rounded-b-[8px] border border-gray-800">
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                handleReaction(comment.commentId, "LIKE")
                              }
                              className={`text-sm flex items-center ${
                                comment.userReaction === "LIKE"
                                  ? "text-blue-500"
                                  : "text-gray-500"
                              }`}
                            >
                              <i className="mr-1">
                                <Icons.MovieDetails.like />
                              </i>
                              {comment?.likeCount ?? 0}{" "}
                              {/* ✅ Tránh lỗi nếu comment chưa có dữ liệu */}
                            </button>

                            <button
                              onClick={() =>
                                handleReaction(comment.commentId, "DISLIKE")
                              }
                              className={`text-sm flex items-center ${
                                comment.userReaction === "DISLIKE"
                                  ? "text-red-500"
                                  : "text-gray-500"
                              }`}
                            >
                              <i className="mr-1">
                                <Icons.MovieDetails.disLike />
                              </i>
                              {comment?.dislikeCount ?? 0}{" "}
                              {/* ✅ Tránh lỗi nếu comment chưa có dữ liệu */}
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
                <span className="text-sm">
                  Trang {currentPageMovie} / {totalPagesMovie}
                </span>
                <div className="flex gap-4">
                  <button
                    className="text-sm flex items-center cursor-pointer hover:text-[#f9ab00]"
                    onClick={() =>
                      setCurrentPageMovie((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPageMovie === 1}
                  >
                    <i className="ti ti-chevron-left mr-1"></i> Trước
                  </button>
                  <button
                    className="text-sm flex items-center cursor-pointer hover:text-[#f9ab00]"
                    onClick={() =>
                      setCurrentPageMovie((prev) =>
                        Math.min(prev + 1, totalPagesMovie)
                      )
                    }
                    disabled={currentPageMovie === totalPagesMovie}
                  >
                    Kế tiếp <i className="ti ti-chevron-right ml-1"></i>
                  </button>
                </div>
              </div>

              <div className="mt-4 w-[100%] h-[295px] border rounded-[8px] border-gray-800">
                <div className="rounded-[8px] p-[30px] h-[70%]">
                  <textarea
                    id="text"
                    name="text"
                    className="p-[15px] rounded-[8px] w-full h-[100%] bg-[#222129] resize-none"
                    placeholder="Thêm bình luận"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key.toLowerCase() === "f") e.stopPropagation(); // Chặn sự kiện full screen
                    }}
                  ></textarea>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddComment(commentText)}
                  className="mt-[15px] border-[2px] border-[#f9ab00] hover:bg-[#f2d19480] text-white p-2 rounded-lg w-[140px] h-[45px]"
                >
                  Gửi
                </button>
              </div>
            </div>
          )}

          {activeTab === "ĐÁNH GIÁ" && (
            <div className="mt-5 rounded-lg shadow-lg">
              <ul>
                {paginatedRating.map((review, index) => (
                  <li className="mb-5" key={index}>
                    <div className=" flex items-center space-x-2">
                      <div className="w-[85%] flex">
                        <div className="w-[35px] h-[35px] rounded-[8px] bg-[#212026] flex justify-center items-center">
                          <img
                            src={review.thumbnail || defaultAvatar}
                            alt="User Avatar"
                            className="w-[100%] object-cover rounded-[8px] h-full"
                          />
                        </div>
                        <div className=" text-left ml-[10px]">
                          <div className="text-[16px] font-semibold">
                            {review.title}
                          </div>
                          <div className=" text-xs text-gray-500 flex gap-1">
                            <div>{review.createdAt}</div> {" bởi "}
                            <div>{review.userName}</div>
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
                        {review.content}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              {/* Paginator */}
              <div className="flex justify-between items-center mt-4">
                <span className="paginator-mob__pages text-sm">
                  Trang {currentPageRating} / {totalPagesRating}
                </span>
                <div className="paginator-mob__nav flex gap-4">
                  <button
                    className="text-sm flex items-center cursor-pointer hover:text-[#f9ab00]"
                    onClick={() =>
                      setCurrentPageRating((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={totalPagesRating === 1}
                  >
                    <i className="ti ti-chevron-left mr-1"></i>Trước đó
                  </button>
                  <button
                    className="text-sm flex items-center cursor-pointer hover:text-[#f9ab00]"
                    onClick={() =>
                      setCurrentPageRating((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={totalPagesRating === 1}
                  >
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
            {movieData.map((item) => (
              <MovieItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const RenderMovieDetals = () => {
  const [movie, setMovie] = useState({});
  useEffect(() => {
    const movie = localStorage.getItem("selectedMovie");
    if (movie) {
      setMovie(JSON.parse(movie));
    }
  }, []);
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
                    src={movie.thumbnail}
                    alt={movie.title}
                    className="w-full rounded-[8px] object-cover"
                  />
                </div>

                {/* Phần rating */}
                <div className="absolute left-0 flex items-center md:px-[15px] px-[8px] md:top-[20px] top-[10px] z-20">
                  <p className="rounded-full md:w-[35px] md:h-[35px]  w-[18px] h-[18px] md:text-[14px] text-[10px] border-2 border-green-500 flex justify-center items-center text-white font-bold bg-[rgba(23,20,20,0.5)]">
                    {movie.averageRating}
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
                {movie.actor}
              </div>
              <div className="w-full flex">
                <div className="text-[#f9ab00] w-[22%]">Diễn viên: </div>
                <div className="flex w-[78%] flex-wrap gap-2">{movie.cast}</div>
              </div>

              <div className="w-full flex justify-start">
                <div className="text-[#f9ab00] w-[22%]">Thể loại: </div>
                <div className="flex w-[78%] flex-wrap gap-2">
                  {movie.genres?.map((item, index, arr) => (
                    <div
                      key={index}
                      className="text-[#f9ab00] hover:underline hover:decoration-[0.5px] cursor-pointer"
                    >
                      {item.name} {index !== arr.length - 1 && ", "}
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full flex">
                <div className="text-[#f9ab00] w-[22%]">Ra mắt: </div>
                <div>{movie.releaseDate}</div>
              </div>
              <div className="w-full flex">
                <div className="text-[#f9ab00] w-[22%]">Thời gian: </div>
                <div>{movie.duration}</div>
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
            {/* <VideoPlayer videoPath={movie.videoUrl} /> */}
            {movie?.videoUrl ? (
              <VideoPlayer videoPath={movie.videoUrl} />
            ) : (
              <p className="text-red-500">Video không khả dụng</p>
            )}
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
