import { useReveal } from "../hooks/use-reveal";
import { aigcConfig } from "../config";

export default function FooterSection() {
  const ref = useReveal<HTMLElement>();

  return (
    <footer
      ref={ref}
      className="reveal py-24 px-12 text-center border-t"
      style={{ borderColor: "rgba(255,255,255,0.05)" }}
    >
      <h2
        className="text-6xl italic mb-8"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {aigcConfig.footerTitle}
      </h2>
      <p
        className="text-sm tracking-[0.2em]"
        style={{ color: "var(--text-secondary)" }}
      >
        {aigcConfig.footerTagline}
      </p>
    </footer>
  );
}
