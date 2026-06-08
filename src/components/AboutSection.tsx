import { useReveal } from "../hooks/use-reveal";
import { aigcConfig } from "../config";

export default function AboutSection() {
  const labelRef = useReveal<HTMLDivElement>();
  const contentRef = useReveal<HTMLDivElement>();
  const { about } = aigcConfig;

  return (
    <section
      id="about"
      className="py-32 px-12 max-w-[1400px] mx-auto grid gap-16 max-md:grid-cols-1 max-md:px-6"
      style={{ gridTemplateColumns: "1fr 2fr" }}
    >
      <div ref={labelRef} className="reveal">
        <div
          className="text-xs tracking-[0.3em] uppercase sticky top-24"
          style={{ color: "var(--accent)" }}
        >
          {about.label}
        </div>
      </div>

      <div ref={contentRef} className="reveal">
        <h2
          className="text-3xl font-bold mb-8 leading-relaxed whitespace-pre-line"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          {about.headline}
        </h2>

        {about.paragraphs.map((p, i) => (
          <p
            key={i}
            className="text-sm mb-6 max-w-[600px]"
            style={{ color: "var(--text-secondary)" }}
          >
            {p}
          </p>
        ))}

        <div className="flex flex-wrap gap-4 mt-8">
          {about.skills.map((skill) => (
            <span
              key={skill}
              className="px-5 py-2 border rounded-full text-xs tracking-widest transition-all duration-300 cursor-default hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-[0_0_20px_var(--accent-glow)]"
              style={{ borderColor: "var(--text-secondary)" }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
