// app/(root)/book/area/[id]/page.tsx

import React from "react";
import Locations from "@/data/locations";
import AreaClient from "./AreaClient"; // Direct import without dynamic

interface AreaProps {
  params: {
    id: string;
  };
}

// Static params generation for Next.js
export async function generateStaticParams() {
  // Generate paths for static generation
  return Locations.map((location) => ({
    id: location.id.toString(), // Convert to string since params are strings
  }));
}

export default function AreaPage({ params }: AreaProps) {
  // Convert the string id to a number before passing it to AreaClient
  const id = parseInt(params.id, 10);

  return <AreaClient id={id} />;
}
