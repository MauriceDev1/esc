import React from "react";
import Locations from "@/data/locations";
import AreaClient from "./AreaClient"; // Import client component

interface AreaProps {
  params: {
    id: number;
  };
}

export async function generateStaticParams() {
  // Generate IDs for static paths
  return Locations.map((location) => ({
    id: location.id.toString(),
  }));
}

export default function AreaPage({ params }: AreaProps) {
  return <AreaClient id={params.id} />;
}
