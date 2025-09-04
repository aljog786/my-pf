"use client";

import React from "react";
import { Spinner } from "react-bootstrap";

export default function Loading({ label = "Loading...", className = "" }) {
  return (
    <div className={`d-flex align-items-center justify-content-center py-5 ${className}`} role="status" aria-live="polite" aria-busy="true">
      <Spinner animation="border" role="status" className="me-2" aria-hidden="true" />
      <span className="fw-medium text-secondary">{label}</span>
    </div>
  );
}
