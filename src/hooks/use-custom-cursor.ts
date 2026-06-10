import { useEffect, useRef } from "react";

export default function useCustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    // Hide default cursor on body
    document.body.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const hoverables = "a, button, [role='button'], input, textarea, select, .cursor-pointer";

    const onEnter = () => el.classList.add("hovering");
    const onLeave = () => el.classList.remove("hovering");

    let raf = 0;
    const tick = () => {
      // Lerp for smooth follow
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      el.style.left = `${pos.current.x}px`;
      el.style.top = `${pos.current.y}px`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    // Observe for hoverable elements
    const interactives = document.querySelectorAll(hoverables);
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return cursorRef;
}
