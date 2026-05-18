import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "../hooks/useForm.js";
import { validateContactForm } from "../utils/validation.js";
import { submitContact } from "../utils/api.js";

export function ContactForm() {
  const [successMessage, setSuccessMessage] = useState("");
  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, reset } =
    useForm(
      { name: "", email: "", subject: "", message: "" },
      async (values) => {
        try {
          await submitContact(values);
          setSuccessMessage("Thank you! Your message has been sent successfully.");
          reset();
          // Clear success message after 5 seconds
          setTimeout(() => setSuccessMessage(""), 5000);
        } catch (error) {
          throw new Error(error.message || "Failed to send message");
        }
      },
      validateContactForm
    );

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
    >
      {successMessage && (
        <div className="success-message" style={{
          padding: "12px 16px",
          backgroundColor: "#d4edda",
          color: "#155724",
          borderRadius: "4px",
          marginBottom: "16px",
          border: "1px solid #c3e6cb"
        }}>
          {successMessage}
        </div>
      )}

      <div className="form-group">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          required
        />
        {touched.name && errors.name && (
          <span className="error-message" style={{ color: "#dc3545", fontSize: "12px", marginTop: "4px" }}>
            {errors.name}
          </span>
        )}
      </div>

      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          required
        />
        {touched.email && errors.email && (
          <span className="error-message" style={{ color: "#dc3545", fontSize: "12px", marginTop: "4px" }}>
            {errors.email}
          </span>
        )}
      </div>

      <div className="form-group">
        <input
          type="text"
          name="subject"
          placeholder="Subject (Optional)"
          value={values.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
        />
        {touched.subject && errors.subject && (
          <span className="error-message" style={{ color: "#dc3545", fontSize: "12px", marginTop: "4px" }}>
            {errors.subject}
          </span>
        )}
      </div>

      <div className="form-group">
        <textarea
          name="message"
          placeholder="Your Message"
          rows={5}
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          required
        />
        {touched.message && errors.message && (
          <span className="error-message" style={{ color: "#dc3545", fontSize: "12px", marginTop: "4px" }}>
            {errors.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={isSubmitting}
        style={{ opacity: isSubmitting ? 0.6 : 1 }}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
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


            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
