import React from "react";
import Locations from "@/data/locations";
import AreaClient from "./AreaClient"; // Import the client component

// Static params generation for Next.js (no promise wrapper)
export function generateStaticParams() {
  // Generate paths for static generation and ensure each `id` is a string
  return Locations.map((location) => ({
    params: { id: location.id.toString() }, // Convert id to string and wrap it inside `params`
  }));
}

// Page component that accepts `params` from Next.js
export default function AreaPage({ params }: { params: { id: string } }) {
  // Convert the string id to a number before passing it to AreaClient
  const id = parseInt(params.id, 10);

  return <AreaClient id={id} />;
}