import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

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

  return (
    <>
      <header>
        <div className="container">
          <nav>
            <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
              <img src="/pictures/iqrasoftlogo.jpeg" alt="IqraSoft" />
            </Link>
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
            <button
              type="button"
              className="mobile-menu-btn"
              aria-label="Menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <i className="fas fa-bars" />
            </button>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div className="container">
          <p>
            © {new Date().getFullYear()} IqraSoft — React · Node.js · MongoDB ·
            Python AI
          </p>
        </div>
      </footer>
    </>
  );
}
