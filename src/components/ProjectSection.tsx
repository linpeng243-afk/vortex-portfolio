import { useRef, useEffect } from "react";
import { useReveal } from "../hooks/use-reveal";
import { aigcConfig, type ProjectSection } from "../config";

function GalleryItem({ src, size, index }: { src: string; size: string; index: number }) {
  const ref = useReveal<HTMLDivElement>();
  const glowRef = useRef<HTMLDivElement>(null);

  const sizeClasses: Record<string, string> = {
    large: "col-span-8 aspect-[16/10] max-md:col-span-1 max-md:aspect-[4/3]",
    medium: "col-span-4 max-md:col-span-1 max-md:aspect-[4/3]",
    small: "col-span-3 aspect-square max-md:col-span-1 max-md:aspect-[4/3]",
    wide: "col-span-6 aspect-[4/3] max-md:col-span-1 max-md:aspect-[4/3]",
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle 180px at ${x}px ${y}px, rgba(255, 77, 0, 0.18), transparent 70%)`;
      glowRef.current.style.opacity = "1";
    }
  };

  const handleMouseLeave = () => {
    if (glowRef.current) {
      glowRef.current.style.opacity = "0";
    }
  };

  return (
    <div
      ref={ref}
      className={`reveal-blur card-lift relative overflow-hidden cursor-pointer ${sizeClasses[size] || ""}`}
      style={{
        background: "var(--bg-secondary)",
        transitionDelay: `${index * 0.06}s`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={glowRef}
        className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300"
        style={{ opacity: 0 }}
      />
      <img
        src={src}
        alt=""
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        loading="lazy"
      />
    </div>
  );
}

function Project({ project, index }: { project: ProjectSection; index: number }) {
  const headerRef = useReveal<HTMLDivElement>();
  const descRef = useReveal<HTMLDivElement>();
  const numberRef = useReveal<HTMLDivElement>();
  const sectionRef = useRef<HTMLElement>(null);

  const numberChars = Array.from(project.number);

  // Parallax: big number moves opposite to scroll
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const numEl = section.querySelector(".parallax-number") as HTMLElement;
    if (!numEl) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const offset = (rect.top / window.innerHeight) * 30;
      numEl.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id={`project-${index}`}
      className="min-h-screen py-24 relative"
    >
      {/* Chapter divider line */}
      <div className="absolute top-0 left-0 w-full flex items-center gap-4 px-12 max-w-[1600px] mx-auto max-md:px-6" style={{ height: "1px" }}>
        <div className="flex-1" style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--text-secondary)", opacity: 0.4 }}>
          {String(index + 1).padStart(2, "0")} / {String(aigcConfig.projects.length).padStart(2, "0")}
        </span>
        <div className="flex-1" style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />
      </div>
      <div
        className="px-12 max-w-[1400px] mx-auto mb-16 max-md:px-6 flex items-end justify-between gap-6"
      >
        <div
          ref={numberRef}
          className="reveal parallax-number font-black italic leading-none"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(4rem, 8vw, 8rem)",
            color: "#ff4d00",
            opacity: 0.15,
            transition: "transform 0.1s linear",
          }}
          aria-label={project.number}
        >
          {numberChars.map((ch, i) => (
            <span
              key={`n-${i}`}
              className="inline-block char-stagger"
              style={{ animationDelay: `${0.15 * i}s` }}
            >
              {ch}
            </span>
          ))}
        </div>
        <div
          ref={headerRef}
          className="reveal text-right max-md:text-left"
        >
          <h3
            className="text-3xl font-black mb-1 clip-reveal"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
              {project.title}
            </h3>
            <div
              className="italic text-lg"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "var(--text-secondary)",
              }}
            >
              {project.enTitle}
            </div>
          </div>
      </div>

      <div className="grid grid-cols-12 gap-4 px-12 max-w-[1600px] mx-auto max-md:grid-cols-1 max-md:px-6">
        {project.images.map((img, i) => (
          <GalleryItem key={i} src={img.src} size={img.size} index={i} />
        ))}
      </div>

      <div
        ref={descRef}
        className="reveal grid gap-16 py-16 px-12 max-w-[1400px] mx-auto max-md:grid-cols-1 max-md:px-6 max-md:gap-8"
        style={{ gridTemplateColumns: "1fr 1fr" }}
      >
        <p
          className="text-lg leading-loose"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          {project.descriptionZh}
        </p>
        <p
          className="text-sm leading-loose italic"
          style={{ color: "var(--text-secondary)" }}
        >
          {project.descriptionEn}
        </p>
      </div>
    </section>
  );
}

export default function ProjectSections() {
  return (
    <>
      {aigcConfig.projects.map((project, i) => (
        <Project key={i} project={project} index={i} />
      ))}
    </>
  );
}
