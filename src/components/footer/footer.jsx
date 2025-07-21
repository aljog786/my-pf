"use client";
import { FaArrowUp, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gradient text-white-50 py-3">
      <div className="container d-flex flex-row justify-content-between align-items-center gap-3">
        {/* Left: Branding */}
        <div className="text-white mb-0">
          &lt;A/&gt;&copy;{new Date().getFullYear()}
        </div>

        {/* Center: Social Icons */}
        <div className="d-flex gap-3 justify-content-center">
          {[FaLinkedin, FaSquareXTwitter, FaInstagram, FaGithub].map(
            (Icon, i) => (
              <a
                key={i}
                href="#"
                className="text-body-secondary fs-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon />
              </a>
            )
          )}
        </div>

        {/* Right: Scroll to top */}
        <a
          href="#top"
          className="btn btn-light text-primary p-2 rounded-circle shadow d-flex align-items-center justify-content-center"
          aria-label="Scroll to top"
          style={{ width: "40px", height: "40px" }} // uniform size
        >
          <FaArrowUp />
        </a>
      </div>
    </footer>
  );
}
