import { useEffect, useState } from "react";
import { aigcConfig } from "../config";

interface Dot {
  id: string;
  label: string;
}

const dots: Dot[] = [
  { id: "hero", label: "Hero" },
  { id: "vortex", label: "Vortex" },
  { id: "about", label: "About" },
  ...aigcConfig.projects.map((p, i) => ({ id: `project-${i}`, label: p.title })),
];

export default function ScrollIndicator() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight / 2;
      for (let i = dots.length - 1; i >= 0; i--) {
        const el = document.getElementById(dots[i].id);
        if (el && el.getBoundingClientRect().top <= mid) {
          setActive(dots[i].id);
          return;
        }
      }
      setActive("hero");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-50 max-md:hidden">
      {dots.map((dot) => (
        <button
          key={dot.id}
          onClick={() => scrollTo(dot.id)}
          className="w-2 h-2 rounded-full transition-all duration-300 cursor-pointer border-0 p-0"
          style={{
            background: active === dot.id ? "var(--accent)" : "var(--text-secondary)",
            boxShadow: active === dot.id ? "0 0 10px var(--accent-glow)" : "none",
            transform: active === dot.id ? "scale(1.5)" : "scale(1)",
          }}
          title={dot.label}
        />
      ))}
    </div>
  );
}
