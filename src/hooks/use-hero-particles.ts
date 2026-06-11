import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
}

export default function useHeroParticles(count = 70) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
    const particleCount = isMobile ? Math.min(count, 25) : count;
    const maxDpr = isMobile ? 2 : window.devicePixelRatio;

    let w = 0;
    let h = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let visible = true;
    let mouseX = -1000;
    let mouseY = -1000;
    let glowX = -1000;
    let glowY = -1000;

    function resize() {
      const dpr = Math.min(maxDpr, window.devicePixelRatio);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.scale(dpr, dpr);
    }

    function init() {
      resize();
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 1,
        a: Math.random() * 0.5 + 0.3,
      }));
    }

    function draw() {
      if (!visible) {
        raf = requestAnimationFrame(draw);
        return;
      }
      ctx!.clearRect(0, 0, w, h);

      // Lerp glow position to mouse
      glowX += (mouseX - glowX) * 0.05;
      glowY += (mouseY - glowY) * 0.05;

      // Draw mouse glow
      if (glowX > 0 && glowY > 0) {
        const grad = ctx!.createRadialGradient(glowX, glowY, 0, glowX, glowY, 200);
        grad.addColorStop(0, "rgba(255, 77, 0, 0.12)");
        grad.addColorStop(1, "rgba(255, 77, 0, 0)");
        ctx!.fillStyle = grad;
        ctx!.fillRect(glowX - 200, glowY - 200, 400, 400);
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 77, 0, ${p.a})`;
        ctx!.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(q.x, q.y);
            ctx!.strokeStyle = `rgba(255, 77, 0, ${0.12 * (1 - dist / 100)})`;
            ctx!.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }

    const observer = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0 }
    );

    init();
    draw();
    observer.observe(canvas);
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    if (!isMobile) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      if (!isMobile) window.removeEventListener("mousemove", onMouseMove);
    };
  }, [count]);

  return canvasRef;
}
