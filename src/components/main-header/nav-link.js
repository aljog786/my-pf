"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children, className = "", onClick }) {
  
  const path = usePathname();
  const isActive = path === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={`nav-link fs-5 ${className} ${
        isActive ? "fw-bold text-primary" : ""
      }`}
    >
      {children}
    </Link>
  );
}
