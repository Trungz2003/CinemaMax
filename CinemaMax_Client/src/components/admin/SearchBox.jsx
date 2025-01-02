import React, { useState, useEffect } from "react";
import Icons from "../../ultils/Icons";

const SearchBox = ({placeholderText, onSearchQueryChange }) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Lưu lại bộ đếm thời gian để debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim() === "") {
        onSearchQueryChange(""); // Truyền chuỗi rỗng khi người dùng xóa hết
      } else {
        onSearchQueryChange(query); // Truyền query khi có nội dung tìm kiếm
      }
    }, 500); // Delay 500ms sau khi người dùng ngừng gõ

    return () => clearTimeout(timer); // Xóa timeout khi component unmount hoặc query thay đổi
  }, [query, onSearchQueryChange]);

  return (
    <div
      className={`flex items-center w-[350px] max-w-md rounded-[8px] px-4 py-2 ${
        isFocused
          ? "border-[2px] border-[#f9ab00]"
          : "border-[2px] border-[#222129]"
      }`}
    >
      <input
        type="text"
        placeholder={placeholderText}
        className="flex-1 bg-transparent border-none text-white placeholder-gray-400 outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Chỉ cập nhật query
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <div className="text-white transition-colors select-none">
        <Icons.Catalog.search />
      </div>
    </div>
  );
};

export default SearchBox;
