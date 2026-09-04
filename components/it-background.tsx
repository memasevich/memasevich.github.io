"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  isServer: boolean;
};

type Packet = {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
};

export function ItBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: -1000, y: -1000, active: false };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // Generate network nodes
    const nodeCount = Math.min(48, Math.floor((width * height) / 28000));
    const nodes: Node[] = [];
    const colors = ["#4ade80", "#6da3c7", "#7da0b6", "#38bdf8"];

    for (let i = 0; i < nodeCount; i++) {
      const isServer = i % 8 === 0;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: isServer ? 3 : 1.8,
        color: colors[i % colors.length],
        isServer,
      });
    }

    // Active data packets travelling along lines
    const packets: Packet[] = [];
    const maxPackets = 12;

    let isVisible = true;
    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        animId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animId);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    let lastTime = performance.now();

    const render = (time: number) => {
      if (!isVisible) return;
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Update and draw nodes
      const maxDist = 135;
      const maxDistSq = maxDist * maxDist;

      const isLight = typeof document !== 'undefined' && document.documentElement.classList.contains("theme-light");
      const lineBase = isLight ? "2, 132, 199" : "109, 163, 199";
      const mouseBase = isLight ? "22, 163, 74" : "74, 222, 128";

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        // Bounce on boundaries
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // Mouse interaction (soft attraction)
        if (mouse.active) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 22500 && distSq > 400) {
            const force = (1 - Math.sqrt(distSq) / 150) * 0.08;
            n.x += dx * force;
            n.y += dy * force;
          }
        }

        // Draw node
        ctx.fillStyle = isLight ? (n.isServer ? "#0369a1" : "#0284c7") : n.color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();

        if (n.isServer) {
          ctx.strokeStyle = isLight ? "rgba(3, 105, 161, 0.4)" : "rgba(74, 222, 128, 0.25)";
          ctx.lineWidth = 1;
          ctx.strokeRect(n.x - 5, n.y - 5, 10, 10);
        }

        // Connect nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = m.x - n.x;
          const dy = m.y - n.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const alpha = (1 - Math.sqrt(distSq) / maxDist) * (isLight ? 0.22 : 0.18);
            ctx.strokeStyle = `rgba(${lineBase}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();

            // Randomly spawn data packets
            if (packets.length < maxPackets && Math.random() < 0.003) {
              packets.push({
                fromNode: i,
                toNode: j,
                progress: 0,
                speed: 0.6 + Math.random() * 0.8,
              });
            }
          }
        }

        // Connect with mouse
        if (mouse.active) {
          const mdx = mouse.x - n.x;
          const mdy = mouse.y - n.y;
          const mDistSq = mdx * mdx + mdy * mdy;
          if (mDistSq < 16000) {
            const mAlpha = (1 - Math.sqrt(mDistSq) / 126) * 0.22;
            ctx.strokeStyle = `rgba(${mouseBase}, ${mAlpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // Update and draw packets
      for (let p = packets.length - 1; p >= 0; p--) {
        const pkt = packets[p];
        pkt.progress += pkt.speed * dt;

        if (pkt.progress >= 1) {
          packets.splice(p, 1);
          continue;
        }

        const n1 = nodes[pkt.fromNode];
        const n2 = nodes[pkt.toNode];
        if (!n1 || !n2) {
          packets.splice(p, 1);
          continue;
        }

        const px = n1.x + (n2.x - n1.x) * pkt.progress;
        const py = n1.y + (n2.y - n1.y) * pkt.progress;

        ctx.fillStyle = isLight ? "#0369a1" : "#e1eaf0";
        ctx.shadowColor = isLight ? "#0284c7" : "#4ade80";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="it-bg-canvas"
      aria-hidden="true"
    />
  );
}
