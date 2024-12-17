// AreaPage.tsx
import React from "react";
import Locations from "@/data/locations";
import AreaClient from "./AreaClient"; // Import client component

interface AreaProps {
  params: {
    id: string; // Update this to be a string (it will be passed as string in dynamic routes)
}}

export async function generateStaticParams() {
  // Generate paths with string IDs, as Next.js will pass them as strings
  return Locations.map((location) => ({
    id: location.id.toString(), // Ensure id is passed as a string
  }));
}

export default function AreaPage({ params }: AreaProps) {
  // Convert the string id to a number before passing it to AreaClient
  const id = parseInt(params.id, 10);

  return <AreaClient id={id} />;
}