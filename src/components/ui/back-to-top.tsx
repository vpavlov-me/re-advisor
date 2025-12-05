"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "./button";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled more than 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Desktop version - fixed to bottom left */}
      <Button
        onClick={scrollToTop}
        size="icon"
        className={`
          hidden md:flex
          fixed bottom-8 left-8 z-50
          rounded-full shadow-lg
          transition-all duration-300
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16 pointer-events-none"}
        `}
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>

      {/* Mobile version - inside footer */}
      <div className="md:hidden">
        {isVisible && (
          <div className="flex justify-center py-4">
            <Button
              onClick={scrollToTop}
              variant="outline"
              className="gap-2"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
              Back to Top
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
