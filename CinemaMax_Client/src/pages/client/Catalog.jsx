import React from "react";
import Navbar from "../../components/client/Navbar";
import { Footer } from "../../components/client/Footer";
import PageTitle from "../../components/client/PageTitle";
import { FilterBar } from "../../components/client/FilterBar";
import RenderListMovie from "../../components/client/RenderListMovie";
import ExpectedPremiere from "../../components/client/ExpectedPremiere";

const fakeData = [
  {
    id: 1,
    title: "I Dream in Another Language",
    rating: 9.2,
    categories: ["Hoạt động", "Giật gân"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 2,
    title: "The Silent Voice",
    rating: 8.7,
    categories: ["Hoạt hình", "Tình cảm"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 3,
    title: "Interstellar",
    rating: 9.5,
    categories: ["Khoa học", "Phiêu lưu"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 4,
    title: "Parasite",
    rating: 8.6,
    categories: ["Tâm lý", "Giật gân"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 5,
    title: "The Dark Knight",
    rating: 9.0,
    categories: ["Hành động", "Tội phạm"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 6,
    title: "Inception",
    rating: 8.8,
    categories: ["Khoa học", "Giật gân"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 7,
    title: "The Matrix",
    rating: 9.3,
    categories: ["Khoa học", "Hành động"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 8,
    title: "Coco",
    rating: 8.4,
    categories: ["Gia đình", "Hoạt hình"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 9,
    title: "Avatar",
    rating: 8.2,
    categories: ["Phiêu lưu", "Khoa học"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 10,
    title: "Spirited Away",
    rating: 9.1,
    categories: ["Hoạt hình", "Phiêu lưu"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 11,
    title: "The Godfather",
    rating: 9.2,
    categories: ["Tội phạm", "Tâm lý"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 12,
    title: "The Shawshank Redemption",
    rating: 9.7,
    categories: ["Tâm lý", "Cổ điển"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 13,
    title: "Pulp Fiction",
    rating: 9.0,
    categories: ["Tội phạm", "Tâm lý"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 14,
    title: "The Lion King",
    rating: 8.5,
    categories: ["Gia đình", "Hoạt hình"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 15,
    title: "Frozen",
    rating: 8.0,
    categories: ["Hoạt hình", "Gia đình"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 16,
    title: "Whiplash",
    rating: 8.9,
    categories: ["Tâm lý", "Âm nhạc"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 17,
    title: "Avengers: Endgame",
    rating: 8.4,
    categories: ["Hành động", "Phiêu lưu"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 18,
    title: "Joker",
    rating: 8.6,
    categories: ["Tâm lý", "Tội phạm"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 19,
    title: "Toy Story 4",
    rating: 8.3,
    categories: ["Gia đình", "Hoạt hình"],
    image: "src/assets/test/cover.png",
  },
  {
    id: 20,
    title: "Black Panther",
    rating: 8.2,
    categories: ["Hành động", "Khoa học"],
    image: "src/assets/test/cover.png",
  },
];

const RenderCatalog = () => {
  return (
    <div className="bg-[#1a191f] text-white w-full border-b border-gray-600 box-border">
      <PageTitle title="Danh mục" />
      <FilterBar />
      <div className="w-full h-full md:pt-[70px] pt-[40px] border-b border-gray-600 box-border">
        <RenderListMovie data={fakeData} />
      </div>
      <ExpectedPremiere data={fakeData} />
    </div>
  );
};

const Catalog = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-full h-[80px]">
        <Navbar />
      </div>
      <div className="w-full mt-[80px]">
        <RenderCatalog />
      </div>
      <div className="w-full md:h-[85px] h-[300px]">
        <Footer />
      </div>
    </div>
  );
};

export default Catalog;
