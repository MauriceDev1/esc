"use client";

import React from "react";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Genders from "@/data/genders"

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
    nextArrow: <CustomNextArrow onClick={function (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        throw new Error("Function not implemented.");
    } } />,
    prevArrow: <CustomPrevArrow onClick={function (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        throw new Error("Function not implemented.");
    } } />,
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
        <h2 className="p-2">
            Current Cities
        </h2>
      <ReactSlick {...settings}>
        {Genders.map(g => (
          <div className="p-2" key={g.id}>
            <div className="h-72 bg-red-500 flex items-center justify-center text-white text-lg font-bold">
              {g.name}
            </div>
          </div>
        ))}
      </ReactSlick>
    </div>
  );
};

export default TypeOfEscorts;