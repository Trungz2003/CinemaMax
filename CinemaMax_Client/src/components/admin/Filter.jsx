import { useState, useRef, useEffect } from "react";
import Icons from "../../ultils/Icons";

const Filter = ({
  options,
  onSortChange,
  dropdownWidth = "200px",
  test,
  multiSelect = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Ref để theo dõi component
  const filterRef = useRef(null);

  // Khởi tạo selectedOption, mặc định là mảng rỗng nếu multiSelect
  const [selectedOption, setSelectedOption] = useState(multiSelect ? [] : null);

  const toggleDropdown = () => {
    setIsOpen((prev) => {
      if (!prev) {
        setSearchTerm(""); // Reset tìm kiếm khi mở lại dropdown
      }
      return !prev;
    });
  };

  const handleOptionSelect = (option) => {
    if (multiSelect) {
      setSelectedOption((prev) => {
        const newSelected = prev?.some((item) => item.id === option.id)
          ? prev.filter((item) => item.id !== option.id) // Bỏ chọn
          : [...prev, option]; // Thêm vào

        if (onSortChange) {
          onSortChange(newSelected);
        }

        return newSelected;
      });
    } else {
      setSelectedOption((prev) => {
        const newValue = prev?.name === option.name ? null : option; // Bỏ chọn nếu click lại
        if (onSortChange) {
          onSortChange(newValue);
        }
        setIsOpen(false); // Đóng dropdown khi chọn xong
        return newValue;
      });
    }
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const normalizeText = (text) =>
    text
      .normalize("NFD") // Chuẩn hóa Unicode
      .replace(/[\u0300-\u036f]/g, "") // Xóa dấu tiếng Việt
      .trim()
      .toLowerCase();
  const filteredOptions =
    Array.isArray(options) && options.length > 0
      ? options.filter((option) => {
          if (!option?.name) return false;
          const normalizedOptionName = normalizeText(option.name);
          const normalizedSearchTerm = normalizeText(searchTerm);
          return normalizedOptionName.includes(normalizedSearchTerm);
        })
      : [];

  const shouldShowSearchBar = options.length > 5;

  // Đóng dropdown nếu click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (multiSelect && options.length > 0 && test) {
      const selectedGenres = options.filter(
        (option) => test.split(", ").includes(option.name) // Lọc các thể loại đã chọn
      );
      setSelectedOption(selectedGenres); // Cập nhật selectedOption
    }
  }, [options, test]); // Chạy khi options hoặc test thay đổi

  return (
    <div className="relative w-full" ref={filterRef}>
      {/* Dropdown Trigger */}
      <div
        className="h-[45px] rounded-[8px] bg-[#222129] flex items-center px-4 cursor-pointer gap-[5px]"
        role="combobox"
        tabIndex="0"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
      >
        <div className="flex-1 text-white text-left">
          {multiSelect
            ? selectedOption.length > 0
              ? selectedOption.map((item) => item.name).join(", ")
              : test
            : selectedOption
            ? selectedOption.name
            : test}
        </div>

        <div className="flex items-center">
          <svg
            className={`w-2 h-2 text-white transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            viewBox="0 0 100 100"
          >
            <path
              d="M10,30 L50,70 L90,30"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
            ></path>
          </svg>
        </div>
      </div>

      {/* Dropdown Content */}
      {isOpen && (
        <div
          className="absolute bg-[#222129] mt-2 rounded-[8px] shadow-lg z-10 text-left"
          style={{ width: dropdownWidth }}
        >
          {/* Search Bar */}
          {shouldShowSearchBar && (
            <div className="px-4 py-2">
              <input
                type="text"
                className="w-full p-2 bg-[#333] text-white rounded-md focus:ring-2 focus:ring-[#f9ab00] focus:outline-none"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          )}

          {/* Options List */}
          <div className="max-h-[150px] overflow-y-auto">
            {filteredOptions.map((option, index) => (
              <div
                key={index}
                className={`px-4 py-2 cursor-pointer text-white hover:text-[#f9ab00] flex items-center justify-between ${
                  multiSelect
                    ? selectedOption?.some((item) => item.id === option.id)
                      ? "font-bold text-custom-yellow"
                      : ""
                    : selectedOption?.name === option.name
                    ? "font-bold text-custom-yellow"
                    : ""
                }`}
                onClick={() => handleOptionSelect(option)}
              >
                <div className="flex items-center">
                  {multiSelect && (
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={
                        multiSelect
                          ? selectedOption?.some(
                              (item) => item.id === option.id
                            )
                          : selectedOption?.id === option.id
                      }
                      readOnly
                    />
                  )}
                  {option.name}
                </div>

                {!multiSelect && selectedOption?.name === option.name && (
                  <span
                    className="cursor-pointer ml-2 hover:text-red-500"
                    onClick={(e) => {
                      e.stopPropagation(); // Ngăn không cho sự kiện chọn option chạy
                      handleOptionSelect(option); // Gọi lại hàm chọn option để bỏ chọn
                    }}
                  >
                    <Icons.Home.close />
                  </span>
                )}
              </div>
            ))}

            {filteredOptions.length === 0 && (
              <div className="px-4 py-2 text-gray-400">Không có kết quả</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
