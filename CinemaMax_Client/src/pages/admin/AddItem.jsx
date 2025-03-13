import React, { useEffect } from "react";
import Navbar from "../../components/admin/Navbar";
import Icons from "../../ultils/Icons";
import { useState } from "react";
import {
  getGenres,
  getDataCountry,
  saveMovie,
  getMovieById,
  updateMovieById,
} from "../../apis/server/AddItem";
import { ShowToast } from "../../ultils/ToastUtils";
import { uploadFile } from "../../cloudinary/upload";
import Filter from "../../components/admin/Filter";
import { useParams } from "react-router-dom";

const RenderAddItem = () => {
  const [title, setTitle] = useState(""); // State lưu tên phim
  const [isUploading, setIsUploading] = useState(false); // Trạng thái tải lên
  const [countries, setCountries] = useState([]); // Lưu dữ liệu tên quốc gia được chọn
  const [description, setDescription] = useState(""); // Lưu mô tả của phim
  const [actor, setActor] = useState(""); // Lưu danh sách các diễn viên
  const [cast, setCast] = useState(""); // Lưu tên các tác giả
  const [releaseDate, setReleaseDate] = useState(""); // Lưu ngày công chiếu
  const [duration, setDuration] = useState(""); // Lưu thời gian chạy
  const [genres, setGenres] = useState([]);
  // Lưu dữ liệu tên thể loại
  const [genresRender, setGenresRender] = useState([]);
  const [isFetching, setIsFetching] = useState(false); // Cờ kiểm tra để tránh gọi lại
  const [countriesRender, setCountriesRender] = useState([]); // Lưu dữ liệu tên quốc gia

  const [image, setImage] = useState(null); // Lưu url ảnh tải lên
  const [video, setVideo] = useState(null); // Lưu url video tải lên
  const { id } = useParams();
  const fetchDataCountry = async () => {
    try {
      let dataCountry = await getDataCountry();
      // Lưu dữ liệu vào state
      setCountriesRender(
        dataCountry.map((country) => ({ name: country.name }))
      );
      console.log(countriesRender);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataGenres = async () => {
    if (!isFetching) {
      setIsFetching(true); // Đánh dấu là đang fetch dữ liệu

      try {
        let dataGenres = await getGenres();

        if (dataGenres) {
          // Nếu dataGenres.result là một mảng thể loại, bạn có thể duyệt qua từng phần tử và lấy tên
          let dataGenres = await getGenres();

          if (dataGenres) {
            // Lưu toàn bộ đối tượng { id, name } thay vì chỉ lưu name
            setGenresRender(dataGenres);
          } else {
            console.error("Không có dữ liệu thể loại.");
          }
        } else {
          console.error("Không có dữ liệu thể loại.");
        }
      } catch (error) {
        console.error("Đã xảy ra lỗi khi lấy dữ liệu thể loại: ", error);
      }
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value); // Cập nhật tên phim khi người dùng nhập
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value); // Cập nhật tên phim khi người dùng nhập
  };

  const handleActorChange = (event) => {
    setActor(event.target.value); // Cập nhật tên phim khi người dùng nhập
  };

  const handleCastChange = (event) => {
    setCast(event.target.value); // Cập nhật tên phim khi người dùng nhập
  };

  const handleCountriesChange = (selectedCountries) => {
    setCountries(selectedCountries); // Cập nhật tên phim khi người dùng nhập
  };

  const handleGenreChange = (selectedGenres) => {
    setGenres(selectedGenres);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handelReleaseDateChange = (event) => {
    setReleaseDate(event.target.value);
  };

  const handleImageChange = async (event) => {
    if (title === "" || title === null) {
      ShowToast("error", "Chưa nhập đầy đủ các thông tin trên!");
      return;
    }
    const file = event.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    setIsUploading(true); // Bắt đầu quá trình tải lên

    try {
      const data = await uploadFile(file, "image", `StreamPhim/image/${title}`); // Upload ảnh vào folder động
      setIsUploading(false); // Bắt đầu quá trình tải lên
      setImage(data.secure_url);
      console.log("Ảnh đã upload:", data.secure_url);
    } catch (error) {
      console.error("Lỗi upload ảnh:", error);
    }
  };

  // Xử lý chọn video và lấy tên folder
  const handleVideoChange = async (event) => {
    if (title === "") {
      ShowToast("error", "Chưa nhập đầy đủ các thông tin trên!");
      return;
    }

    const file = event.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    setIsUploading(true); // Bắt đầu quá trình tải lên

    try {
      const data = await uploadFile(
        file,
        "video",
        `StreamPhim/movies/${title}`
      );
      setIsUploading(false); // Kết thúc quá trình tải lên
      setVideo(data.secure_url);
      console.log("Video uploaded:", data.secure_url);
    } catch (error) {
      console.error("Lỗi upload video:", error);
    }
  };

  useEffect(() => {
    fetchDataCountry();
  }, []);

  useEffect(() => {
    console.log("Genres cập nhật:", genres);
  }, [genres]);

  useEffect(() => {
    console.log("Countries cập nhật:", countries);
  }, [countries]);

  const handleSaveMovie = async () => {
    if (
      !title.trim() ||
      !image ||
      !video ||
      !description.trim() ||
      !releaseDate ||
      !duration ||
      !actor.trim() ||
      !cast.trim() ||
      (!countries && !countries?.name) ||
      !genres?.length
    ) {
      ShowToast("error", "Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (id && id > 0) {
      const movieData = {
        title,
        description,
        releaseDate,
        duration,
        videoUrl: video, // URL video đã tải lên
        thumbnail: image, // URL ảnh đã tải lên
        actor,
        cast,
        country: countries && countries.name ? countries.name : "",
        genres, // Danh sách thể loại đã chọn
      };
      // Nếu movieId hợp lệ thì gọi API update
      try {
        const response = await updateMovieById(id, movieData);
        if (response.code === 0) {
          ShowToast("success", "Cập nhật phim thành công!");
        } else {
          ShowToast("error", "Không thể cập nhật phim!");
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật phim:", error);
      }
    } else {
      const movieData = {
        title,
        description,
        releaseDate,
        duration,
        videoUrl: video, // URL video đã tải lên
        thumbnail: image, // URL ảnh đã tải lên
        actor,
        cast,
        country: countries.name,
        status: "PRIVATE",
        view: 0,
        genres, // Danh sách thể loại đã chọn
      };
      // Nếu không có movieId hợp lệ thì gọi API save (thêm mới phim)
      try {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
        const response = await saveMovie(token, movieData);
        if (response.code === 0) {
          ShowToast("success", "Thêm phim thành công!");
        } else {
          ShowToast("error", "Không thể thêm phim!");
        }
      } catch (error) {
        console.error("Lỗi khi lưu phim:", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!isNaN(id) && id > 0) {
        // Nếu ID hợp lệ -> Lấy dữ liệu từ API
        const response = await getMovieById(id);
        console.log(response);

        if (response.code === 0) {
          const movie = response.result;
          setTitle(movie.title);
          setDescription(movie.description);
          setReleaseDate(movie.releaseDate);
          setDuration(movie.duration);
          setVideo(movie.videoUrl);
          setImage(movie.thumbnail);
          setActor(movie.actor);
          setCast(movie.cast);
          setCountries({ name: movie.country });
          setGenres(movie.genres);

          console.log(countries);
        } else {
          ShowToast("error", "Không lấy được dữ liệu phim!");
        }
      }
    };

    fetchData();
  }, [id]);
  return (
    <div className="md:px-[2%] px-[4%] w-full text-[14px] mb-[40px]">
      {/* Spinner khi đang tải lên */}
      {isUploading && (
        <div className="flex justify-center items-center mt-4">
          <div className="animate-spin rounded-full border-t-4 border-blue-500 w-8 h-8"></div>
        </div>
      )}
      <div className="text-left text-[32px] w-full h-full border-b border-[#222129] box-border md:h-[80px] flex justify-start items-center">
        Thêm mục mới
      </div>
      <div className="w-full h-full border border-[#222129] rounded-[8px] mt-[30px] py-[30px] px-[30px]">
        <div className="w-full md:flex justify-between">
          <div className="md:w-[60%] w-full">
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Tiêu đề"
              value={title} // Liên kết state với input
              onChange={handleTitleChange} // Cập nhật state khi người dùng nhập
              className="block w-full h-[45px] bg-[#222129] mt-[10px] text-white rounded-[8px] py-1 pl-[20px] focus:ring-1 focus:ring-custom-yellow focus:outline-none"
            />

            <textarea
              id="Description"
              name="Description"
              type="text"
              placeholder="Miêu tả"
              value={description}
              onChange={handleDescriptionChange}
              className="block w-full h-[100px] bg-[#222129] mt-[20px] text-white rounded-[8px] py-[10px] px-[20px] focus:ring-1 focus:ring-custom-yellow focus:outline-none"
            />
            {/* Chọn ảnh */}
            <div className="w-full md:flex justify-between">
              <div
                className="w-full mt-[20px]"
                onClick={() => {
                  if (title === "" || title === null) {
                    ShowToast("error", "Chưa nhập đầy đủ các thông tin trên!");
                    return; // Nếu chưa nhập title, không mở hộp thoại chọn file
                  }
                  document.getElementById("fileInput").click(); // Nếu đã có title, mở hộp thoại chọn file
                }}
              >
                <div className="w-full h-[45px] cursor-pointer hover:border-[#f9ab00] border-[2px] border-[#222129] rounded-[8px] bg-[#222129] flex justify-between items-center px-[20px]">
                  <span className="truncate w-[80%] overflow-hidden text-ellipsis whitespace-nowrap">
                    {image ? image : "Tải lên ảnh bìa (240 x 340)"}
                  </span>
                  <div className="text-[20px]">
                    <Icons.Setting.img />
                  </div>
                </div>
                <input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>
          <div className="md:w-[38%] md:mt-0 mt-[20px]">
            <div className="w-full md:flex justify-between">
              <input
                id="actor"
                name="actor"
                type="text"
                placeholder="Nhập tên tác giả"
                value={actor}
                onChange={handleActorChange}
                className="block w-full h-[45px] bg-[#222129] md:mt-[10px] mt-[20px] text-white rounded-[8px] py-1 pl-[20px] focus:ring-1 focus:ring-custom-yellow focus:outline-none"
              />
            </div>
            <div className="w-full mt-[20px]" onClick={fetchDataGenres}>
              <Filter
                options={genresRender.map((genre) => ({
                  id: genre.id,
                  name: genre.name,
                }))}
                onSortChange={handleGenreChange}
                dropdownWidth="100%"
                test={
                  genres.length > 0
                    ? genres.map((g) => g.name).join(", ")
                    : "Chọn thể loại"
                }
                multiSelect={true}
              />
            </div>
            <div className="w-full md:flex justify-between md:mt-0 mt-[20px]">
              <input
                id="RunTime"
                name="RunTime"
                type="text"
                placeholder="Thời gian chạy"
                value={duration}
                onChange={handleDurationChange}
                className="block md:w-[49%] w-full h-[45px] bg-[#222129] mt-[10px] text-white rounded-[8px] py-1 pl-[20px] focus:ring-1 focus:ring-custom-yellow focus:outline-none"
              />
              <input
                id="PremiereDate"
                name="PremiereDate"
                type="date"
                placeholder="Ngày công chiếu"
                value={releaseDate}
                onChange={handelReleaseDateChange}
                className="block md:w-[49%] w-full h-[45px] bg-[#222129] text-white rounded-[8px] py-1 pl-[20px] md:mt-[10px] mt-[20px] focus:ring-1 focus:ring-custom-yellow focus:outline-none"
              />
            </div>
            <div className="w-full mt-[19px]">
              <Filter
                options={Array.isArray(countriesRender) ? countriesRender : []}
                onSortChange={handleCountriesChange}
                dropdownWidth="100%"
                test={
                  countries.name && countries.name.length > 0
                    ? countries.name
                    : "Quốc gia"
                }
              />
            </div>
          </div>
        </div>
        {/* Diễn viên */}
        <div className="w-full md:flex justify-between mt-[20px]">
          <input
            id="cast"
            name="cast"
            type="text"
            placeholder="Nhập tên các diễn viên(cách nhau bởi dấu ,)"
            value={cast}
            onChange={handleCastChange}
            className="block w-full h-[45px] bg-[#222129] md:mt-[10px] mt-[20px] text-white rounded-[8px] py-1 pl-[20px] focus:ring-1 focus:ring-custom-yellow focus:outline-none"
          />
        </div>
        {/* Video */}
        <div className="w-full mt-[20px]">
          <div
            className="w-full h-[45px] mt-[10px] cursor-pointer hover:border-[#f9ab00] border-[2px] border-[#222129] rounded-[8px] bg-[#222129] flex justify-between items-center px-[20px]"
            onClick={() => {
              if (title === "" || title === null) {
                ShowToast("error", "Chưa nhập đầy đủ các thông tin trên!");
                return; // Nếu chưa nhập title, không mở hộp thoại chọn file
              }
              document.getElementById("videoInput").click(); // Nếu đã có title, mở hộp thoại chọn file
            }}
          >
            <span className="truncate w-[80%] overflow-hidden text-ellipsis whitespace-nowrap">
              {video ? video : "Tải video lên"}
            </span>
            <div className="text-[20px]">
              <Icons.AddItem.video />
            </div>
          </div>
          <input
            id="videoInput"
            type="file"
            className="hidden"
            accept="video/*" // Chỉ cho phép chọn video
            onChange={handleVideoChange}
          />
        </div>

        <button
          className="w-[120px] h-[45px] rounded-[8px] border-[2px] border-[#f9ab00] text-[16px] mt-[20px]"
          type="button"
          onClick={handleSaveMovie}
        >
          Xuất bản
        </button>
      </div>
    </div>
  );
};
const AddItem = () => {
  return (
    <div className="w-full md:h-[100vh] bg-[#1a191f] text-white md:flex">
      <div className="md:w-[18%] w-full md:h-full ">
        <Navbar />
      </div>
      <div className="md:w-[82%] w-full md:h-full  md:pt-0 pt-[70px] overflow-auto">
        <RenderAddItem />
      </div>
    </div>
  );
};

export default AddItem;
