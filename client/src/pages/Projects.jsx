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

export default function Projects() {
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
          <div className="portfolio-grid" id="portfolioGrid">
            <div className="portfolio-card reveal" data-category="web">
              <div className="project-image">
                <img
                  src="https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Quote Generator"
                />
                <div className="project-overlay">
                  <a
                    href="https://iquotegenerater.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-project-btn"
                  >
                    Live Demo
                  </a>
                  <a
                    href="https://github.com/faisalkhancodes/quote-generator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-project-btn"
                    style={{ marginLeft: 10 }}
                  >
                    GitHub
                  </a>
                </div>
              </div>
              <div className="project-info">
                <span className="project-category">
                  Web Application / Productivity
                </span>
                <h3>Quote Generator</h3>
                <p>
                  A dynamic quote engine that delivers curated inspiration. It
                  features real-time DOM updates, seamless social sharing, and a
                  responsive, high-performance interface.
                </p>
                <div className="project-tags">
                  <span>JavaScript</span>
                  <span>API Integration</span>
                  <span>UI/UX Design</span>
                </div>
              </div>
            </div>

            <div className="portfolio-card reveal" data-category="web">
              <div className="project-image">
                <img
                  src="https://iqraluxe.netlify.app/apple-touch-icon.png"
                  alt="Iqra Luxe eCommerce"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2064&auto=format&fit=crop&w=800&q=80";
                  }}
                />
                <div className="project-overlay">
                  <a
                    href="https://iqraluxe.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-project-btn"
                  >
                    Live View
                  </a>
                  <a
                    href="https://github.com/faisalkhancodes/ecommerce-devhub-project"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-project-btn"
                    style={{ marginLeft: 10 }}
                  >
                    GitHub
                  </a>
                </div>
              </div>
              <div className="project-info">
                <span className="project-category">E-commerce / Premium</span>
                <h3>Iqra Luxe eCommerce</h3>
                <p>
                  A premium, fully responsive eCommerce platform featuring advanced
                  product filtering, shopping cart management, and a seamless
                  checkout experience.
                </p>
                <div className="project-tags">
                  <span>Next.js</span>
                  <span>E-commerce</span>
                  <span>Responsive</span>
                </div>
              </div>
            </div>

            <div className="portfolio-card reveal" data-category="web">
              <div className="project-image">
                <img src="/pictures/iqrasoftlogo.jpeg" alt="IqraSoft" />
                <div className="project-overlay">
                  <a
                    href="https://IqraSofts.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-project-btn"
                  >
                    Live View
                  </a>
                  <a
                    href="https://github.com/faisalkhancodes/IqraSofts.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-project-btn"
                    style={{ marginLeft: 10 }}
                  >
                    GitHub
                  </a>
                </div>
              </div>
              <div className="project-info">
                <span className="project-category">Software House Web</span>
                <h3>IqraSoft Official Website</h3>
                <p>
                  Built using modern web technologies, this website demonstrates
                  professional web design, responsive layout, and interactive user
                  experience. It highlights our services and serves as our official
                  online presence.
                </p>
                <div className="project-tags">
                  <span>HTML5</span>
                  <span>CSS3</span>
                  <span>JavaScript</span>
                  <span>Responsive</span>
                </div>
              </div>
            </div>

            <div className="portfolio-card reveal" data-category="web">
              <div className="project-image">
                <img
                  src="https://images.unsplash.com/photo-1611996575749-79a3a250f948?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Tic-Tac-Toe Game"
                />
                <div className="project-overlay">
                  <a
                    href="https://tic-tac-toe-gamei.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-project-btn"
                  >
                    Play Game
                  </a>
                  <a
                    href="https://github.com/faisalkhancodes/Tic-tac-Toe--game#tic-tac-toe--game"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-project-btn"
                    style={{ marginLeft: 10 }}
                  >
                    GitHub
                  </a>
                </div>
              </div>
              <div className="project-info">
                <span className="project-category">Gaming / Web App</span>
                <h3>Tic-Tac-Toe Game</h3>
                <p>
                  A sleek, interactive Tic-Tac-Toe game built with pure Vanilla
                  JavaScript. Allows two players to compete with real-time win
                  detection and a modern UI.
                </p>
                <div className="project-tags">
                  <span>Vanilla JS</span>
                  <span>HTML/CSS</span>
                  <span>Game Logic</span>
                </div>
              </div>
            </div>

            <div className="portfolio-card reveal" data-category="web">
              <div className="project-image">
                <img
                  src="https://images.unsplash.com/photo-1587145820266-a5951ee6f620?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Simple Calculator"
                />
                <div className="project-overlay">
                  <a
                    href="https://samplecalculatori.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-project-btn"
                  >
                    Open Calc
                  </a>
                  <a
                    href="https://github.com/faisalkhancodes/Simple-Calculator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-project-btn"
                    style={{ marginLeft: 10 }}
                  >
                    GitHub
                  </a>
                </div>
              </div>
              <div className="project-info">
                <span className="project-category">Utilities / JS</span>
                <h3>Modern Web Calculator</h3>
                <p>
                  A responsive web calculator that performs addition, subtraction,
                  multiplication, and division. Perfect for quick calculations with a
                  clean user interface.
                </p>
                <div className="project-tags">
                  <span>C++</span>
                  <span>JavaScript</span>
                  <span>HTML/CSS</span>
                </div>
              </div>
            </div>
          </div>

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
