"use client";

import { useEffect } from "react";
import Loading from "@/components/shared/Loading";
import { Button } from "react-bootstrap";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    // console.error(error);
  }, [error]);

  return (
    <div className="container py-5">
      <h2 className="text-danger fw-bold mb-3">Something went wrong</h2>
      <p className="text-body-secondary mb-4">
        An unexpected error occurred. You can try again.
      </p>
      <div className="d-flex align-items-center gap-3">
        <Button onClick={() => reset()} className="border-0">Try again</Button>
        <Button variant="outline-secondary" onClick={() => window.location.reload()}>Reload page</Button>
      </div>
      <div className="mt-4">
        <pre className="small text-muted bg-body-tertiary p-3 rounded-2 overflow-auto" style={{maxHeight: 200}}>
{String(error?.message || "")}
        </pre>
      </div>
      <div className="mt-5">
        <Loading label="Attempting to recover..." />
      </div>
    </div>
  );
}
