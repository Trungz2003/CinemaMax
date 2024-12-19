import React from "react";
import Icons from "../../ultils/Icons";

const MovieItem = ({ item }) => {
  return (
    <div className="md:w-[200px] w-[130px] md:h-[360px] h-[230px] mt-[20px]">
      <div className="relative w-full flex items-center mt-[25px] group justify-center">
        <div className="absolute left-0 flex items-center md:px-[15px] px-[8px] md:top-[20px] top-[10px] z-20">
          <p className="rounded-full md:w-[35px] md:h-[35px] w-[18px] h-[18px] md:text-[14px] text-[10px] border-2 border-green-500 flex justify-center items-center text-white font-bold bg-[rgba(23,20,20,0.5)]">
            {item.rating}
          </p>
        </div>
        <div className="absolute right-0 flex items-center md:px-[15px] px-[8px] md:top-[20px] top-[10px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto z-20">
          <button className="md:w-[36px] md:h-[36px] w-[18px] h-[18px] text-white font-bold text-[16px] flex justify-center items-center bg-black rounded-[8px]">
            <Icons.Home.bookmark />
          </button>
        </div>
        <div className="absolute flex justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto z-10">
          <div
            className="md:w-[60px] w-[40px] md:h-[60px] h-[40px] bg-white md:text-[24px] text-[15px] text-[#faab00]
              flex justify-center items-center rounded-[50%]
              md:border-[6px] border-[3px] border-solid border-[#827b7b]
              box-border hover:border-[#af9660]"
          >
            <Icons.Home.playFilled />
          </div>
        </div>
        <div className="md:w-full h-full rounded-[8px] relative hover:bg-black hover:bg-opacity-10">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full rounded-[8px] object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full rounded-[8px] bg-black bg-opacity-10 hover:bg-opacity-[0.4] transition-all z-0"></div>
        </div>
      </div>

      <div className="w-full mt-[15px]">
        <p className="w-full h-full md:text-[18px] text-[14px] text-white text-left truncate">
          {item.title}
        </p>
      </div>

      <div className="w-full text-[#f9ab00] md:text-[14px] text-[10px] flex gap-1">
        {item.categories.map((category, index) => (
          <p
            key={index}
            className="hover:underline decoration-[1px] hover:cursor-pointer"
          >
            {category}
            {index < item.categories.length - 1 && ","}
          </p>
        ))}
      </div>
    </div>
  );
};

export default MovieItem;
