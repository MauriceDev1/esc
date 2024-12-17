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
        <h2 className='text-center py-5 text-xl text-pink-500'>
        Please select the city where you would like to arrange a meeting with an escort.
        </h2>
      </div>
      <div className="w-full flex flex-col px-20">
        {Locations.map((location: Location, index: number) => (
          <button
            onClick={() => handleSelect(location)}
            key={location.id}
            className={`py-5 border-t hover:border-2 hover:shadow hover:shadow-pink-300 hover:border-pink-500 rounded-xl hover:text-pink-500 hover:font-semibold ${
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
