"use client";

import React from "react";
import "./WaterLoader.scss";

/**
 * WaterLoader
 * A modern, realistic water loading animation using layered SVG waves, bubbles,
 * and a glossy highlight. Fully accessible and customizable via props.
 */
export default function WaterLoader({
  label = "Loading...",
  className = "",
  size = 160,
}) {
  return (
    <div
      className={`water-loader d-flex flex-column align-items-center justify-content-center ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="water-loader__container"
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        <svg
          className="water-loader__svg"
          viewBox="0 0 200 200"
          width={size}
          height={size}
          focusable="false"
        >
          <defs>
            <linearGradient id="wl-grad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="70%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
            <radialGradient id="wl-gloss" cx="30%" cy="25%" r="60%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
              <stop offset="60%" stopColor="rgba(255,255,255,0.15)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
            <clipPath id="wl-clip">
              <circle cx="100" cy="100" r="90" />
            </clipPath>
            <filter id="wl-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0b173d" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Outer ring */}
          <circle cx="100" cy="100" r="94" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />

          {/* Container */}
          <g clipPath="url(#wl-clip)" filter="url(#wl-shadow)">
            {/* Background water */}
            <rect x="0" y="0" width="200" height="200" fill="url(#wl-grad)" />

            {/* Wave layers */}
            <g className="wl-waves">
              {/* Deep wave */}
              <path
                className="wl-wave wl-wave--back"
                d="M -200 120 C -150 110 -100 130 -50 120 C 0 110 50 130 100 120 C 150 110 200 130 250 120 L 250 200 L -200 200 Z"
                fill="#1e40af"
                opacity="0.45"
              />
              {/* Mid wave */}
              <path
                className="wl-wave wl-wave--mid"
                d="M -200 115 C -150 105 -100 125 -50 115 C 0 105 50 125 100 115 C 150 105 200 125 250 115 L 250 200 L -200 200 Z"
                fill="#2563eb"
                opacity="0.55"
              />
              {/* Front wave */}
              <path
                className="wl-wave wl-wave--front"
                d="M -200 110 C -150 100 -100 120 -50 110 C 0 100 50 120 100 110 C 150 100 200 120 250 110 L 250 200 L -200 200 Z"
                fill="#60a5fa"
                opacity="0.65"
              />
            </g>

            {/* Bubbles */}
            <g className="wl-bubbles" fill="rgba(255,255,255,0.75)">
              <circle className="wl-bubble" cx="40" cy="170" r="3" />
              <circle className="wl-bubble" cx="70" cy="180" r="2" />
              <circle className="wl-bubble" cx="110" cy="175" r="2.5" />
              <circle className="wl-bubble" cx="150" cy="185" r="2" />
            </g>

            {/* Glossy highlight */}
            <ellipse cx="80" cy="55" rx="60" ry="28" fill="url(#wl-gloss)" />
          </g>

          {/* Rim highlight */}
          <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
        </svg>
      </div>

      <span className="water-loader__label fw-medium text-secondary mt-3">{label}</span>
    </div>
  );
}
