import React from "react";
import { LuFacebook } from "react-icons/lu";
import { TbBrandGoogle } from "react-icons/tb";
import { IoSearchSharp } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { GoDot } from "react-icons/go";

const Icons = {
  Login: {
    facebook: LuFacebook,
    google: TbBrandGoogle,
  },
  Navbar: {
    search: IoSearchSharp,
    down: FaAngleDown,
  },
  Home: {
    left: FaChevronLeft,
    right: FaChevronRight,
    dotBlack: GoDot,
    dotWhite: GoDotFill,
    down: FaAngleDown,
  },
};

export default Icons;
