import { useReveal } from "../hooks/use-reveal";
import { aigcConfig, type ProjectSection } from "../config";

function GalleryItem({ src, size }: { src: string; size: string }) {
  const ref = useReveal<HTMLDivElement>();

  const sizeClasses: Record<string, string> = {
    large: "col-span-8 aspect-[16/10] max-md:col-span-1 max-md:aspect-[4/3]",
    medium: "col-span-4 max-md:col-span-1 max-md:aspect-[4/3]",
    small: "col-span-3 aspect-square max-md:col-span-1 max-md:aspect-[4/3]",
    wide: "col-span-6 aspect-[4/3] max-md:col-span-1 max-md:aspect-[4/3]",
  };

  return (
    <div
      ref={ref}
      className={`reveal relative overflow-hidden cursor-pointer transition-transform duration-500 hover:scale-[0.98] ${sizeClasses[size] || ""}`}
      style={{ background: "var(--bg-secondary)" }}
    >
      <div
        className="absolute inset-0 z-10 transition-opacity duration-300 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,77,0,0.1) 0%, transparent 50%, rgba(0,0,0,0.3) 100%)",
        }}
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

  return (
    <section
      id={`project-${index}`}
      className="min-h-screen py-24 relative border-t"
      style={{ borderColor: "rgba(255,255,255,0.05)" }}
    >
      <div
        ref={headerRef}
        className="reveal px-12 max-w-[1400px] mx-auto mb-16 flex justify-between items-end max-md:flex-col max-md:items-start max-md:gap-4 max-md:px-6"
      >
        <div
          className="font-black italic leading-none opacity-30"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(4rem, 8vw, 8rem)",
            color: "#ff4d00",
          }}
        >
          {project.number}
        </div>
        <div className="text-right max-md:text-left">
          <h3
            className="text-3xl font-black mb-1"
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
          <GalleryItem key={i} src={img.src} size={img.size} />
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
