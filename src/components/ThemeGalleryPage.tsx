import { useState, useCallback } from "react";
import { themePages, galleryConfig } from "@/config";
import type { ImageItem } from "@/config";
import Navbar from "./Navbar";
import ImageDetailOverlay from "./ImageDetailOverlay";

type LayoutType = "editorial" | "portrait" | "fashion" | "cinematic" | "artistic";

interface Props {
  route: string;
}

function getLayoutType(route: string): LayoutType {
  switch (route) {
    case "/editorial": return "editorial";
    case "/portrait": return "portrait";
    case "/fashion": return "fashion";
    case "/cinematic": return "cinematic";
    case "/artistic": return "artistic";
    default: return "editorial";
  }
}

export default function ThemeGalleryPage({ route }: Props) {
  const theme = themePages.find((p) => p.route === route)!;
  const images = galleryConfig.images.filter((img) => img.category === theme.category);
  const layout = getLayoutType(route);
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  const handleImageClick = useCallback((image: ImageItem) => {
    setSelectedImage(image);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        color: "#000000",
      }}
    >
      <Navbar />

      {/* Header */}
      <header
        style={{
          paddingTop: "120px",
          paddingBottom: "60px",
          paddingLeft: "32px",
          paddingRight: "32px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(0,0,0,0.4)",
            marginBottom: "16px",
          }}
        >
          {theme.label} — {images.length} 件作品
        </div>
        <h1
          style={{
            fontFamily: "'Times New Roman', serif",
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 400,
            lineHeight: 1.1,
            margin: 0,
            marginBottom: "20px",
          }}
        >
          {theme.title}
        </h1>
        <p
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: "16px",
            lineHeight: 1.7,
            color: "rgba(0,0,0,0.55)",
            maxWidth: "540px",
            margin: 0,
          }}
        >
          {theme.subtitle}
        </p>
      </header>

      {/* Gallery Content */}
      <main
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          paddingLeft: "32px",
          paddingRight: "32px",
          paddingBottom: "100px",
        }}
      >
        {layout === "editorial" && <EditorialGrid images={images} onImageClick={handleImageClick} />}
        {layout === "portrait" && <PortraitGrid images={images} onImageClick={handleImageClick} />}
        {layout === "fashion" && <FashionGrid images={images} onImageClick={handleImageClick} />}
        {layout === "cinematic" && <CinematicGrid images={images} onImageClick={handleImageClick} />}
        {layout === "artistic" && <ArtisticGrid images={images} onImageClick={handleImageClick} />}
      </main>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "40px 32px",
          borderTop: "1px solid rgba(0,0,0,0.06)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: "12px",
          color: "rgba(0,0,0,0.35)",
        }}
      >
        {siteConfig.copyright}
      </footer>

      <ImageDetailOverlay image={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}

import { siteConfig } from "@/config";

/* ========== Editorial Grid: 3-column magazine cover wall ========== */
function EditorialGrid({
  images,
  onImageClick,
}: {
  images: ImageItem[];
  onImageClick: (img: ImageItem) => void;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "24px",
      }}
    >
      {images.map((img, i) => (
        <div
          key={i}
          style={{
            cursor: "pointer",
            transition: "transform 0.4s ease, box-shadow 0.4s ease",
          }}
          onClick={() => onImageClick(img)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <div style={{ overflow: "hidden", background: "#f5f5f5" }}>
            <img
              src={img.src}
              alt={img.title}
              style={{
                width: "100%",
                display: "block",
                aspectRatio: "3/4",
                objectFit: "cover",
                transition: "transform 0.6s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          </div>
          <div style={{ padding: "16px 0" }}>
            <div
              style={{
                fontFamily: "'Times New Roman', serif",
                fontSize: "16px",
                fontWeight: 400,
                marginBottom: "4px",
              }}
            >
              {img.title}
            </div>
            <div
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: "12px",
                color: "rgba(0,0,0,0.4)",
                lineHeight: 1.5,
              }}
            >
              {img.description.slice(0, 50)}...
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ========== Portrait Grid: 2-column gallery with featured first ========== */
function PortraitGrid({
  images,
  onImageClick,
}: {
  images: ImageItem[];
  onImageClick: (img: ImageItem) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Featured large image */}
      <div
        style={{ cursor: "pointer" }}
        onClick={() => onImageClick(images[0])}
      >
        <div style={{ overflow: "hidden", background: "#f5f5f5" }}>
          <img
            src={images[0].src}
            alt={images[0].title}
            style={{
              width: "100%",
              display: "block",
              maxHeight: "70vh",
              objectFit: "cover",
              transition: "transform 0.6s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          />
        </div>
        <div style={{ padding: "20px 0 8px" }}>
          <div
            style={{
              fontFamily: "'Times New Roman', serif",
              fontSize: "22px",
              fontWeight: 400,
              marginBottom: "6px",
            }}
          >
            {images[0].title}
          </div>
          <div
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: "14px",
              color: "rgba(0,0,0,0.5)",
              lineHeight: 1.6,
              maxWidth: "600px",
            }}
          >
            {images[0].description}
          </div>
        </div>
      </div>

      {/* Remaining in 2-col grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
        }}
      >
        {images.slice(1).map((img, i) => (
          <div
            key={i}
            style={{
              cursor: "pointer",
              transition: "transform 0.4s ease",
            }}
            onClick={() => onImageClick(img)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ overflow: "hidden", background: "#f5f5f5" }}>
              <img
                src={img.src}
                alt={img.title}
                style={{
                  width: "100%",
                  display: "block",
                  aspectRatio: "3/4",
                  objectFit: "cover",
                  transition: "transform 0.6s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
            </div>
            <div style={{ padding: "12px 0" }}>
              <div
                style={{
                  fontFamily: "'Times New Roman', serif",
                  fontSize: "15px",
                  fontWeight: 400,
                }}
              >
                {img.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ========== Fashion Grid: alternating left-right large images ========== */
function FashionGrid({
  images,
  onImageClick,
}: {
  images: ImageItem[];
  onImageClick: (img: ImageItem) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>
      {images.map((img, i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: i % 2 === 0 ? "1.2fr 0.8fr" : "0.8fr 1.2fr",
            gap: "40px",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => onImageClick(img)}
        >
          <div
            style={{
              order: i % 2 === 0 ? 0 : 1,
              overflow: "hidden",
              background: "#f5f5f5",
            }}
          >
            <img
              src={img.src}
              alt={img.title}
              style={{
                width: "100%",
                display: "block",
                aspectRatio: "3/4",
                objectFit: "cover",
                transition: "transform 0.6s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          </div>
          <div style={{ order: i % 2 === 0 ? 1 : 0, padding: "0 20px" }}>
            <div
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(0,0,0,0.3)",
                marginBottom: "16px",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <h2
              style={{
                fontFamily: "'Times New Roman', serif",
                fontSize: "clamp(24px, 3vw, 36px)",
                fontWeight: 400,
                margin: 0,
                marginBottom: "20px",
                lineHeight: 1.2,
              }}
            >
              {img.title}
            </h2>
            <p
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: "15px",
                lineHeight: 1.7,
                color: "rgba(0,0,0,0.55)",
                margin: 0,
              }}
            >
              {img.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ========== Cinematic Grid: wide cinematic cards ========== */
function CinematicGrid({
  images,
  onImageClick,
}: {
  images: ImageItem[];
  onImageClick: (img: ImageItem) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
      {images.map((img, i) => (
        <div
          key={i}
          style={{
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            background: "#000",
          }}
          onClick={() => onImageClick(img)}
        >
          <img
            src={img.src}
            alt={img.title}
            style={{
              width: "100%",
              display: "block",
              aspectRatio: "16/9",
              objectFit: "cover",
              opacity: 0.95,
              transition: "transform 0.8s ease, opacity 0.4s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.opacity = "0.95";
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "40px 32px 32px",
              background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
            }}
          >
            <div
              style={{
                fontFamily: "'Times New Roman', serif",
                fontSize: "clamp(20px, 2.5vw, 32px)",
                fontWeight: 400,
                color: "#ffffff",
                marginBottom: "8px",
                textShadow: "0 2px 12px rgba(0,0,0,0.4)",
              }}
            >
              {img.title}
            </div>
            <div
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: "13px",
                color: "rgba(255,255,255,0.7)",
                maxWidth: "500px",
                lineHeight: 1.5,
              }}
            >
              {img.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ========== Artistic Grid: masonry-style waterfall ========== */
function ArtisticGrid({
  images,
  onImageClick,
}: {
  images: ImageItem[];
  onImageClick: (img: ImageItem) => void;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "20px",
      }}
    >
      {images.map((img, i) => (
        <div
          key={i}
          style={{
            cursor: "pointer",
            transition: "transform 0.4s ease",
            marginTop: i % 2 === 1 ? "60px" : "0",
          }}
          onClick={() => onImageClick(img)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <div style={{ overflow: "hidden", background: "#f5f5f5" }}>
            <img
              src={img.src}
              alt={img.title}
              style={{
                width: "100%",
                display: "block",
                aspectRatio: i % 3 === 0 ? "3/4" : i % 3 === 1 ? "4/5" : "1/1",
                objectFit: "cover",
                transition: "transform 0.6s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          </div>
          <div style={{ padding: "16px 0" }}>
            <div
              style={{
                fontFamily: "'Times New Roman', serif",
                fontSize: "16px",
                fontWeight: 400,
                marginBottom: "6px",
              }}
            >
              {img.title}
            </div>
            <div
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: "13px",
                color: "rgba(0,0,0,0.45)",
                lineHeight: 1.6,
              }}
            >
              {img.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
