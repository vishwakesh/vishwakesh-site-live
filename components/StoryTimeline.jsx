"use client";
import { useEffect, useRef, useState } from "react";

const STEPS = [
  ["01", "Curious", "Started exploring computers and the internet."],
  ["02", "Obsessed", "Technology became something I genuinely wanted to understand."],
  ["03", "Building", "Started making websites, bots, apps, AI experiments and other projects."],
  ["04", "Now", "Learning, experimenting and trying to turn ideas into real products."],
  ["05", "Next", "Build startups. Build technology. Build a life around creating."]
];

export default function StoryTimeline() {
  const ref = useRef(null);
  const [fill, setFill] = useState(0);

  useEffect(() => {
    function onScroll() {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.8 - rect.top) / rect.height));
      setFill(p);
    }
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref} className="relative pl-9">
      <div className="absolute left-[9px] top-1.5 bottom-1.5 w-0.5 bg-line" />
      <div className="absolute left-[9px] top-1.5 w-0.5 bg-indigo transition-[height]" style={{ height: `${fill * 100}%` }} />
      {STEPS.map(([num, title, desc], i) => {
        const active = fill > i / STEPS.length;
        return (
          <div key={num} className="relative pb-7 last:pb-0">
            <span
              className={`absolute -left-9 top-0.5 flex h-[19px] w-[19px] items-center justify-center rounded-full border-2 text-[10px] ${
                active ? "border-indigo bg-indigo/10 text-indigo" : "border-line bg-cream text-inksoft"
              }`}
            >
              {num}
            </span>
            <h4 className="text-sm font-semibold">{title}</h4>
            <p className="text-sm text-inksoft">{desc}</p>
          </div>
        );
      })}
    </div>
  );
}
