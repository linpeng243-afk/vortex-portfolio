import { useRef, useEffect } from "react";
import VortexGallery from "../lib/VortexGallery";
import { galleryConfig } from "../config";

export default function VortexSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const galleryRef = useRef<VortexGallery | null>(null);

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

  return (
    <section id="vortex" className="relative" style={{ height: "100vh" }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ touchAction: "none" }}
      />
    </section>
  );
}
