import { useEffect, useState } from "react";
import { aigcConfig } from "../config";

interface Dot {
  id: string;
  label: string;
  index: string;
}

const dots: Dot[] = [
  { id: "hero", label: "Hero", index: "00" },
  { id: "vortex", label: "Vortex", index: "01" },
  { id: "about", label: "About", index: "02" },
  ...aigcConfig.projects.map((p, i) => ({
    id: `project-${i}`,
    label: p.title,
    index: String(i + 3).padStart(2, "0"),
  })),
  { id: "footer", label: "Contact", index: "08" },
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
    <div
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 max-md:hidden"
      style={{ pointerEvents: "auto" }}
    >
      <div
        className="relative flex flex-col"
        style={{ gap: "0.9rem", alignItems: "flex-end" }}
      >
        {dots.map((dot) => {
          const isActive = active === dot.id;
          return (
            <div
              key={dot.id}
              className="relative flex items-center"
              style={{
                flexDirection: "row-reverse",
                gap: "0.75rem",
                height: "20px",
              }}
            >
              <button
                onClick={() => scrollTo(dot.id)}
                className="cursor-pointer border-0 p-0 rounded-full transition-all duration-300"
                style={{
                  width: "8px",
                  height: "8px",
                  background: isActive ? "#ff4d00" : "rgba(255,255,255,0.35)",
                  boxShadow: isActive
                    ? "0 0 12px rgba(255,77,0,0.6)"
                    : "none",
                  transform: isActive ? "scale(1.6)" : "scale(1)",
                }}
                aria-label={dot.label}
              />

              <div
                className="flex items-center overflow-hidden"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  color: isActive ? "#ff4d00" : "var(--text-secondary)",
                  opacity: isActive ? 1 : 0,
                  maxWidth: isActive ? "180px" : "0px",
                  transition:
                    "opacity 0.4s ease, max-width 0.5s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease",
                }}
              >
                <span style={{ opacity: 0.6, marginRight: "0.5rem" }}>
                  {dot.index}
                </span>
                {dot.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
