export const Footer = () => {
  return (
    <div className="w-full md:h-[85px] h-full px-[8%] bg-[#1a191f] md:flex">
      <div className="w-[100%] flex items-center justify-start">
        <h1 className="font-bold md:text-[2rem] text-[26px] text-left m-0 p-0">
          <span className="text-[#faab00]">Cinema</span>
          <span className="text-white">Max</span>
        </h1>
      </div>
      <div className="w-[100%] bg-[#1a191f] text-white md:flex items-center md:gap-[40px] md:mt-0 mt-[10px] gap-[20px] md:justify-end justify-start md:pb-0 pb-[25px]">
        <p className="text-left">Giới thiệu về chúng tôi</p>
        <p className="text-left">Liên hệ</p>
        <p className="text-left">Chính sách bảo mật</p>
      </div>
    </div>
  );
};
