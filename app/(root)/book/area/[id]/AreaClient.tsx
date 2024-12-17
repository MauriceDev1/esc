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
  );
}
