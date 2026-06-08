import { useEffect, useRef, useState } from "react";
import { aigcConfig } from "../config";

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const opacity = Math.max(0, 1 - scrollY / window.innerHeight);
  const translateY = scrollY * 0.3;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen flex flex-col justify-center items-center overflow-hidden"
    >
      <div
        className="absolute top-1/2 left-1/2 w-[60vw] h-[60vw] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${aigcConfig.heroGlowColor} 0%, transparent 70%)`,
          animation: "pulse-glow 8s ease-in-out infinite",
        }}
      />

      <h1
        className="relative z-10 text-center select-none"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(4rem, 15vw, 12rem)",
          fontWeight: 900,
          letterSpacing: "-0.02em",
          lineHeight: 0.9,
          opacity,
          transform: `translateY(${translateY}px)`,
          animation: "fadeUp 1.2s ease-out",
        }}
      >
        {aigcConfig.heroTitle}
        <span
          className="block italic font-normal mt-2"
          style={{
            fontSize: "0.4em",
            letterSpacing: "0.1em",
            color: "#ff4d00",
          }}
        >
          {aigcConfig.heroSubtitle}
        </span>
      </h1>

      <p
        className="absolute bottom-12 text-sm tracking-[0.4em] uppercase"
        style={{
          color: "var(--text-secondary)",
          animation: "fadeIn 2s ease-out 0.5s both",
        }}
      >
        {aigcConfig.heroGlow}
      </p>
    </section>
  );
}
