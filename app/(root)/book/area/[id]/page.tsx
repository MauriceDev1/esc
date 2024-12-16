"use client";

import React, { useEffect, useState } from 'react';
import Locations from '@/data/locations';
import { useRouter } from 'next/navigation'; // Correct import for Next.js 13+

interface AreaProps {
  params: {
    id: string;
  };
}

const Area = ({ params }: AreaProps) => {
  const router = useRouter();
  const [area, setArea] = useState<{ name: string; location: { id: number | undefined; name: string }[] } | null>(null);

  useEffect(() => {
    if (params?.id) {
      const selectedArea = Locations.find((location) => location.id === Number(params.id));
      setArea(selectedArea || null);
    }
  }, [params]); // Run this effect when params change

  const handleSelect = (locationName: string) => {
    if (typeof window !== 'undefined') {
      // Get existing selectedCity data
      const existingData = localStorage.getItem('selectedCity');
      let updatedData;

      if (existingData) {
        // Parse and append area to existing data
        const parsedData = JSON.parse(existingData);
        updatedData = { ...parsedData, area: locationName };
      } else {
        // If no existing data, create new
        updatedData = { area: locationName };
      }

      // Store the updated data in localStorage
      localStorage.setItem('selectedCity', JSON.stringify(updatedData));

      // Redirect to the booking page
      router.push(`/book/gender`);
    }
  };

  if (!area) {
    return <div>Loading...</div>; // Add a fallback UI for better UX
  }

  const maxlen = area.location?.length;

  return (
    <div>
      <ul className="max-h-[70vh] flex flex-col overflow-y-scroll py-2">
        {area.location.map((loc, index) => (
          <button
            key={loc.id}
            onClick={() => handleSelect(loc.name)}
            className={`py-5 border-t hover:bg-pink-200 ${maxlen === index + 1 && 'border-b'}`}
          >
            {loc.name}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Area;
