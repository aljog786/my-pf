"use client";
import { FaArrowUp, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function Footer() {
  const socialIcons = [
    {
      logo: <FaLinkedin size={25} className="text-white" />,
      path: "https://www.linkedin.com/in/aljo-george-844911223/",
    },
    {
      logo: <FaInstagram size={25} className="text-white" />,
      path: "https://www.instagram.com/aljogeo6ge/",
    },
    {
      logo: <FaGithub size={25} className="text-white" />,
      path: "https://github.com/aljog786",
    },
    {
      logo: <FaSquareXTwitter size={25} className="text-white" />,
      path: "https://x.com/aljog786",
    },
  ];
  return (
    <footer className="bg-gradient text-white-50 py-3">
      <div className="container d-flex flex-row justify-content-between align-items-center gap-3">
        <div className="text-white mb-0">
          &lt;A/&gt;&copy;{new Date().getFullYear()}
        </div>

        <div className="d-flex gap-3 justify-content-center">
          {socialIcons.map((item, index) => (
            <a
              key={index}
              href={item.path}
              className="text-body-secondary fs-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.logo}
            </a>
          ))}
        </div>

        <a
          href="#top"
          className="btn btn-light text-primary p-2 rounded-circle shadow d-flex align-items-center justify-content-center"
          aria-label="Scroll to top"
        >
          <FaArrowUp size={25}/>
        </a>
      </div>
    </footer>
  );
}
