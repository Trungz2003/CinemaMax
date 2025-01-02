import React from "react";
import { LuFacebook } from "react-icons/lu";
import { TbBrandGoogle } from "react-icons/tb";
import { IoSearchSharp } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { GoDot } from "react-icons/go";
import { TbBookmark } from "react-icons/tb";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { FaRegCheckCircle } from "react-icons/fa";
import { BiMinusCircle } from "react-icons/bi";
import { FaArrowUp } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { MdClear } from "react-icons/md";
import { BiFilterAlt } from "react-icons/bi";
import { FaBars } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { TbBadgeHd } from "react-icons/tb";

import { TbMovie } from "react-icons/tb";
import { LuTv } from "react-icons/lu";
import { TbTicket } from "react-icons/tb";
import { FaChromecast } from "react-icons/fa";
import { TbLanguage } from "react-icons/tb";
import { IoAddOutline } from "react-icons/io5";
import { FiMinus } from "react-icons/fi";

import { IoPersonOutline } from "react-icons/io5";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";

import { FaRegCreditCard } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { IoIosStarHalf } from "react-icons/io";
import { LuRefreshCcw } from "react-icons/lu";
import { TiStarOutline } from "react-icons/ti";
import { TbLogout } from "react-icons/tb";

import { IoImagesOutline } from "react-icons/io5";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

import { LuLayoutGrid } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { TfiCommentAlt } from "react-icons/tfi";
import { MdOutlineSettings } from "react-icons/md";

import { TbDiamond } from "react-icons/tb";
import { LuTrophy } from "react-icons/lu";

import { MdLockOutline } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { BsTrash3 } from "react-icons/bs";

import { LuVideo } from "react-icons/lu";

const Icons = {
  Login: {
    facebook: LuFacebook,
    google: TbBrandGoogle,
  },
  Navbar: {
    search: IoSearchSharp,
    down: FaAngleDown,
    account: MdAccountCircle,
    close: MdClear,
    bar: FaBars,
  },
  Home: {
    left: FaChevronLeft,
    right: FaChevronRight,
    dotBlack: GoDot,
    dotWhite: GoDotFill,
    down: FaAngleDown,
    bookmark: TbBookmark,
    playFilled: TbPlayerPlayFilled,
    filter: BiFilterAlt,
    close: MdClear,
  },
  MoviePlans: {
    circleCheck: FaRegCheckCircle,
    cricleMinus: BiMinusCircle,
  },
  Footer: {
    up: FaArrowUp,
  },
  About: {
    right: FaArrowRightLong,
    hd: TbBadgeHd,
    movie: TbMovie,
    tv: LuTv,
    ticket: TbTicket,
    cast: FaChromecast,
    language: TbLanguage,
  },

  Faq: {
    add: IoAddOutline,
    minus: FiMinus,
  },

  MovieDetails: {
    persion: IoPersonOutline,
    like: AiFillLike,
    disLike: AiFillDislike,
    down: FaAngleDown,
  },

  MyCinemaMax: {
    creditCard: FaRegCreditCard,
    comment: FaRegComment,
    starHalf: IoIosStarHalf,
    movie: TbMovie,
    refresh: LuRefreshCcw,
    star: TiStarOutline,
    logout: TbLogout,
  },

  Setting: {
    img: IoImagesOutline,
    show: BiShow,
    hide: BiHide,
  },

  Dashboard: {
    layout: LuLayoutGrid,
    movie: TbMovie,
    users: FiUsers,
    comment: TfiCommentAlt,
    star: IoIosStarHalf,
    setting: MdOutlineSettings,
    diamond: TbDiamond,
    show: BiShow,
    trophy: LuTrophy,
    refresh: LuRefreshCcw,
  },

  Catalog: {
    search: IoSearchSharp,
    left: FaChevronLeft,
    right: FaChevronRight,
    lock: MdLockOutline,
    edit: BiEdit,
    trash: BsTrash3,
  },

  AddItem: {
    video: LuVideo,
  },
};

export default Icons;
