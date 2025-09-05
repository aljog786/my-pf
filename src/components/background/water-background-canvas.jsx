"use client";

import { useEffect, useRef, useState } from "react";

// Canvas-based procedural water background with bubbles and foam
// - Honors prefers-reduced-motion
// - Scales to devicePixelRatio for crisp rendering
// - Uses summed sine waves for water surface, with foam highlights
// - Lightweight and dependency-free

export default function WaterBackgroundCanvas() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const bubblesRef = useRef([]);
  const timeRef = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Config (tuned for visuals vs performance)
  const CONFIG = {
    targetFPS: 60,
    baseWaveAmp: 14,
    baseWaveSpeed: 0.6,
    foamThreshold: 0.26, // higher -> less foam
    bubbleCountBase: 70,
    bubbleMin: 24,
    bubbleMax: 110,
    bubbleSpeedY: [12, 32],
    bubbleRadius: [1, 4],
  };

  useEffect(() => {
    const mq = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(!!mq.matches);
    if (mq) {
      onChange();
      mq.addEventListener?.("change", onChange);
    }
    return () => mq?.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const { innerWidth, innerHeight } = window;
      width = innerWidth;
      height = innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initBubbles();
    };

    const rand = (min, max) => Math.random() * (max - min) + min;

  // Helper: map shape -> vertical speed multiplier
  const shapeSpeedMul = (shape) => {
    switch (shape) {
      case "circle":
        return 1;
      case "triangle":
        return 0.9;
      case "square":
        return 0.85;
      case "diamond":
        return 1.1; // fastest
      case "star":
        return 0.95;
      default: {
        // For regular polygons like pentagon, hexagon, ... decagon
        const match = /(\d+)gon$/.exec(shape || "");
        if (match) {
          const sides = Math.max(3, Math.min(12, parseInt(match[1], 10) || 6));
          // Slightly slower for more sides
          return 1 - Math.min(0.3, (sides - 3) * 0.025);
        }
        return 1;
      }
    }
  };

  // Helpers to draw shapes centered at (0,0)
  const drawRegularPolygon = (ctx, radius, sides) => {
    const step = (Math.PI * 2) / sides;
    ctx.moveTo(radius, 0);
    for (let i = 1; i < sides; i++) {
      const a = step * i;
      ctx.lineTo(Math.cos(a) * radius, Math.sin(a) * radius);
    }
    ctx.closePath();
  };

  const drawStarShape = (ctx, outerR, points = 5) => {
    const innerR = outerR * 0.5;
    const step = Math.PI / points;
    ctx.moveTo(0, -outerR);
    for (let i = 1; i < points * 2; i++) {
      const r = i % 2 === 0 ? outerR : innerR;
      const a = -Math.PI / 2 + step * i;
      ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    ctx.closePath();
  };

    const initBubbles = () => {
      const area = width * height;
      const base = Math.floor(area / 22000); // density scaler by viewport
      const count = reducedMotion ? Math.max(CONFIG.bubbleMin, Math.floor(base * 0.4)) : Math.min(CONFIG.bubbleMax, base + CONFIG.bubbleCountBase);
      const shapes = ["circle", "triangle", "square", "diamond","pentagon","hexagon","heptagon","octagon","nonagon","decagon","star"];
      bubblesRef.current = Array.from({ length: count }).map(() => {
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const speedMul = shapeSpeedMul(shape);
        let r = rand(CONFIG.bubbleRadius[0], CONFIG.bubbleRadius[1]) * (reducedMotion ? 0.8 : 1);
        // Make non-circular shapes a bit larger for visibility
        if (shape !== "circle") r *= 1.35;
        let alpha = rand(0.28, 0.6); // ensure a higher minimum opacity
        return {
          x: rand(0, width),
          y: rand(height * 0.4, height * 1.05),
          r,
          vy: -rand(CONFIG.bubbleSpeedY[0], CONFIG.bubbleSpeedY[1]) / (reducedMotion ? 120 : 60),
          drift: rand(-0.2, 0.2),
          alpha,
          shape,
          speedMul,
          rot: rand(0, Math.PI * 2),
          vr: rand(-0.01, 0.01),
        };
      });
    };

    const clamp01 = (v) => Math.max(0, Math.min(1, v));

    // Multi-wave height function for y at x, t
    const heightAt = (x, t) => {
      const nx = x / width;
      // 3 summed sine waves with varying freq/phase
      const w1 = Math.sin((nx * Math.PI * 2.2) + t * (CONFIG.baseWaveSpeed * 0.8));
      const w2 = Math.sin((nx * Math.PI * 1.2 + 1.7) + t * (CONFIG.baseWaveSpeed * 1.3));
      const w3 = Math.sin((nx * Math.PI * 3.1 + 0.7) + t * (CONFIG.baseWaveSpeed * 0.5));
      const amp = CONFIG.baseWaveAmp * (reducedMotion ? 0.5 : 1);
      return (w1 * 0.6 + w2 * 0.3 + w3 * 0.1) * amp;
    };

    // Derivative to estimate slope for foam
    const slopeAt = (x, t) => {
      const eps = 1;
      return (heightAt(x + eps, t) - heightAt(x - eps, t)) / (2 * eps);
    };

    const drawBackground = () => {
      // Depth gradient sky-to-sea
      const g = ctx.createLinearGradient(0, 0, 0, height);
      if (document.documentElement.getAttribute("data-bs-theme") === "dark") {
        g.addColorStop(0, "#0b1020");
        g.addColorStop(1, "#0b2447");
      } else {
        g.addColorStop(0, "#7dd3fc");
        g.addColorStop(1, "#1e40af");
      }
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);
    };

    const drawWaves = (t) => {
      const baseLine = height * 0.58;

      // water color gradient
      const waterGrad = ctx.createLinearGradient(0, baseLine - 80, 0, height);
      waterGrad.addColorStop(0, "rgba(125, 211, 252, 0.18)");
      waterGrad.addColorStop(0.5, "rgba(59, 130, 246, 0.22)");
      waterGrad.addColorStop(1, "rgba(30, 64, 175, 0.28)");

      ctx.fillStyle = waterGrad;
      ctx.beginPath();
      ctx.moveTo(0, height);

      const step = 6; // sampling step for the path
      for (let x = 0; x <= width; x += step) {
        const y = baseLine + heightAt(x, t);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // Foam highlights along crests
      if (!reducedMotion) {
        ctx.lineWidth = 1.4;
        ctx.strokeStyle = "rgba(255,255,255,0.18)";
        ctx.beginPath();
        for (let x = 0; x <= width; x += step) {
          const y = baseLine + heightAt(x, t);
          const slope = Math.abs(slopeAt(x, t));
          if (slope > CONFIG.foamThreshold) {
            ctx.moveTo(x, y - 1.5);
            ctx.lineTo(x, y - 1.5 - clamp01((slope - CONFIG.foamThreshold) * 20) * 6);
          }
        }
        ctx.stroke();
      }
    };

    const drawBubbles = (t) => {
      const bubbles = bubblesRef.current;
      ctx.save();
      for (let b of bubbles) {
        // Update motion
        b.y += b.vy * (b.speedMul || 1); // vy is negative
        b.x += Math.sin(t * 0.6 + (b.y * 0.02)) * b.drift;
        b.rot += b.vr || 0;

        // Respawn at bottom when off-screen
        if (b.y + b.r < -20) {
          const shapes = ["circle", "triangle", "square", "diamond","pentagon","hexagon","heptagon","octagon","nonagon","decagon","star"];
          const shape = shapes[Math.floor(Math.random() * shapes.length)];
          const speedMul = shapeSpeedMul(shape);
          b.y = height + Math.random() * 60;
          b.x = Math.random() * width;
          b.r = rand(CONFIG.bubbleRadius[0], CONFIG.bubbleRadius[1]) * (reducedMotion ? 0.8 : 1);
          if (shape !== "circle") b.r *= 1.35;
          b.vy = -rand(CONFIG.bubbleSpeedY[0], CONFIG.bubbleSpeedY[1]) / (reducedMotion ? 120 : 60);
          b.drift = rand(-0.2, 0.2);
          b.alpha = rand(0.28, 0.6);
          b.shape = shape;
          b.speedMul = speedMul;
          b.rot = rand(0, Math.PI * 2);
          b.vr = rand(-0.01, 0.01);
        }

        // Draw
        ctx.globalAlpha = b.alpha;
        ctx.fillStyle = "#fff";
        ctx.save();
        ctx.translate(b.x, b.y);
        if (b.shape && b.shape !== "circle") ctx.rotate(b.rot || 0);
        ctx.beginPath();
        switch (b.shape) {
          case "triangle": {
            const s = b.r * 2;
            // Equilateral triangle centered at 0,0
            const h = (Math.sqrt(3) / 2) * s;
            ctx.moveTo(0, -h / 2);
            ctx.lineTo(-s / 2, h / 2);
            ctx.lineTo(s / 2, h / 2);
            ctx.closePath();
            break;
          }
          case "square": {
            const s = b.r * 2;
            ctx.rect(-s / 2, -s / 2, s, s);
            break;
          }
          case "diamond": {
            const s = b.r * 2;
            ctx.moveTo(0, -s / 1.4);
            ctx.lineTo(s / 1.4, 0);
            ctx.lineTo(0, s / 1.4);
            ctx.lineTo(-s / 1.4, 0);
            ctx.closePath();
            break;
          }
          case "pentagon":
            drawRegularPolygon(ctx, b.r, 5);
            break;
          case "hexagon":
            drawRegularPolygon(ctx, b.r, 6);
            break;
          case "heptagon":
            drawRegularPolygon(ctx, b.r, 7);
            break;
          case "octagon":
            drawRegularPolygon(ctx, b.r, 8);
            break;
          case "nonagon":
            drawRegularPolygon(ctx, b.r, 9);
            break;
          case "decagon":
            drawRegularPolygon(ctx, b.r, 10);
            break;
          case "star":
            drawStarShape(ctx, b.r * 1.3, 5);
            break;
          case "circle":
          default: {
            ctx.arc(0, 0, b.r, 0, Math.PI * 2);
            break;
          }
        }
        ctx.fill();
        ctx.restore();
      }
      ctx.restore();
    };

    let lastTime = 0;
    const tick = (now) => {
      const targetMs = 1000 / (reducedMotion ? 30 : CONFIG.targetFPS);
      if (!lastTime) lastTime = now;
      const dt = now - lastTime;
      if (dt < targetMs) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      lastTime = now;

      timeRef.current += (reducedMotion ? 0.008 : 0.016); // time scalar
      const t = timeRef.current;

      drawBackground();
      drawWaves(t);
      drawBubbles(t);

      rafRef.current = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion]);

  return (
    <div
      className="position-fixed w-100 h-100 top-0 start-0 overflow-hidden z-0"
      style={{ pointerEvents: "none" }}
      aria-hidden
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
