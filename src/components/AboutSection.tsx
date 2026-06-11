import { useReveal } from "../hooks/use-reveal";
import { aigcConfig } from "../config";

export default function AboutSection() {
  const sectionRef = useReveal<HTMLDivElement>();
  const metaRef = useReveal<HTMLDivElement>();
  const headlineRef = useReveal<HTMLDivElement>();
  const bodyRef = useReveal<HTMLDivElement>();
  const skillsRef = useReveal<HTMLDivElement>();
  const skillsDesktopRef = useReveal<HTMLDivElement>();
  const { about } = aigcConfig;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="reveal relative py-32 px-12 max-md:py-20 max-md:px-6"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_2.4fr_1fr] gap-6 md:gap-16">
        <aside
          ref={metaRef}
          className="reveal md:sticky md:top-24 md:self-start hidden md:block"
        >
          <div
            className="flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase mb-4"
            style={{ color: "#ff4d00" }}
          >
            <span style={{ display: "inline-block", width: "32px", height: "1px", background: "var(--accent)" }} />
            <span>01 / About</span>
          </div>
          <div
            className="text-[10px] tracking-[0.4em] uppercase"
            style={{ color: "var(--text-secondary)" }}
          >
            Issue 2024 — AIGC Visual
          </div>
          <div
            className="text-[10px] tracking-[0.4em] uppercase mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            Beijing · Shanghai · Paris
          </div>
        </aside>

        <article ref={headlineRef} className="reveal col-span-1" style={{ gridColumn: "2 / 3" }}>
          <h2
            className="font-black leading-[1.1] tracking-tight mb-12"
            style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            }}
          >
            {about.headline.split("\n").map((line, i) => (
              <span key={i} className="block">
                {line.split("视觉").map((part, j, parts) => (
                  <span key={j}>
                    {part}
                    {j < parts.length - 1 && (
                      <span style={{ color: "#ff4d00" }}>视觉</span>
                    )}
                  </span>
                ))}
              </span>
            ))}
          </h2>

          <div ref={bodyRef} className="reveal">
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                className={`mb-7 last:mb-0 ${i === 0 ? "drop-cap" : ""}`}
                style={{
                  fontFamily: i === 0 ? "'Noto Serif SC', serif" : "'Space Mono', monospace",
                  fontSize: i === 0 ? "1.05rem" : "0.82rem",
                  lineHeight: i === 0 ? "1.95" : "1.85",
                  color: "var(--text-secondary)",
                  maxWidth: "640px",
                  letterSpacing: i === 1 ? "0.01em" : "0",
                }}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Mobile: skills inline after paragraphs */}
          <div ref={skillsRef} className="reveal mt-8 md:hidden">
            <div
              className="text-[10px] tracking-[0.4em] uppercase mb-3"
              style={{ color: "var(--text-secondary)" }}
            >
              Practice
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {about.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-sm"
                  style={{
                    fontFamily: "'Noto Serif SC', serif",
                    color: "var(--text-secondary)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* Desktop: skills sidebar */}
        <div ref={skillsDesktopRef} className="reveal self-start pt-52 hidden md:block">
          <div
            className="text-[10px] tracking-[0.4em] uppercase mb-6"
            style={{ color: "var(--text-secondary)" }}
          >
            Practice
          </div>
          <ul className="space-y-3">
            {about.skills.map((skill, i) => (
              <li
                key={skill}
                className="skill-tilt flex items-baseline gap-3 text-xs tracking-widest cursor-default transition-all duration-300"
                style={{
                  color: "var(--text-primary)",
                  perspective: "600px",
                  transformStyle: "preserve-3d",
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
                  const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
                  e.currentTarget.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) scale(1.04)`;
                  e.currentTarget.style.textShadow = "0 0 20px rgba(255, 77, 0, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)";
                  e.currentTarget.style.textShadow = "none";
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    color: "#ff4d00",
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1rem",
                    fontStyle: "italic",
                  }}
                >
                  {skill}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
