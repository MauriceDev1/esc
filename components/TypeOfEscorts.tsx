"use client";

import React from "react";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Genders from "@/data/genders"
import Link from "next/link";

const ReactSlick = dynamic(() => import("react-slick"), { ssr: false });

// Define the type for onClick
interface ArrowProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const CustomNextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="h-10 w-10 absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full hover:bg-gray-700 z-10 flex items-center justify-center"
  >
    ➡
  </button>
);

const CustomPrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="h-10 w-10 absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full hover:bg-gray-700 z-10 flex items-center justify-center"
  >
    ⬅
  </button>
);

const TypeOfEscorts: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow onClick={() => { /* Implement functionality here */ }} />,
    prevArrow: <CustomPrevArrow onClick={() => { /* Implement functionality here */ }} />,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="relative w-full overflow-hidden my-5">
        <h2 className="p-2 text-white">
            Genders
        </h2>
      <ReactSlick {...settings}>
        {Genders.map(g => (
          <div className="p-2" key={g.id}>
            <Link href={g.link}>
                <div className="h-72 bg-red-500 flex items-center justify-center text-white text-lg font-bold">
                    {g.name}
                </div>
            </Link>
          </div>
        ))}
      </ReactSlick>
    </div>
  );
};

export default TypeOfEscorts;