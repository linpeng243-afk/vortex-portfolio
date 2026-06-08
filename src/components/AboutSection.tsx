import { useReveal } from "../hooks/use-reveal";
import { aigcConfig } from "../config";

export default function AboutSection() {
  const sectionRef = useReveal<HTMLDivElement>();
  const metaRef = useReveal<HTMLDivElement>();
  const headlineRef = useReveal<HTMLDivElement>();
  const bodyRef = useReveal<HTMLDivElement>();
  const skillsRef = useReveal<HTMLDivElement>();
  const { about } = aigcConfig;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="reveal relative py-32 px-12 max-md:py-20 max-md:px-6"
      style={{ background: "var(--bg-primary)" }}
    >
      <div
        className="max-w-[1440px] mx-auto"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2.4fr 1fr",
          gap: "4rem",
        }}
      >
        <aside
          ref={metaRef}
          className="reveal sticky top-24 self-start"
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
                className="mb-7 last:mb-0"
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
        </article>

        <div ref={skillsRef} className="reveal self-start pt-52 max-md:pt-8">
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
                className="flex items-baseline gap-3 text-xs tracking-widest"
                style={{ color: "var(--text-primary)" }}
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
