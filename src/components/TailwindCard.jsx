import React from "react";

export function TailwindCard({ index }) {
  return (
    <div className="p-4 border rounded shadow-md bg-white text-gray-800 m-2 w-full max-w-sm">
      <h2 className="text-xl font-bold mb-2">Tailwind Card #{index}</h2>
      <p className="text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>
  );
}
