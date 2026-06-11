import { useRef, useEffect, useState } from "react";
import VortexGallery from "../lib/VortexGallery";
import { galleryConfig } from "../config";

export default function VortexSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const galleryRef = useRef<VortexGallery | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || galleryRef.current) return;

    const images = galleryConfig.images.map((img) => img.src);
    const gallery = new VortexGallery(canvasRef.current, images);
    galleryRef.current = gallery;

    let raf = 0;
    const tick = () => {
      const idx = galleryRef.current?.currentImageIndex ?? 0;
      setCurrentIndex((prev) => (prev === idx ? prev : idx));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onLoad = () => setReady(true);
    setTimeout(onLoad, 600);

    return () => {
      cancelAnimationFrame(raf);
      gallery.destroy();
      galleryRef.current = null;
    };
  }, []);

  const navigate = (dir: number) => {
    galleryRef.current?.switchTo(dir);
  };

  const total = galleryConfig.images.length;
  const currentAlt = galleryConfig.images[currentIndex]?.title ?? "";

  return (
    <section id="vortex" className="relative" style={{ height: "100vh", marginTop: "-1px" }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ touchAction: "pan-y" }}
      />

      <div
        className="absolute z-10 pointer-events-none select-none"
        style={{
          top: "clamp(2rem, 5vh, 4rem)",
          right: "clamp(1.5rem, 4vw, 3rem)",
          opacity: ready ? 1 : 0,
          transition: "opacity 1.2s ease",
        }}
      >
        <div
          className="text-right"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "10px",
            letterSpacing: "0.3em",
            color: "var(--text-secondary)",
            lineHeight: 1.6,
          }}
        >
          <div style={{ color: "#ff4d00" }}>AIGC</div>
          <div>{total} WORKS · 2024</div>
          <div style={{ marginTop: "4px", opacity: 0.6 }}>
            {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
        </div>
      </div>

      <div
        className="absolute z-10 pointer-events-none"
        style={{
          left: "50%",
          bottom: "clamp(2rem, 6vh, 4rem)",
          transform: "translateX(-50%)",
          textAlign: "center",
          minWidth: "200px",
        }}
      >
        <div
          key={currentIndex}
          style={{
            animation: "fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.4em",
              color: "#ff4d00",
              textTransform: "uppercase",
              marginBottom: "0.4rem",
            }}
          >
            Now Showing · {String(currentIndex + 1).padStart(2, "0")}
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)",
              color: "var(--text-primary)",
              letterSpacing: "0.05em",
              fontStyle: "italic",
            }}
          >
            {currentAlt}
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate(-1)}
        onMouseEnter={() => setHovered("left")}
        onMouseLeave={() => setHovered(null)}
        onTouchStart={() => setHovered("left")}
        onTouchEnd={() => setHovered(null)}
        className="absolute z-10 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border border-white/10 max-md:w-12 max-md:h-12"
        style={{
          left: "min(calc(50% - 13.5vw), calc(100% - 70px))",
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
        onTouchStart={() => setHovered("right")}
        onTouchEnd={() => setHovered(null)}
        className="absolute z-10 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border border-white/10 max-md:w-12 max-md:h-12"
        style={{
          left: "max(calc(50% + 15.5vw), 70px)",
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
      {/* Bottom gradient transition to About */}
      <div
        className="absolute bottom-0 left-0 w-full pointer-events-none z-20"
        style={{
          height: "180px",
          background: "linear-gradient(to bottom, transparent 0%, var(--bg-primary) 100%)",
        }}
      />
      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, rgba(10,10,10,0.7) 100%)",
        }}
      />
    </section>
  );
}
