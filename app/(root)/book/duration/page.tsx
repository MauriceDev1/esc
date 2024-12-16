"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

type SelectedCity = {
  city?: string;
  area?: string;
  gender?: string;
  callType?: string;
  time?: string;
  duration?: number;
};

const Duration = () => {
  const router = useRouter();
  const [hours, setHours] = useState(1); // Initial hour value

  const incrementHours = () => {
    setHours((prev) => (prev < 24 ? prev + 1 : prev));
  };

  const decrementHours = () => {
    setHours((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleSelect = () => {
    const existingData = localStorage.getItem("selectedCity");
    let cityData: SelectedCity = {};

    // Parse existing data if valid JSON
    if (existingData) {
      try {
        cityData = JSON.parse(existingData) as SelectedCity;
        if (typeof cityData !== "object" || cityData === null) {
          console.warn("Invalid data, resetting to an empty object.");
          cityData = {};
        }
      } catch (error) {
        console.error("Failed to parse localStorage data:", error);
        cityData = {};
      }
    }

    // Append or update duration
    cityData.duration = hours;

    // Save back to localStorage
    localStorage.setItem("selectedCity", JSON.stringify(cityData));

    // Redirect to the booking page
    router.push(`/book/available`);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Slider */}
      <div className="relative w-80 h-10 bg-gray-300 rounded-full">
        <div
          className="absolute top-0 left-0 h-full bg-pink-500 rounded-l-full"
          style={{ width: `${(hours / 24) * 100}%` }}
        ></div>
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-pink-500 text-white text-sm rounded-full px-3 h-full flex"
          style={{ left: `${(hours / 24) * 100}%` }}
        >
          <p className="m-auto">{hours}h</p>
        </div>
      </div>

      {/* Hours Display */}
      <div className="text-6xl font-bold text-gray-700">
        {hours} <span className="text-xl text-gray-400">h</span>
      </div>

      {/* Increment / Decrement Buttons */}
      <div className="flex gap-10">
        <button
          onClick={decrementHours}
          className="w-12 h-12 flex items-center justify-center border border-gray-400 rounded-md text-2xl font-bold hover:bg-gray-100 active:scale-95"
        >
          -
        </button>
        <button
          onClick={incrementHours}
          className="w-12 h-12 flex items-center justify-center border border-gray-400 rounded-md text-2xl font-bold hover:bg-gray-100 active:scale-95"
        >
          +
        </button>
      </div>

      <div>
        <button onClick={handleSelect} className="bg-blue-500 text-white px-4 py-2 rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default Duration;
