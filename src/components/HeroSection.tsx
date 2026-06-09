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

  const titleChars = Array.from(aigcConfig.heroTitle);
  const subtitleChars = Array.from(aigcConfig.heroSubtitle);
  const taglineChars = Array.from(aigcConfig.heroGlow);

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

      <p
        className="absolute bottom-12 text-sm tracking-[0.4em] uppercase"
        style={{
          color: "var(--text-secondary)",
        }}
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
    </section>
  );
}
