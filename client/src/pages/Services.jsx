export default function Services() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header reveal active">
          <h2>Services</h2>
          <p>
            Web development, WordPress, Shopify, maintenance, UI/UX, mobile
            apps, and security — same offerings as before, now powered by a
            unified full-stack platform.
          </p>
        </div>
        <div className="services-grid">
          {[
            "Web Development",
            "WordPress Development",
            "Shopify Store Setup",
            "Website Maintenance",
            "UI / UX Design",
            "Mobile App Development",
            "Cybersecurity",
          ].map((title) => (
            <div key={title} className="service-card reveal active">
              <div className="icon-box">
                <i className="fas fa-layer-group" />
              </div>
              <h3>{title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
