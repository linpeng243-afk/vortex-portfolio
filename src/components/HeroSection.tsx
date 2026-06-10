import { useEffect, useRef, useState } from "react";
import { aigcConfig } from "../config";
import useHeroParticles from "../hooks/use-hero-particles";

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useHeroParticles(70);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const opacity = Math.max(0, 1 - scrollY / window.innerHeight);
  const translateY = scrollY * 0.3;

  const titleChars = Array.from(aigcConfig.heroTitle);
  const subtitleChars = Array.from(aigcConfig.heroSubtitle);
  const taglineChars = Array.from(aigcConfig.heroGlow);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Canvas Particle Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1, mixBlendMode: "screen" }}
      />

      {/* Text Content */}
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
        }}
      >
        <span className="block" aria-label={aigcConfig.heroTitle}>
          {titleChars.map((ch, i) => (
            <span
              key={`t-${i}`}
              className="inline-block char-stagger"
              style={{ animationDelay: `${0.04 * i}s` }}
            >
              {ch}
            </span>
          ))}
        </span>
        <span
          className="block italic font-normal mt-2"
          style={{
            fontSize: "0.4em",
            letterSpacing: "0.1em",
            color: "#ff4d00",
          }}
          aria-label={aigcConfig.heroSubtitle}
        >
          {subtitleChars.map((ch, i) => (
            <span
              key={`s-${i}`}
              className="inline-block char-stagger"
              style={{ animationDelay: `${0.4 + 0.035 * i}s` }}
            >
              {ch}
            </span>
          ))}
        </span>
      </h1>

      {/* Tagline */}
      <p
        className="absolute bottom-12 text-sm tracking-[0.4em] uppercase"
        style={{ color: "var(--text-secondary)", zIndex: 10 }}
        aria-label={aigcConfig.heroGlow}
      >
        {taglineChars.map((ch, i) => (
          <span
            key={`g-${i}`}
            className="inline-block char-stagger char-stagger--fade"
            style={{ animationDelay: `${1.0 + 0.06 * i}s` }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </p>

      {/* Bottom Gradient Mask */}
      <div
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        style={{
          height: "25%",
          background: "linear-gradient(180deg, transparent 0%, #0a0a0a 100%)",
          zIndex: 2,
        }}
      />

      {/* Scroll Hint */}
      <div
        className="absolute z-10 flex flex-col items-center gap-2"
        style={{
          bottom: "clamp(1.5rem, 4vh, 3rem)",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "9px",
            letterSpacing: "0.4em",
            color: "var(--text-secondary)",
            opacity: 0.5,
          }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: "1px",
            height: "32px",
            background: "linear-gradient(to bottom, rgba(255,77,0,0.6), transparent)",
            animation: "scrollBounce 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}
