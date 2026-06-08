import { useRef, useEffect, useState } from "react";
import VortexGallery from "../lib/VortexGallery";
import { galleryConfig } from "../config";

export default function VortexSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const galleryRef = useRef<VortexGallery | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

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
        onMouseEnter={() => setHovered("left")}
        onMouseLeave={() => setHovered(null)}
        className="absolute z-10 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border border-white/10"
        style={{
          left: "calc(50% - 13.5vw)",
          top: "50%",
          transform: "translate(-50%, -50%)",
          background: hovered === "left"
            ? "rgba(255, 77, 0, 0.2)"
            : "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          color: hovered === "left" ? "#ff4d00" : "rgba(255, 255, 255, 0.6)",
          fontSize: "1.25rem",
        }}
      >
        ‹
      </button>

      <button
        onClick={() => navigate(1)}
        onMouseEnter={() => setHovered("right")}
        onMouseLeave={() => setHovered(null)}
        className="absolute z-10 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border border-white/10"
        style={{
          left: "calc(50% + 15.5vw)",
          top: "50%",
          transform: "translate(-50%, -50%)",
          background: hovered === "right"
            ? "rgba(255, 77, 0, 0.2)"
            : "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          color: hovered === "right" ? "#ff4d00" : "rgba(255, 255, 255, 0.6)",
          fontSize: "1.25rem",
        }}
      >
        ›
      </button>
    </section>
  );
}
