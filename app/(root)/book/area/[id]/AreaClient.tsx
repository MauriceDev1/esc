"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AreaClientProps {
  id: number;
}

export default function AreaClient({ id }: AreaClientProps) {
  const router = useRouter();
  const [area, setArea] = useState<{
    name: string;
    location: { id: number | undefined; name: string }[];
  } | null>(null);

  useEffect(() => {
    // Use dynamic import
    (async () => {
      try {
        const module = await import("@/data/locations");
        const Locations = module.default;
        const selectedArea = Locations.find((location) => location.id === Number(id));
        setArea(selectedArea || null);
      } catch (error) {
        console.error("Error loading locations:", error);
      }
    })();
  }, [id]);

  const handleSelect = (locationName: string) => {
    const existingData = localStorage.getItem("selectedCity");
    let updatedData;

    if (existingData) {
      const parsedData = JSON.parse(existingData);
      updatedData = { ...parsedData, area: locationName };
    } else {
      updatedData = { area: locationName };
    }

    localStorage.setItem("selectedCity", JSON.stringify(updatedData));
    router.push(`/book/gender`);
  };

  if (!area) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul className="max-h-[70vh] flex flex-col overflow-y-scroll py-2">
        {area.location.map((loc, index) => (
          <button
            key={loc.id}
            onClick={() => handleSelect(loc.name)}
            className={`py-5 border-t hover:bg-pink-200 ${
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
