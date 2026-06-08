import { useRef, useEffect, useState } from "react";
import VortexGallery from "../lib/VortexGallery";
import { galleryConfig } from "../config";

export default function VortexSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const galleryRef = useRef<VortexGallery | null>(null);
  const [hoveredArrow, setHoveredArrow] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current || galleryRef.current) return;

    const images = galleryConfig.images.map((img) => img.src);
    const gallery = new VortexGallery(canvasRef.current, images);
    galleryRef.current = gallery;

    return () => {
      gallery.destroy();
      galleryRef.current = null;
    };
  }, []);

  const navigate = (dir: number) => {
    galleryRef.current?.switchTo(dir);
  };

  return (
    <section id="vortex" className="relative" style={{ height: "100vh" }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ touchAction: "none" }}
      />

      <button
        onClick={() => navigate(-1)}
        onMouseEnter={() => setHoveredArrow("left")}
        onMouseLeave={() => setHoveredArrow(null)}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-300 z-10 border-0 bg-transparent p-0"
        style={{
          color: hoveredArrow === "left" ? "#ff4d00" : "rgba(255,255,255,0.5)",
          fontSize: "1.5rem",
          fontFamily: "Space Mono, monospace",
        }}
      >
        ‹
      </button>

      <button
        onClick={() => navigate(1)}
        onMouseEnter={() => setHoveredArrow("right")}
        onMouseLeave={() => setHoveredArrow(null)}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-300 z-10 border-0 bg-transparent p-0"
        style={{
          color: hoveredArrow === "right" ? "#ff4d00" : "rgba(255,255,255,0.5)",
          fontSize: "1.5rem",
          fontFamily: "Space Mono, monospace",
        }}
      >
        ›
      </button>
    </section>
  );
}
