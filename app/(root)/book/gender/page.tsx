"use client";

import React from 'react';
import Genders from '@/data/genders';
import { useRouter } from 'next/navigation'; // Correct import for Next.js 13+

const Gender = () => {
  const router = useRouter();
  const handleSelect = (gender: string) => {
    if (typeof window !== 'undefined') {
      // Retrieve existing data from localStorage
      const existingData = localStorage.getItem('selectedCity');
      let updatedData;

      if (existingData) {
        // Parse existing data and append the selected gender
        const parsedData = JSON.parse(existingData);
        updatedData = { ...parsedData, gender };
      } else {
        // Create a new entry if no existing data
        updatedData = { gender };
      }

      // Update localStorage with the new data
      localStorage.setItem('selectedCity', JSON.stringify(updatedData));
    }
    router.push(`/book/call-type`);
  };

  return (
    <div className="w-full flex gap-5">
      {Genders.map((g, i) => (
        <button
          key={i}
          className="w-1/3 border py-5 rounded hover:border-2 hover:border-pink-500 hover:shadow hover:shadow-pink-400 hover:text-pink-500 hover:font-semibold"
          onClick={() => handleSelect(g.name)}
        >
          {g.name}
        </button>
      ))}
    </div>
  );
};

export default Gender;
