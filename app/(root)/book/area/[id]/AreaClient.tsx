"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Locations from "@/data/locations";

interface AreaClientProps {
  id: number;
}

export default function AreaClient({ id }: AreaClientProps) {
  const router = useRouter();
  const [area, setArea] = useState<{
    name: string;
    location: { id: number; name: string }[];
  } | null>(null);

  useEffect(() => {
    const selectedArea = Locations.find((location) => location.id === id);
    setArea(selectedArea || null);
  }, [id]);

  const handleSelect = (locationName: string) => {
    localStorage.setItem("selectedCity", JSON.stringify({ area: locationName }));
    router.push(`/book/gender`);
  };

  if (!area) return <div>Loading...</div>;

  return (
    <div>
        <h2 className='text-center py-5 text-xl text-pink-500'>
            Please select the area where you would like to arrange a meeting with an escort
        </h2>
        <ul className="max-h-[70vh] flex flex-col px-3 md:px-10 overflow-y-scroll py-2">
        {area.location.map((loc, index) => (
            <button
            key={loc.id}
            onClick={() => handleSelect(loc.name)}
            className={`py-5 border-t hover:border-2 hover:shadow hover:shadow-pink-300 hover:border-pink-500 rounded-xl hover:text-pink-500 hover:font-semibold ${
                area.location.length === index + 1 && "border-b"
                }`}
                >
            {loc.name}
            </button>
        ))}
        </ul>
    </div>
  );
}
