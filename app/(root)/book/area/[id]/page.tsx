import React from "react";
import { useRouter } from "next/navigation";
import Locations from "@/data/locations";

// Static params generation for Next.js (no promise wrapper)
export function generateStaticParams() {
  // Generate paths for static generation and ensure each `id` is a string
  return Locations.map((location) => ({
    params: { id: location.id.toString() }, // Convert id to string and wrap it inside `params`
  }));
}

// Page component that accepts `params` from Next.js
export default function AreaPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [area, setArea] = React.useState<{
    name: string;
    location: { id: number | undefined; name: string }[];
  } | null>(null);

  const id = parseInt(params.id, 10); // Convert the string id to a number

  // Fetch the area data based on the `id`
  React.useEffect(() => {
    const selectedArea = Locations.find((location) => location.id === id);
    setArea(selectedArea || null);
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

  // If area data is not loaded, display a loading message
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
