"use client";

import React from 'react';
import Locations from '@/data/locations';
import { useRouter } from 'next/navigation';

interface Location {
  id: string | number;
  name: string;
  location?: { name: string; count?: number }[];
}

const City: React.FC = () => {
  const router = useRouter();

  const handleSelect = (location: Location) => {
    // Store the selected city in local storage
    localStorage.setItem(
      'selectedCity',
      JSON.stringify({ city: location.name })
    );

    // Redirect to the booking page
    router.push(`/book/area/${location.id}`);
  };

  return (
    <div>
      <div>
        <h2>
          Please select your city you would like to meet an escort?
        </h2>
      </div>
      <div className="w-full flex flex-col">
        {Locations.map((location: Location, index: number) => (
          <button
            onClick={() => handleSelect(location)}
            key={location.id}
            className={`py-5 border-t hover:bg-pink-200 ${
              index === Locations.length - 1 ? 'border-b' : ''
            }`}
          >
            {location.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default City;
