import React from "react";
import Locations from "@/data/locations";
import AreaClient from "./AreaClient";

interface AreaProps {
  params: Promise<{ id: string }>; // params is a Promise
}

// Page component
export default async function AreaPage({ params }: AreaProps) {
  const { id } = await params; // Unwrap the params promise
  const numericId = parseInt(id, 10); // Convert to number if needed

  return <AreaClient id={numericId} />;
}

// Static params generation
export function generateStaticParams() {
  return Locations.map((location) => ({
    id: location.id.toString(), // Ensure ID is a string for dynamic routes
  }));
}
