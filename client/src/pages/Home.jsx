import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section id="home" className="hero">
        <div className="container hero-content">
          <div className="hero-text reveal-left active">
            <h1>
              Crafting Digital <br />
              <span style={{ color: "var(--primary-color)" }}>Excellence</span>{" "}
              for You
            </h1>
            <p>
              Full-stack delivery with React, Node.js, MongoDB, and a Python AI
              layer. We build premium software that transforms businesses.
            </p>
            <div className="hero-buttons">
              <Link to="/contact" className="btn btn-primary">
                Get Started
              </Link>
              <Link to="/services" className="btn btn-outline">
                Our Services
              </Link>
            </div>
          </div>
          <div className="hero-image reveal-right active">
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Team collaboration"
            />
          </div>
        </div>
      </section>

      <section id="services" className="section">
        <div className="container">
          <div className="section-header reveal active">
            <h2>Our Stack</h2>
            <p>
              Modern web apps, resilient APIs, document data, and intelligent
              assistants.
            </p>
          </div>
          <div className="services-grid">
            {[
              { cls: "fab fa-react", title: "React frontends" },
              { cls: "fab fa-node-js", title: "Node.js APIs" },
              { cls: "fas fa-database", title: "MongoDB data" },
              { cls: "fab fa-python", title: "Python + OpenAI" },
            ].map((s) => (
              <div key={s.title} className="service-card reveal active">
                <div className="icon-box">
                  <i className={s.cls} />
                </div>
                <h3>{s.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
