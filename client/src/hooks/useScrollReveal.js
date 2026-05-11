import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const reveal = () => {
      document
        .querySelectorAll(".reveal, .reveal-left, .reveal-right")
        .forEach((el) => {
          const top = el.getBoundingClientRect().top;
          if (top < window.innerHeight - 150) el.classList.add("active");
        });
    };

    window.addEventListener("scroll", reveal, { passive: true });
    window.addEventListener("load", reveal);
    const t = requestAnimationFrame(reveal);
    return () => {
      cancelAnimationFrame(t);
      window.removeEventListener("scroll", reveal);
      window.removeEventListener("load", reveal);
    };
  }, [pathname]);
}

export function useSmoothHashLinks() {
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest?.("a[href^='#']");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}
