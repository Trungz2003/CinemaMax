import React, { useState, useRef, useEffect } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { checkVideoAccess } from "../../apis/client/MovieDetails";
import { useNavigate } from "react-router-dom";
import { ShowToast } from "../../ultils/ToastUtils";
import path from "../../ultils/Path";

const VideoPlayer = ({ videoPath }) => {
  const [resolution, setResolution] = useState("360p"); // Độ phân giải mặc định
  const [showSettings, setShowSettings] = useState(false); // Hiển thị menu cài đặt
  const [isFullscreen, setIsFullscreen] = useState(false); // Trạng thái fullscreen
  const [videoTime, setVideoTime] = useState(0); // Thời gian video đã phát
  const [hasPrinted, setHasPrinted] = useState(false); // Kiểm tra đã in +1 hay chưa
  const videoRef = useRef(null); // Tham chiếu tới phần tử video
  const settingsRef = useRef(null); // Tham chiếu tới menu cài đặt
  const settingsIconRef = useRef(null); // Tham chiếu tới icon cài đặt
  const [userSubscription, setUserSubscription] = useState("");
  const [resolutionOptions, setResolutionOptions] = useState([]);
  const [statusVideo, setStatus] = useState(0);

  const navigate = useNavigate();

  const videoSources = {
    "360p": videoPath.replace("/upload/", "/upload/c_scale,w_640/"),
    "480p": videoPath.replace("/upload/", "/upload/c_scale,w_854/"),
    "720p": videoPath.replace("/upload/", "/upload/c_scale,w_1280/"),
    "1080p": videoPath.replace("/upload/", "/upload/c_scale,w_1920/"),
    "1440p": videoPath.replace("/upload/", "/upload/c_scale,w_2560/"),
  };

  const [duration, setDuration] = useState(0);

  const handleMetadataLoaded = () => {
    if (videoRef.current) {
      setTimeout(() => {
        const videoDuration = videoRef.current.duration;
        console.log("Final Total Duration:", videoDuration);
        if (videoDuration > 0) setDuration(videoDuration);
      }, 5000);
    }
  };

  const playVideo = async (event) => {
    try {
      if (statusVideo === 401) {
        ShowToast("error", "Vui lòng đăng nhập để thưởng thức phim!");
        navigate(path.LOGIN);
        return;
      } else if (statusVideo === 403) {
        ShowToast("error", "Vui lòng đăng nhập để thưởng thức phim!");
        navigate(path.PRICING);
        return null;
      }
    } catch (error) {
      event.target.pause();
      console.log(error);
    }
  };

  useEffect(() => {
    const handleCheckVideoAccess = async (event) => {
      try {
        const response = await checkVideoAccess(); // Không truyền navigate
        if (response && response.code === 0) {
          const subscriptionName = response.result.subscriptions.name;
          setUserSubscription(subscriptionName);

          let availableResolutions = ["360p", "480p"];
          if (subscriptionName === "Premium") {
            availableResolutions = ["360p", "480p", "720p", "1080p"];
          } else if (subscriptionName === "Cinematic") {
            availableResolutions = ["360p", "480p", "720p", "1080p", "1440p"];
          }
          setResolutionOptions(availableResolutions);
        } else {
          setStatus(response.code);
        }
      } catch (error) {
        event.target.pause();
        console.log(error);
      }
    };

    handleCheckVideoAccess();
  }, []); // Chạy một lần khi component mount

  const handleChangeResolution = async (event) => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const newResolution = event.target.value;

      videoRef.current.src = videoSources[newResolution];
      await videoRef.current.load(); // Chờ video load xong

      videoRef.current.onloadedmetadata = () => {
        videoRef.current.currentTime = currentTime; // Giữ nguyên thời gian
        setDuration(videoRef.current.duration);
      };
    }
    setResolution(event.target.value);
    setShowSettings(false);
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

  useEffect(() => {
    console.log("Video Path:", videoPath);
  }, [videoPath]);

  useEffect(() => {
    const preloadMetadata = async () => {
      for (const res of Object.keys(videoSources)) {
        const video = document.createElement("video");
        video.src = videoSources[res];
        video.preload = "metadata"; // Chỉ tải metadata, không tải toàn bộ video
      }
    };
    preloadMetadata();
  }, []);

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
          onLoadedMetadata={handleMetadataLoaded} // Gọi khi video load xong metadata
          onPlay={playVideo} // Kiểm tra quyền khi ấn play
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
              {resolutionOptions.map((res) => (
                <option key={res} value={res}>
                  {res}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
