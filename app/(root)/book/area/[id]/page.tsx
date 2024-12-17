import React from "react";
import Locations from "@/data/locations";
import AreaClient from "./AreaClient"; // Import the client component

interface AreaProps {
  params: {
    id: string; // The dynamic route param is a string
  };
}

// Static params generation for Next.js (no promise wrapper)
export function generateStaticParams() {
  // Generate paths for static generation and ensure each `id` is a string
  return Locations.map((location) => ({
    params: { id: location.id.toString() }, // Convert id to string and wrap it inside `params`
  }));
}

export default function AreaPage({ params }: AreaProps) {
  // Convert the string id to a number before passing it to AreaClient
  const id = parseInt(params.id, 10);

  return <AreaClient id={id} />;
}
