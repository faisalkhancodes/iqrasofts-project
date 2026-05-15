import { Link } from "react-router-dom";
import { postContact } from "../lib/contactApi.js";

async function onHomeContactSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const btn = form.querySelector('button[type="submit"]');
  const name = form.querySelector('[name="name"]')?.value?.trim();
  const email = form.querySelector('[name="email"]')?.value?.trim();
  const message = form.querySelector('[name="message"]')?.value?.trim();
  if (!name || !email || !message) return;

  const orig = btn.textContent;
  btn.disabled = true;
  btn.textContent = "Sending...";
  try {
    await postContact({ name, email, message });
    alert("Thank you! Your message has been sent successfully.");
    form.reset();
  } catch {
    alert("Could not send right now. Please try again or use the Contact page.");
  } finally {
    btn.disabled = false;
    btn.textContent = orig;
  }
}

export default function Home() {
  return (
    <>
      <section id="home" className="hero">
        <div className="container hero-content">
          <div className="hero-text reveal-left">
            <h1>
              Crafting Digital <br />
              <span style={{ color: "var(--primary-color)" }}>Excellence</span>{" "}
              for You
            </h1>
            <p>
              We build premium software solutions that transform businesses. From
              stunning websites to powerful applications, IqraSoft is your partner
              in innovation.
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
          <div className="hero-image reveal-right">
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="IqraSoft Elite Team"
            />
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
            <div className="service-card reveal">
              <div className="icon-box">
                <i className="fas fa-code" />
              </div>
              <h3>Web Development</h3>
            </div>
            <div className="service-card reveal">
              <div className="icon-box">
                <i className="fab fa-wordpress" />
              </div>
              <h3>WordPress Development</h3>
            </div>
            <div className="service-card reveal">
              <div className="icon-box">
                <i className="fab fa-shopify" />
              </div>
              <h3>Shopify Store Setup</h3>
            </div>
            <div className="service-card reveal">
              <div className="icon-box">
                <i className="fas fa-tools" />
              </div>
              <h3>Website Maintenance</h3>
            </div>
            <div className="service-card reveal">
              <div className="icon-box">
                <i className="fas fa-layer-group" />
              </div>
              <h3>UI / UX Design</h3>
            </div>
            <div className="service-card reveal">
              <div className="icon-box">
                <i className="fas fa-mobile-alt" />
              </div>
              <h3>Mobile App Development</h3>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: "3rem" }} className="reveal">
            <Link to="/services" className="btn btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      <section id="process" className="section bg-gray">
        <div className="container">
          <div className="section-header reveal">
            <h2>Our Work Process</h2>
            <p>A systematic approach to delivering excellence</p>
          </div>
          <div className="process-grid">
            <div className="process-step reveal">
              <div className="step-number">1</div>
              <div
                className="icon-box"
                style={{ margin: "0 auto 1.5rem" }}
              >
                <i className="fas fa-lightbulb" />
              </div>
              <h3>Discovery</h3>
              <p>
                Deep dive into your requirements and goals to ensure we&apos;re
                aligned from day one.
              </p>
            </div>
            <div className="process-step reveal">
              <div className="step-number">2</div>
              <div
                className="icon-box"
                style={{ margin: "0 auto 1.5rem" }}
              >
                <i className="fas fa-pencil-ruler" />
              </div>
              <h3>Strategy</h3>
              <p>
                Designing the perfect roadmap and architecture for your unique
                business needs.
              </p>
            </div>
            <div className="process-step reveal">
              <div className="step-number">3</div>
              <div
                className="icon-box"
                style={{ margin: "0 auto 1.5rem" }}
              >
                <i className="fas fa-code" />
              </div>
              <h3>Execution</h3>
              <p>
                High-quality development using modern technology and agile
                methodologies.
              </p>
            </div>
            <div className="process-step reveal">
              <div className="step-number">4</div>
              <div
                className="icon-box"
                style={{ margin: "0 auto 1.5rem" }}
              >
                <i className="fas fa-rocket" />
              </div>
              <h3>Delivery</h3>
              <p>
                Rigorous testing and seamless deployment followed by ongoing
                premium support.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="container">
          <div className="about-content">
            <div className="about-image reveal-left">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Our Vision and Team"
              />
            </div>
            <div className="about-text reveal-right">
              <h2>Who We Are</h2>
              <p className="subtitle">Empowering Business with Technology</p>
              <p>
                At IqraSoft, we are more than just developers; we are partners in
                your growth. Founded with a vision to bridge the gap between complex
                technology and business needs, we specialize in delivering
                high-quality, scalable digital solutions.
              </p>
              <p>
                Our team comprises industry experts passionate about coding,
                design, and innovation. We believe in transparency, collaboration,
                and delivering results that exceed expectations.
              </p>
              <ul className="about-features">
                <li>
                  <i className="fas fa-check-circle" /> Client-Centric Approach
                </li>
                <li>
                  <i className="fas fa-check-circle" /> Agile Development Experts
                </li>
                <li>
                  <i className="fas fa-check-circle" /> 24/7 Support & Maintenance
                </li>
              </ul>
              <Link
                to="/contact"
                className="btn btn-primary"
                style={{ marginTop: "1.5rem" }}
              >
                Work With Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="founder" className="section">
        <div className="container">
          <div className="section-header reveal">
            <h2>Leadership</h2>
            <p>Visionary leadership driving innovation.</p>
          </div>
          <div className="founder-container reveal">
            <div className="service-card team-card founder-card-prominent">
              <div className="team-img-container">
                <img
                  src="/pictures/faisal.jpeg"
                  alt="Engr Faisal Khan"
                  className="team-img"
                />
              </div>
              <h2 className="team-name">Engr Faisal Khan</h2>
              <p className="team-role text-primary">Founder & CEO</p>
              <p className="team-desc">
                Leading the vision of IqraSoft to deliver excellence.
              </p>
              <a
                href="https://ifaisalkhancodes.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="founder-btn"
              >
                View Portfolio
                <i className="fas fa-arrow-right" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="section bg-gray">
        <div className="container">
          <div className="section-header reveal">
            <h2>Our Expert Team</h2>
            <p>
              Meet the visionary minds behind IqraSoft&apos; success. Our diverse
              team of experts is dedicated to delivering digital excellence.
            </p>
          </div>
          <div className="team-preview reveal">
            <div className="team-preview-content">
              <p>
                We have a talented pool of AI Engineers, Web Developers, Graphic
                Designers, and Cyber Security Experts ready to take on your most
                challenging projects.
              </p>
              <Link
                to="/team"
                className="btn btn-primary"
                style={{ marginTop: "1.5rem" }}
              >
                Meet the Full Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="container">
          <div className="section-header reveal">
            <h2>Get In Touch</h2>
            <p>Have a project in mind? Let&apos;s discuss how we can help you grow.</p>
          </div>
          <div className="contact-content reveal">
            <div className="contact-info">
              <div className="contact-item">
                <div className="icon-box-small">
                  <i className="fas fa-map-marker-alt" />
                </div>
                <div>
                  <h4>Location</h4>
                  <p>Islamabad, Pakistan</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="icon-box-small">
                  <i className="fas fa-envelope" />
                </div>
                <div>
                  <h4>Email</h4>
                  <p>
                    <a
                      href="mailto:IqraSoftTechnologies@gmail.com"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      iqrasofttechnologies@gmail.com
                    </a>
                  </p>
                </div>
              </div>
              <div className="contact-item">
                <div className="icon-box-small">
                  <i className="fab fa-whatsapp" />
                </div>
                <div>
                  <h4>WhatsApp</h4>
                  <p>
                    <a
                      href="https://wa.me/923715316610"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      0371 5316610
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={onHomeContactSubmit}>
              <div className="form-group">
                <input type="text" name="name" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
