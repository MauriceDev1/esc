"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Links from "@/data/links";

interface CityData {
  area?: string;
  gender?: string;
  callType?: string;
  time?: string;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [selectedCityData, setSelectedCityData] = useState<CityData | null>(null);

  useEffect(() => {
    // Function to update the state from localStorage
    const updateSelectedCityData = () => {
      const storedCityData = localStorage.getItem("selectedCity");
      if (storedCityData) {
        setSelectedCityData(JSON.parse(storedCityData));
      }
    };

    // Initial update on component mount
    updateSelectedCityData();

    // Listen for changes in localStorage across tabs/windows
    window.addEventListener("storage", updateSelectedCityData);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("storage", updateSelectedCityData);
    };
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="w-full h-[70vh]">
      <div className="w-full flex justify-between bg-gray-800 rounded-lg shadow-l mt-10 bg-opacity-90">
        {Links.map((l) => {
          // Conditionally update link text based on the selectedCityData object
          let displayText = l.name;

          if (selectedCityData) {
            if (l.name === "City" && selectedCityData.area) {
              displayText = selectedCityData.area;
            } else if (l.name === "Area" && selectedCityData.area) {
              displayText = selectedCityData.area;
            } else if (l.name === "Gender" && selectedCityData.gender) {
              displayText = selectedCityData.gender;
            } else if (l.name === "Call Type" && selectedCityData.callType) {
              displayText = selectedCityData.callType;
            } else if (l.name === "Time" && selectedCityData.time) {
              displayText = selectedCityData.time;
            }
          }

          return (
            <Link href={l.path} key={l.id} className="h-14 flex w-full">
              <div className="h-full w-full flex justify-center items-center">
                <p className="text-white">{displayText}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="bg-white bg-opacity-90 backdrop-blur-lg min-h-[70vh] rounded-lg shadow-lg my-5">
        {children}
      </div>
    </div>
  );
}
