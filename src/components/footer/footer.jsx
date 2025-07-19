"use client";

import { FaArrowUp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className=" d-flex justify-content-around bg-gradient text-white-50 py-3 mt-auto">
      
        <h6 className="text-white">
          &lt;ALJO/&gt; &copy; {new Date().getFullYear()}
        </h6>

        <a
          href="#top"
          className="
            btn 
            btn-light 
            text-primary 
            p-2 
            rounded-circle 
            shadow 
            d-flex 
            align-items-center 
            justify-content-center
          "
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </a>
    </footer>
  );
}
