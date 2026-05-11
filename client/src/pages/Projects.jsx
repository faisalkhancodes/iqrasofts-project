export default function Projects() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header reveal active">
          <h2>Projects</h2>
          <p>
            Selected work and internal platforms. Tell us about your product and
            we will scope a roadmap.
          </p>
        </div>
        <div className="services-grid">
          <div className="service-card reveal active">
            <div className="icon-box">
              <i className="fas fa-globe" />
            </div>
            <h3>Marketing & CMS sites</h3>
          </div>
          <div className="service-card reveal active">
            <div className="icon-box">
              <i className="fas fa-shopping-cart" />
            </div>
            <h3>E-commerce builds</h3>
          </div>
          <div className="service-card reveal active">
            <div className="icon-box">
              <i className="fas fa-comments" />
            </div>
            <h3>AI-assisted support</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
