import { Link, useLocation } from "react-router";
import { siteConfig, themePages } from "@/config";

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 32px",
        background: isHome
          ? "transparent"
          : "rgba(255,255,255,0.92)",
        backdropFilter: isHome ? "none" : "blur(12px)",
        borderBottom: isHome ? "none" : "1px solid rgba(0,0,0,0.06)",
        transition: "all 0.3s ease",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          fontFamily: "'Times New Roman', serif",
          fontSize: "18px",
          fontWeight: 400,
          color: "#000000",
          letterSpacing: "0.05em",
          textDecoration: "none",
          transition: "opacity 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        {siteConfig.brandName}
      </Link>

      {/* Theme Links */}
      {!isHome && (
        <div
          style={{
            display: "flex",
            gap: "28px",
            alignItems: "center",
          }}
        >
          {themePages.map((page) => (
            <Link
              key={page.route}
              to={page.route}
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: "13px",
                fontWeight: location.pathname === page.route ? 500 : 400,
                color: "#000000",
                textDecoration: "none",
                opacity: location.pathname === page.route ? 1 : 0.5,
                transition: "opacity 0.3s ease",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.opacity =
                  location.pathname === page.route ? "1" : "0.5")
              }
            >
              {page.label}
            </Link>
          ))}
        </div>
      )}

      {/* Right link */}
      <Link
        to="/info"
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: "14px",
          fontWeight: 400,
          color: "#000000",
          textDecoration: "none",
          transition: "opacity 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        关于
      </Link>
    </nav>
  );
}
