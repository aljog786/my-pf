"use client";
import { FaSun } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { isDark, toggle } = useTheme();

  return (
    <button onClick={toggle} className="btn border-0 bg-transparent p-0">
      {isDark ? (
        <FaSun size={20} className="text-secondary" />
      ) : (
        <FaMoon size={20} className="text-secondary" />
      )}
    </button>
  );
}
