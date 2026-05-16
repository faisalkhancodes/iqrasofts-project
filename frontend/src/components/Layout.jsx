import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useScrollReveal, useSmoothHashLinks } from "../hooks/useScrollReveal.js";

const nav = [
  { to: "/", label: "Home", end: true },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/team", label: "Team" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  useScrollReveal();
  useSmoothHashLinks();

  return (
    <>
      <header>
        <div className="container">
          <nav>
            <div className="logo">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                style={{ display: "flex", alignItems: "center" }}
              >
                <img src="/pictures/iqrasoftlogo.png" alt="IqraSoft" />
              </Link>
            </div>
            <ul className={`nav-links${menuOpen ? " active" : ""}`}>
              {nav.map(({ to, label, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div
              className="mobile-menu-btn"
              onClick={() => setMenuOpen((o) => !o)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setMenuOpen((o) => !o);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <i className="fas fa-bars" />
            </div>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer>
        <div className="container footer-content">
          <p>&copy; 2026 IqraSoft. All Rights Reserved.</p>
          <div className="social-links">
            <a
              href="https://www.facebook.com/share/1CxVfo9Qvm/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f" />
            </a>
            <a
              href="https://www.linkedin.com/company/iqrasoftscom/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin-in" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
