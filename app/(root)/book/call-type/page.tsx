"use client";

import React from 'react';
import CallTypeData from "@/data/callType";
import { useRouter } from 'next/navigation';

const CallType = () => {
  const router = useRouter();

  const handleSelect = (callType: string) => {
    if (typeof window !== 'undefined') {
      // Retrieve existing data from localStorage
      const existingData = localStorage.getItem('selectedCity');
      let updatedData;

      if (existingData) {
        // Parse existing data and append the selected call type
        const parsedData = JSON.parse(existingData);
        updatedData = { ...parsedData, callType };
      } else {
        // Create a new entry if no existing data
        updatedData = { callType };
      }

      // Update localStorage with the new data
      localStorage.setItem('selectedCity', JSON.stringify(updatedData));
    }

    console.log(`Selected Call Type: ${callType}`);

    // Redirect to the booking page
    router.push(`/book/time`);
  };

  return (
    <div className="w-full gap-5 flex">
      {CallTypeData.map((c, i) => (
        <button
          key={i}
          className="w-1/2 border rounded py-5 hover:border-2 hover:border-pink-500 hover:shadow hover:shadow-pink-400 hover:text-pink-500 hover:font-semibold"
          onClick={() => handleSelect(c.name)}
        >
          {c.name}
        </button>
      ))}
    </div>
  );
};

export default CallType;
