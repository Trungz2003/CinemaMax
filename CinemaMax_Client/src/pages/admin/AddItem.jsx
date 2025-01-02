import React from "react";
import Navbar from "../../components/admin/Navbar";
import Icons from "../../ultils/Icons";
import { useState } from "react";

const Country = [
  "Afghanistan",
  "Quần đảo Åland",
  "Albania",
  "Algeria",
  "Samoa thuộc Mỹ",
  "Andorra",
  "Angola",
  "Anguilla",
  "Nam Cực",
  "Antigua và Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Áo",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Bỉ",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosna và Herzegovina",
  "Botswana",
  "Đảo Bouvet",
  "Brazil",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Campuchia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Quần đảo Cayman",
  "Cộng hòa Trung Phi",
  "Chad",
  "Chile",
  "Trung Quốc",
  "Colombia",
  "Comoros",
  "Congo",
  "Quần đảo Cook",
  "Costa Rica",
  "Bờ Biển Ngà",
  "Croatia",
  "Cuba",
  "Síp",
  "Cộng hòa Séc",
  "Đan Mạch",
  "Djibouti",
  "Dominica",
  "Cộng hòa Dominica",
  "Ecuador",
  "Ai Cập",
  "El Salvador",
  "Guinea Xích Đạo",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Quần đảo Faroe",
  "Fiji",
  "Phần Lan",
  "Pháp",
  "Gabon",
  "Gambia",
  "Georgia",
  "Đức",
  "Ghana",
  "Gibraltar",
  "Hy Lạp",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hồng Kông",
  "Hungary",
  "Iceland",
  "Ấn Độ",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Ý",
  "Jamaica",
  "Nhật Bản",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Hàn Quốc",
  "Kuwait",
  "Kyrgyzstan",
  "Cộng hòa Dân chủ Nhân dân Lào",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Quần đảo Marshall",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mông Cổ",
  "Montenegro",
  "Montserrat",
  "Maroc",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Hà Lan",
  "Antilles Hà Lan",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Đảo Norfolk",
  "Quần đảo Mariana phía Bắc",
  "Na Uy",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn",
  "Ba Lan",
  "Bồ Đào Nha",
  "Puerto Rico",
  "Qatar",
  "Réunion",
  "Romania",
  "Liên bang Nga",
  "Rwanda",
  "Samoa",
  "San Marino",
  "São Tomé và Príncipe",
  "Ả Rập Saudi",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Quần đảo Solomon",
  "Somalia",
  "Nam Phi",
  "Tây Ban Nha",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Thụy Điển",
  "Thụy Sĩ",
  "Cộng hòa Ả Rập Syria",
  "Đài Loan",
  "Tajikistan",
  "Tanzania",
  "Thái Lan",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad và Tobago",
  "Tunisia",
  "Thổ Nhĩ Kỳ",
  "Turkmenistan",
  "Quần đảo Turks và Caicos",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "Các Tiểu vương quốc Ả Rập Thống nhất",
  "Vương quốc Anh",
  "Hoa Kỳ",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Việt Nam",
  "Sahara Tây",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

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
                  selectedOption === option ? "font-bold" : ""
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

const RenderAddItem = () => {
  return (
    <div className="md:px-[2%] px-[4%] w-full text-[14px] mb-[40px]">
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
              className="block w-full h-[45px] bg-[#222129] mt-[10px] text-white rounded-[8px] py-1 pl-[20px] focus:ring-1 focus:ring-custom-yellow focus:outline-none"
            />

            <textarea
              id="Description"
              name="Description"
              type="text"
              placeholder="Miêu tả"
              className="block w-full h-[100px] bg-[#222129] mt-[20px] text-white rounded-[8px] py-[10px] px-[20px] focus:ring-1 focus:ring-custom-yellow focus:outline-none"
            />

            <div className="w-full md:flex justify-between">
              <div className="md:w-[49%] mt-[20px]">
                <div className="w-full h-[45px] cursor-pointer hover:border-[#f9ab00] border-[2px] border-[#222129] rounded-[8px] bg-[#222129] flex justify-between items-center px-[20px]">
                  <span>Tải lên ảnh bìa (240 x 340)</span>
                  <div className="text-[20px]">
                    <Icons.Setting.img />
                  </div>
                </div>
              </div>

              <input
                id="title"
                name="title"
                type="text"
                placeholder="Liên kết đến nền (1920x1280)"
                className="block md:w-[49%] w-full h-[45px] bg-[#222129] mt-[20px] text-white rounded-[8px] py-1 pl-[20px] focus:ring-1 focus:ring-custom-yellow focus:outline-none"
              />
            </div>
          </div>
          <div className="md:w-[38%] md:mt-0 mt-[20px]">
            <div className="w-full md:flex justify-between">
              <div className="md:w-[49%] w-full">
                <Filter
                  options={["Full HD", "HD"]} // Truyền đúng kiểu mảng
                  //onSortChange={handleSortChange}
                />
              </div>
              <input
                id="age"
                name="age"
                type="text"
                placeholder="Tuổi"
                className="block md:w-[49%] w-full h-[45px] bg-[#222129] md:mt-[10px] mt-[20px] text-white rounded-[8px] py-1 pl-[20px] focus:ring-1 focus:ring-custom-yellow focus:outline-none"
              />
            </div>
            <div className="w-full mt-[20px]">
              <Filter
                options={[
                  "Hoạt động",
                  "Hoạt hình",
                  "Hài kịch",
                  "Tội phạm",
                  "Nhịp điệu",
                  "Tưởng tượng",
                  "Lịch sử",
                  "Kinh dị",
                  "Lãng mạn",
                  "Khoa học viễn tưởng",
                  "Giật gân",
                  "Phương Tây",
                  "Khác",
                ]}
                //onSortChange={handleSortChange}
                dropdownWidth="100%"
                test="Thể loại"
              />
            </div>
            <div className="w-full md:flex justify-between md:mt-0 mt-[20px]">
              <input
                id="RunTime"
                name="RunTime"
                type="text"
                placeholder="Thời gian chạy"
                className="block md:w-[49%] w-full h-[45px] bg-[#222129] mt-[10px] text-white rounded-[8px] py-1 pl-[20px] focus:ring-1 focus:ring-custom-yellow focus:outline-none"
              />
              <input
                id="PremiereDate"
                name="PremiereDate"
                type="text"
                placeholder="Ngày công chiếu"
                className="block md:w-[49%] w-full h-[45px] bg-[#222129] text-white rounded-[8px] py-1 pl-[20px] md:mt-[10px] mt-[20px] focus:ring-1 focus:ring-custom-yellow focus:outline-none"
              />
            </div>
            <div className="w-full mt-[19px]">
              <Filter
                options={Country}
                //onSortChange={handleSortChange}
                dropdownWidth="100%"
                test="Quốc gia"
              />
            </div>
          </div>
        </div>
        <div className="w-full md:flex justify-between mt-[20px]">
          <input
            id="director"
            name="director"
            type="text"
            placeholder="Nhâp tên tác giả"
            className="block md:w-[49%] w-full h-[45px] bg-[#222129] md:mt-[10px] mt-[20px] text-white rounded-[8px] py-1 pl-[20px] focus:ring-1 focus:ring-custom-yellow focus:outline-none"
          />
          <input
            id="actor"
            name="actor"
            type="text"
            placeholder="Nhập tên các diễn viên(cách nhau bởi dấu ,)"
            className="block md:w-[49%] w-full h-[45px] bg-[#222129] md:mt-[10px] mt-[20px] text-white rounded-[8px] py-1 pl-[20px] focus:ring-1 focus:ring-custom-yellow focus:outline-none"
          />
        </div>
        <div className="w-full mt-[20px]">
          <div className="w-full h-[45px] mt-[10px] cursor-pointer hover:border-[#f9ab00] border-[2px] border-[#222129] rounded-[8px] bg-[#222129] flex justify-between items-center px-[20px]">
            <span>Tải video lên</span>
            <div className="text-[20px]">
              <Icons.AddItem.video />
            </div>
          </div>
        </div>

        <button className="w-[120px] h-[45px] rounded-[8px] border-[2px] border-[#f9ab00] text-[16px] mt-[20px]">
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
