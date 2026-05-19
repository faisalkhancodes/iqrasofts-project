import { useEffect, useState } from "react";
import { fetchProjects } from "../utils/api.js";

const CERTS = [
  { text: "10K+ LinkedIn Professional Network", icon: "fab fa-linkedin" },
  {
    text: "Google Cybersecurity Professional Certificate",
    icon: "fas fa-shield-alt",
  },
  {
    text: "Certified Phishing Prevention Specialist (CPPS)",
    icon: "fas fa-lock",
  },
  { text: "Responsive Web Design", icon: "fas fa-laptop-code" },
  {
    text: "JavaScript Algorithms and Data Structures",
    icon: "fas fa-code",
  },
  { text: "Back End Development and APIs", icon: "fas fa-server" },
  { text: "Information Security", icon: "fas fa-user-shield" },
];

const FALLBACK_PROJECTS = [
  {
    slug: "quote-generator",
    title: "Quote Generator",
    category: "web",
    categoryLabel: "Web Application / Productivity",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    imageAlt: "Quote Generator",
    description: "A dynamic quote engine that delivers curated inspiration. It features real-time DOM updates, seamless social sharing, and a responsive, high-performance interface.",
    tags: ["JavaScript", "API Integration", "UI/UX Design"],
    liveDemo: "https://iquotegenerater.netlify.app/",
    github: "https://github.com/faisalkhancodes/quote-generator"
  },
  {
    slug: "iqra-luxe-ecommerce",
    title: "Iqra Luxe eCommerce",
    category: "web",
    categoryLabel: "E-commerce / Premium",
    image: "https://iqraluxe.netlify.app/apple-touch-icon.png",
    imageAlt: "Iqra Luxe eCommerce",
    description: "A premium, fully responsive eCommerce platform featuring advanced product filtering, shopping cart management, and a seamless checkout experience.",
    tags: ["Next.js", "E-commerce", "Responsive"],
    liveDemo: "https://iqraluxe.netlify.app/",
    github: "https://github.com/faisalkhancodes/ecommerce-devhub-project"
  },
  {
    slug: "iqrasoft-official-website",
    title: "IqraSoft Official Website",
    category: "web",
    categoryLabel: "Software House Web",
    image: "/pictures/iqrasoftlogo.png",
    imageAlt: "IqraSoft",
    description: "Built using modern web technologies, this website demonstrates professional web design, responsive layout, and interactive user experience. It highlights our services and serves as our official online presence.",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive"],
    liveDemo: "https://IqraSofts.com",
    github: "https://github.com/faisalkhancodes/IqraSofts.com"
  },
  {
    slug: "tic-tac-toe",
    title: "Tic-Tac-Toe Game",
    category: "game",
    categoryLabel: "Gaming / Web App",
    image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    imageAlt: "Tic-Tac-Toe Game",
    description: "A sleek, interactive Tic-Tac-Toe game built with pure Vanilla JavaScript. Allows two players to compete with real-time win detection and a modern UI.",
    tags: ["Vanilla JS", "HTML/CSS", "Game Logic"],
    liveDemo: "https://tic-tac-toe-gamei.netlify.app/",
    github: "https://github.com/faisalkhancodes/Tic-tac-Toe--game#tic-tac-toe--game"
  },
  {
    slug: "modern-web-calculator",
    title: "Modern Web Calculator",
    category: "app",
    categoryLabel: "Utilities / JS",
    image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    imageAlt: "Simple Calculator",
    description: "A responsive web calculator that performs addition, subtraction, multiplication, and division. Perfect for quick calculations with a clean user interface.",
    tags: ["C++", "JavaScript", "HTML/CSS"],
    liveDemo: "https://samplecalculatori.netlify.app/",
    github: "https://github.com/faisalkhancodes/Simple-Calculator"
  }
];

export default function Projects() {
  const [projectsList, setProjectsList] = useState(FALLBACK_PROJECTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects()
      .then((res) => {
        if (res?.data?.length) setProjectsList(res.data);
      })
      .catch(() => {
        // Fallback handles errors
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="page-hero reveal">
        <div className="container">
          <div className="page-hero-content">
            <h1>Our Projects</h1>
            <p>A showcase of innovation, precision, and digital excellence</p>
          </div>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="container">
          {loading ? (
            <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-light)" }}>
              <i className="fas fa-spinner fa-spin" style={{ fontSize: "2rem" }} />
              <p style={{ marginTop: "1rem" }}>Loading projects...</p>
            </div>
          ) : (
            <div className="portfolio-grid" id="portfolioGrid">
              {projectsList.map((project) => (
                <div key={project.slug} className="portfolio-card reveal" data-category={project.category}>
                  <div className="project-image">
                    <img
                      src={project.image}
                      alt={project.imageAlt || project.title}
                      onError={(e) => {
                        if (project.slug === "iqra-luxe-ecommerce") {
                           e.currentTarget.src = "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2064&auto=format&fit=crop&w=800&q=80";
                        }
                      }}
                    />
                    <div className="project-overlay">
                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="view-project-btn"
                        >
                          Live View
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="view-project-btn"
                          style={{ marginLeft: 10 }}
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="project-info">
                    <span className="project-category">{project.categoryLabel}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tags">
                      {(project.tags || []).map(tag => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <hr className="section-divider" />

          <div className="section-header reveal" style={{ marginTop: "5rem" }}>
            <h2>Certifications & Achievements</h2>
            <p>
              Professional recognitions and verified expertise in modern
              technologies
            </p>
          </div>

          <div className="cert-container">
            {CERTS.map(({ text, icon }) => (
              <div key={text} className="cert-card reveal">
                <span>{text}</span> <i className={icon} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
