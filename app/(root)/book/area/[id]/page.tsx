"use client";

import React, { useEffect, useState } from "react";
import Locations from "@/data/locations";
import { useRouter } from "next/navigation";

interface AreaProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  // If using static generation, you should provide a list of all possible IDs
  const ids = Locations.map((location) => ({ id: location.id.toString() }));
  return ids;
}

export default function Area({ params }: AreaProps) {
  const router = useRouter();
  const [area, setArea] = useState<{ name: string; location: { id: number | undefined; name: string }[] } | null>(null);

  useEffect(() => {
    if (params?.id) {
      const selectedArea = Locations.find((location) => location.id === Number(params.id));
      setArea(selectedArea || null);
    }
  }, [params]);

  const handleSelect = (locationName: string) => {
    if (typeof window !== "undefined") {
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
    }
  };

  if (!area) {
    return <div>Loading...</div>;
  }

  const maxlen = area.location?.length;

  return (
    <div>
      <ul className="max-h-[70vh] flex flex-col overflow-y-scroll py-2">
        {area.location.map((loc, index) => (
          <button
            key={loc.id}
            onClick={() => handleSelect(loc.name)}
            className={`py-5 border-t hover:bg-pink-200 ${maxlen === index + 1 && "border-b"}`}
          >
            {loc.name}
          </button>
        ))}
      </ul>
    </div>
  );
}
