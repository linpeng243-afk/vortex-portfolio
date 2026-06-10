import { useEffect, useRef } from "react";

const TRAIL_COUNT = 5;

export default function useCustomCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.style.cursor = "none";

    const pos = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };
    const trails: { x: number; y: number }[] = Array.from({ length: TRAIL_COUNT }, () => ({ x: 0, y: 0 }));

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const hoverables = "a, button, [role='button'], input, textarea, select, .cursor-pointer";

    const onEnter = () => {
      ring.style.width = "48px";
      ring.style.height = "48px";
      ring.style.borderColor = "#ff4d00";
      ring.style.background = "rgba(255, 77, 0, 0.08)";
      dot.style.transform = "translate(-50%, -50%) scale(0.5)";
    };
    const onLeave = () => {
      ring.style.width = "28px";
      ring.style.height = "28px";
      ring.style.borderColor = "rgba(255, 77, 0, 0.5)";
      ring.style.background = "transparent";
      dot.style.transform = "translate(-50%, -50%) scale(1)";
    };

    let raf = 0;
    const tick = () => {
      // Dot: fast follow
      pos.x += (target.x - pos.x) * 0.2;
      pos.y += (target.y - pos.y) * 0.2;
      dot.style.left = `${pos.x}px`;
      dot.style.top = `${pos.y}px`;

      // Ring: slower follow
      ringPos.x += (target.x - ringPos.x) * 0.08;
      ringPos.y += (target.y - ringPos.y) * 0.08;
      ring.style.left = `${ringPos.x}px`;
      ring.style.top = `${ringPos.y}px`;

      // Trails: progressively slower, smaller, more transparent
      for (let i = 0; i < TRAIL_COUNT; i++) {
        const prev = i === 0 ? ringPos : trails[i - 1];
        const speed = 0.06 - i * 0.008;
        trails[i].x += (prev.x - trails[i].x) * Math.max(speed, 0.02);
        trails[i].y += (prev.y - trails[i].y) * Math.max(speed, 0.02);
        const el = trailRefs.current[i];
        if (el) {
          el.style.left = `${trails[i].x}px`;
          el.style.top = `${trails[i].y}px`;
        }
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    const interactives = document.querySelectorAll(hoverables);
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // Re-observe on DOM changes (for dynamic content)
    const mutationObserver = new MutationObserver(() => {
      const newInteractives = document.querySelectorAll(hoverables);
      newInteractives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      mutationObserver.disconnect();
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return { containerRef, dotRef, ringRef, trailRefs, TRAIL_COUNT };
}
