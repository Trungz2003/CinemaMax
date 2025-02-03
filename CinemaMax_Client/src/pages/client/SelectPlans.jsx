import React from "react";
import Icons from "../../ultils/Icons";
import { useState } from "react";

const premium = 39.9;
const cinematic = 49.9;

const Filter = ({ options, onSortChange, dropdownWidth = "200px", test }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState(
    test ? test : options[0]
  );

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSortChange) {
      onSortChange(option); // Gọi callback khi chọn option
    }
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const shouldShowSearchBar = options.length > 5; // Hiển thị thanh tìm kiếm nếu có hơn 5 tùy chọn

  return (
    <div className="relative w-full mt-[11px]">
      {/* Dropdown Trigger */}
      <div
        className="h-[45px] rounded-[8px] bg-[#222129] flex items-center px-4 cursor-pointer gap-[5px]"
        role="combobox"
        tabIndex="0"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
      >
        <div className="flex-1 text-white text-left">{selectedOption}</div>
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
          className="absolute bg-[#222129] w-[200px] mt-2 rounded-[8px] shadow-lg z-10 text-left "
          style={{ width: dropdownWidth }}
        >
          {/* Search Bar (Hiển thị nếu có nhiều tùy chọn) */}
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
                className={`px-4 py-2 cursor-pointer text-white hover:text-[#f9ab00] ${
                  selectedOption === option ? "font-bold text-custom" : ""
                }`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
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

const SelectPlans = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 text-white text-[14px]">
      <div className="bg-[#2E2D35] md:h-[680px] md:w-[420px] w-full px-[30px] py-[35px] rounded-lg shadow-lg relative">
        <div className="text-[24px] flex justify-between">
          <p>Chọn kế hoạch</p>
          <button className="text-[24px]" onClick={onClose}>
            <Icons.Navbar.close />
          </button>
        </div>
        <div className="mt-[20px]">
          <div className="w-full text-left">Tên</div>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Họ tên đầy đủ"
            className="block  w-full h-[45px] bg-[#222129] md:mt-[10px] mt-[20px] text-white rounded-[8px] py-1 pl-[20px] focus:ring-1 focus:ring-custom-yellow focus:outline-none"
          />
        </div>
        <div className="mt-[20px]">
          <div className="w-full text-left">Email</div>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="ví dụ@tên miền.com"
            className="block  w-full h-[45px] bg-[#222129] md:mt-[10px] mt-[20px] text-white rounded-[8px] py-1 pl-[20px] focus:ring-1 focus:ring-custom-yellow focus:outline-none"
          />
        </div>
        <div className="w-full mt-[20px]">
          <div className="w-full text-left">Chọn gói:</div>
          <Filter
            options={[`"Premium - $${premium}"`, `"Cinematic - $${cinematic}"`]}
            //onSortChange={handleSortChange}
            dropdownWidth="100%"
          />
        </div>
        <p className="mt-[20px] text-left">
          Bạn có thể chi tiền từ tài khoản của mình để gia hạn các gói dịch vụ
          được kết nối hoặc để đặt xe trên trang web của chúng tôi.
        </p>

        <div className="mt-[20px]">
          <p className="w-full text-left">Phương thức thanh toán:</p>
          <div className="flex items-center gap-2 mt-[10px]">
            <input type="checkbox" id="type3" className="hidden peer" />
            <label
              htmlFor="type3"
              className="flex items-center justify-center w-[18px] h-[18px] border-[4px] border-gray-400 rounded-[100%] cursor-pointer peer-checked:border-[#f9ab00] transition select-none"
            ></label>
            <label htmlFor="type3" className="cursor-pointer select-none">
              Paypal
            </label>
          </div>
        </div>
        <button className="w-[120px] h-[45px] rounded-[8px] border-[2px] border-[#f9ab00] text-[16px] mt-[20px]">
          Tiếp tục
        </button>
      </div>
    </div>
  );
};

export default SelectPlans;
