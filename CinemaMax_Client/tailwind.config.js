/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Source Sans Pro"', "sans-serif"], // Đặt mặc định cho sans
      },
      colors: {
        "custom-yellow": "#f9ab00", // Thêm màu tùy chỉnh
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"), // Plugin để ẩn thanh cuộn
    require("tailwind-scrollbar"), // Plugin để tùy chỉnh thanh cuộn
    // Thêm các plugin khác nếu cần
  ],
};
