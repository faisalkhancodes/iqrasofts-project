import { Link } from "react-router-dom";

const CARDS = [
  { icon: "fas fa-code", title: "Web Development" },
  { icon: "fab fa-wordpress", title: "WordPress Development" },
  { icon: "fab fa-shopify", title: "Shopify Store Setup" },
  { icon: "fas fa-file-alt", title: "CV / Resume Making" },
  { icon: "fas fa-user-tie", title: "Online Job Application" },
  { icon: "fas fa-tools", title: "Website Maintenance" },
  { icon: "fas fa-shield-alt", title: "Cyber Security" },
  { icon: "fas fa-mobile-alt", title: "Mobile App Development" },
  { icon: "fas fa-layer-group", title: "UI / UX Design" },
  { icon: "fas fa-paint-brush", title: "Graphic Design" },
  { icon: "fas fa-keyboard", title: "Data Entry" },
  { icon: "fas fa-share-alt", title: "Social Media Page Setup" },
  { icon: "fas fa-headset", title: "Virtual Assistant Services" },
  { icon: "fas fa-search", title: "Basic SEO Optimization" },
  { icon: "fas fa-server", title: "Domain & Hosting Setup" },
  { icon: "fas fa-edit", title: "Website Content Updates" },
  { icon: "fas fa-shopping-cart", title: "E-commerce Management" },
  { icon: "fas fa-video", title: "Video Editing" },
];

export default function Services() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <h1>Our Comprehensive Services</h1>
            <h4>
              End-to-end digital solutions to transform your business and
              accelerate growth
            </h4>
          </div>
        </div>
      </section>

      <section id="services" className="section">
        <div className="container">
          <div className="section-header reveal">
            <h2>Our Services</h2>
            <p>Comprehensive digital solutions tailored to your business needs.</p>
          </div>
          <div className="services-grid">
            {CARDS.map(({ icon, title }) => (
              <div key={title} className="service-card">
                <div className="icon-box">
                  <i className={icon} />
                </div>
                <h3>{title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>
              Let&apos;s discuss your project requirements and how we can help you
              achieve your goals
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary btn-large">
                Get Free Quote
              </Link>
              <Link to="/projects" className="btn btn-outline btn-large">
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
