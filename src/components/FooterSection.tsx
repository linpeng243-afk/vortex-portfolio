import { useReveal } from "../hooks/use-reveal";
import { aigcConfig } from "../config";

export default function FooterSection() {
  const ref = useReveal<HTMLElement>();
  const { footerTitle, footerTagline, footerContact } = aigcConfig;
  const titleChars = Array.from(footerTitle);

  return (
    <footer
      ref={ref}
      id="footer"
      className="reveal py-32 px-6 border-t relative overflow-hidden"
      style={{ borderColor: "rgba(255,255,255,0.05)" }}
    >
      <div
        className="absolute pointer-events-none"
        style={{
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70vw",
          height: "70vw",
          maxWidth: "900px",
          maxHeight: "900px",
          background:
            "radial-gradient(circle, rgba(255,77,0,0.10) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      <div
        className="relative max-w-[1100px] mx-auto flex flex-col items-center"
        style={{ gap: "clamp(2.5rem, 6vh, 4.5rem)" }}
      >
        <div
          className="text-center"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "10px",
            letterSpacing: "0.5em",
            color: "#ff4d00",
            textTransform: "uppercase",
          }}
        >
          {footerContact.label}
        </div>

        <a
          href={`mailto:${footerContact.email}`}
          className="text-center transition-colors duration-300 hover:text-[#ff4d00]"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.2rem, 2.2vw, 2rem)",
            fontStyle: "italic",
            color: "var(--text-primary)",
            letterSpacing: "0.02em",
          }}
        >
          {footerContact.email}
        </a>

        <h2
          className="text-center italic leading-none select-none"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(5rem, 14vw, 12rem)",
            fontWeight: 900,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
          }}
          aria-label={footerTitle}
        >
          {titleChars.map((ch, i) => (
            <span
              key={`f-${i}`}
              className="inline-block char-stagger"
              style={{ animationDelay: `${0.08 * i}s` }}
            >
              {ch}
            </span>
          ))}
        </h2>

        <div className="flex flex-col items-center" style={{ gap: "1.5rem" }}>
          <p
            className="text-center"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.35em",
              color: "var(--text-secondary)",
              textTransform: "uppercase",
            }}
          >
            {footerTagline}
          </p>

          <div className="flex items-center" style={{ gap: "2rem" }}>
            {footerContact.socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                className="transition-colors duration-300 hover:text-[#ff4d00]"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "11px",
                  letterSpacing: "0.25em",
                  color: "var(--text-secondary)",
                  textTransform: "uppercase",
                }}
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>

        <div
          className="w-full pt-8 text-center"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            fontFamily: "'Space Mono', monospace",
            fontSize: "10px",
            letterSpacing: "0.2em",
            color: "var(--text-secondary)",
            textTransform: "uppercase",
          }}
        >
          {footerContact.copyright}
        </div>
      </div>
    </footer>
  );
}
