import axios from "axios";

const CLOUDINARY_BASE_URL = "https://api.cloudinary.com/v1_1/dqnncyd7t";
const UPLOAD_PRESET = "StreamPhim";

export const uploadFile = async (file, type = "image", folder = "") => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  // Cloudinary sẽ hiểu mặc định "image", nhưng nếu là video thì cần khai báo
  if (type === "video") {
    formData.append("resource_type", "video");
  }

  if (folder) formData.append("folder", folder);

  try {
    const response = await axios.post(
      `${CLOUDINARY_BASE_URL}/${type}/upload`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Lỗi upload:", error.response?.data || error.message);
    throw error;
  }
};
