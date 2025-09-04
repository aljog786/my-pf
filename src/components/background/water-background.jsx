"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const WaterBackground = () => {
  const [bubbles, setBubbles] = useState([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  const waveRef1 = useRef(null);
  const waveRef2 = useRef(null);
  const waveRef3 = useRef(null);

  useEffect(() => {
    // Detect reduced motion preference
    const mq = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReducedMotion(!!mq.matches);
    if (mq) {
      handleChange();
      mq.addEventListener?.("change", handleChange);
    }

    generateBubbles(!!mq?.matches);
    const handleResize = () => generateBubbles();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      mq?.removeEventListener?.("change", handleChange);
    };
  }, []);

  useGSAP(() => {
    if (reducedMotion) return; // Avoid heavy animations
    const waveMotion = (ref, x = "-100%", duration = 30, delay = 0) => {
      gsap.to(ref, {
        x,
        duration,
        ease: "none",
        repeat: -1,
        delay,
      });
    };

    if (waveRef1.current && waveRef2.current && waveRef3.current) {
      waveMotion(waveRef1.current, "-100%", 25, 0);
      waveMotion(waveRef2.current, "-100%", 30, 12.5);
      waveMotion(waveRef3.current, "-100%", 40, 8);
    }
  }, [reducedMotion]);

  const generateBubbles = (reduce = reducedMotion) => {
    const base = Math.floor((window.innerWidth * window.innerHeight) / 18000);
    const count = reduce ? Math.max(4, Math.floor(base * 0.25)) : base;
    const newBubbles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: reduce ? Math.random() * 8 + 4 : Math.random() * 12 + 6,
      x: Math.random() * 100,
      y: Math.random() * 30 + 70,
      duration: reduce ? Math.random() * 4 + 3 : Math.random() * 8 + 4,
      blur: reduce ? Math.random() * 1.5 : Math.random() * 3,
      opacity: reduce ? Math.random() * 0.4 + 0.3 : Math.random() * 0.6 + 0.4,
    }));
    setBubbles(newBubbles);
  };

  return (
    <div
      className="position-fixed w-100 h-100 top-0 start-0 overflow-hidden z-0"
      style={{ pointerEvents: "none" }}
    >
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: "linear-gradient(to bottom, #7dd3fc, #1e40af)",
          transition: "all 0.5s ease",
        }}
      />

      <div
        ref={waveRef1}
        className="position-absolute w-100"
        style={{
          height: "10rem",
          backgroundColor: "rgba(96, 165, 250, 0.3)",
          filter: "blur(2rem)",
          borderRadius: "40%",
          top: 0,
        }}
      />
      <div
        ref={waveRef2}
        className="position-absolute w-100"
        style={{
          height: "12rem",
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          filter: "blur(60px)",
          borderRadius: "45%",
          top: "2rem",
        }}
      />
      <div
        ref={waveRef3}
        className="position-absolute w-100"
        style={{
          height: "13rem",
          backgroundColor: "rgba(37, 99, 235, 0.1)",
          filter: "blur(80px)",
          borderRadius: "50%",
          top: "4rem",
        }}
      />

      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="position-absolute rounded-circle bg-white"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            animation: `rise ${bubble.duration}s linear infinite`,
            filter: `blur(${bubble.blur}px)`,
            opacity: bubble.opacity,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes rise {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-120vh);
          }
        }
      `}</style>
    </div>
  );
};

export default WaterBackground;
