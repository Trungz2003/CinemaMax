import React, { useState, useRef, useEffect } from "react";
import { IoSettingsOutline } from "react-icons/io5";

const VideoPlayer = ({ nameFile }) => {
  const [resolution, setResolution] = useState("720p"); // Độ phân giải mặc định
  const [showSettings, setShowSettings] = useState(false); // Hiển thị menu cài đặt
  const [isFullscreen, setIsFullscreen] = useState(false); // Trạng thái fullscreen
  const [videoTime, setVideoTime] = useState(0); // Thời gian video đã phát
  const [hasPrinted, setHasPrinted] = useState(false); // Kiểm tra đã in +1 hay chưa
  const videoRef = useRef(null); // Tham chiếu tới phần tử video
  const settingsRef = useRef(null); // Tham chiếu tới menu cài đặt
  const settingsIconRef = useRef(null); // Tham chiếu tới icon cài đặt

  // Các URL Cloudinary tương ứng với các độ phân giải
  const videoSources = {
    "360p": `https://res.cloudinary.com/dqnncyd7t/video/upload/c_scale,w_640/${nameFile}`,
    "480p": `https://res.cloudinary.com/dqnncyd7t/video/upload/c_scale,w_854/${nameFile}`,
    "720p": `https://res.cloudinary.com/dqnncyd7t/video/upload/c_scale,w_1280/${nameFile}`,
    "1080p": `https://res.cloudinary.com/dqnncyd7t/video/upload/c_scale,w_1920/${nameFile}`,
  };

  const handleChangeResolution = (event) => {
    setResolution(event.target.value); // Cập nhật độ phân giải
    if (videoRef.current) {
      videoRef.current.src = videoSources[event.target.value];
      videoRef.current.load(); // Tải lại video với nguồn mới
    }
    setShowSettings(false); // Ẩn menu sau khi chọn độ phân giải
  };

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target) &&
        !settingsIconRef.current.contains(event.target) // Kiểm tra nếu click ngoài menu và ngoài icon
      ) {
        setShowSettings(false); // Đóng menu
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Hàm xử lý sự kiện nhấn phím
  const handleKeyPress = (event) => {
    if (event.key === "f" || event.key === "F") {
      const videoElement = videoRef.current;
      if (document.fullscreenElement) {
        document.exitFullscreen(); // Nếu đang ở chế độ full màn hình, thoát ra
      } else {
        videoElement.requestFullscreen(); // Nếu không ở full màn hình, vào chế độ full màn hình
      }
    }
  };

  // Dùng useEffect để thêm và xóa sự kiện khi nhấn phím F
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  // Hàm kiểm tra thời gian video và in +1 chỉ một lần
  const handleTimeUpdate = () => {
    const currentTime = videoRef.current.currentTime; // Lấy thời gian video đã phát
    setVideoTime(currentTime); // Cập nhật state với thời gian hiện tại

    // Nếu video đã phát quá 30 giây và chưa in +1
    if (currentTime > 30 && !hasPrinted) {
      console.log("+1");
      setHasPrinted(true); // Đánh dấu đã in +1
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Video phát */}
      <div className="relative w-full h-full group">
        {" "}
        {/* Thêm lớp group cho việc hover */}
        <video
          ref={videoRef}
          controls
          className="w-full absolute z-0"
          src={videoSources[resolution]}
          controlsList="nodownload"
          onContextMenu={(e) => e.preventDefault()}
          onTimeUpdate={handleTimeUpdate}
        ></video>
        {/* Icon cài đặt */}
        <div
          ref={settingsIconRef}
          className="absolute top-[10px] right-[10px] cursor-pointer text-white z-[1] opacity-0 group-hover:opacity-100 transition-opacity duration-300" // Ẩn icon khi không hover, hiện khi hover
          onClick={() => setShowSettings((prev) => !prev)}
        >
          <IoSettingsOutline size={20} />
        </div>
        {/* Menu chọn độ phân giải */}
        {showSettings && (
          <div
            ref={settingsRef}
            className={`resolution-menu ${
              isFullscreen ? "fullscreen-menu" : ""
            }`}
          >
            <label htmlFor="resolution-select">Chọn độ phân giải:</label>
            <select
              id="resolution-select"
              value={resolution}
              onChange={handleChangeResolution}
              className="resolution-dropdown"
            >
              <option value="360p">360p</option>
              <option value="480p">480p</option>
              <option value="720p">720p</option>
              <option value="1080p">1080p</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
