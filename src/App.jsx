import Stats from "stats.js";
import React, { useEffect, useRef, useState } from "react";
import { TailwindCard } from "./components/TailwindCard";
import { StyledCard } from "./components/StyledCard";

const NUM_CARDS = 1000;

function App() {
  const [useTailwind, setUseTailwind] = useState(true);
  const [duration, setDuration] = useState(0);
  const statsRef = useRef(null);
  const [memoryUsedMB, setMemoryUsedMB] = useState(null);

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

  // MARK: FPS display
  useEffect(() => {
    const stats = new Stats();
    stats.showPanel(0);
    stats.dom.style.position = "fixed";
    stats.dom.style.top = "0px";
    stats.dom.style.right = "0px";
    stats.dom.style.left = "auto";
    document.body.appendChild(stats.dom);
    statsRef.current = stats;

    const loop = () => {
      stats.begin();
      stats.end();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    return () => {
      document.body.removeChild(stats.dom);
    };
  }, []);

  // MARK: Memory polling
  useEffect(() => {
    let intervalId;

    if (performance.memory) {
      intervalId = setInterval(() => {
        const used = performance.memory.usedJSHeapSize / (1024 * 1024);
        setMemoryUsedMB(used.toFixed(2));
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  // MARK: Time rendering
  useEffect(() => {
    const start = performance.now();
    requestAnimationFrame(() => {
      const end = performance.now();
      setDuration(end - start);
    });
  }, [useTailwind]);

  // MARK: JSX
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

      {memoryUsedMB && <p className="mb-4">Memory usage: {memoryUsedMB} MB</p>}

      <div className="flex flex-wrap">{cards}</div>
    </div>
  );
}

export default App;
