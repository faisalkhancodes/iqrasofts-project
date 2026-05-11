import { Link } from "react-router-dom";
import { postContact } from "../lib/contactApi.js";

async function onContactSubmit(e) {
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
    alert("Could not send. Please try again later.");
  } finally {
    btn.disabled = false;
    btn.textContent = orig;
  }
}

export default function Contact() {
  return (
    <>
      <section className="page-hero reveal">
        <div className="container">
          <div className="page-hero-content">
            <h1>Get In Touch</h1>
            <h4>
              Ready to start your next project? We&apos;re here to help bring your
              digital ideas to life
            </h4>
          </div>
        </div>
      </section>

      <section id="team" className="section bg-gray">
        <div className="container">
          <div className="section-header reveal">
            <h2>Our Expert Team</h2>
            <p>
              Meet the visionary minds behind IqraSoft success. Our diverse team of
              experts is dedicated to delivering digital excellence.
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

            <form className="contact-form" onSubmit={onContactSubmit}>
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
