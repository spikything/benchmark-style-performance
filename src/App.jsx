import React, { useEffect, useState } from "react";
import { TailwindCard } from "./components/TailwindCard";
import { StyledCard } from "./components/StyledCard";

const NUM_CARDS = 1000;

function App() {
  const [useTailwind, setUseTailwind] = useState(true);
  const [duration, setDuration] = useState(0);

  const toggle = () => setUseTailwind((prev) => !prev);

  const cards = new Array(NUM_CARDS)
    .fill(null)
    .map((_, i) =>
      useTailwind ? (
        <TailwindCard key={i} index={i} />
      ) : (
        <StyledCard key={i} index={i} />
      )
    );

  useEffect(() => {
    const start = performance.now();
    requestAnimationFrame(() => {
      const end = performance.now();
      setDuration(end - start);
    });
  }, [useTailwind]);

  return (
    <div className="p-4">
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={toggle}
      >
        Switch to {useTailwind ? "Styled Components" : "Tailwind"}
      </button>

      <p className="mb-4">
        Rendering {NUM_CARDS} cards using{" "}
        <strong>{useTailwind ? "Tailwind" : "styled-components"}</strong> took
        {" " + duration.toFixed(0)}ms
      </p>

      <div className="flex flex-wrap">{cards}</div>
    </div>
  );
}

export default App;
