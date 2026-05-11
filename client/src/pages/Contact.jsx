import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject?.value?.trim() || "";
    const message = form.message.value.trim();
    if (!name || !email || !message) return;

    setLoading(true);
    setStatus("");
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setStatus("Thank you! Your message was saved. We will get back to you.");
      form.reset();
    } catch (err) {
      setStatus(err.message || "Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="page-hero reveal active">
        <div className="container">
          <div className="page-hero-content">
            <h1>Get In Touch</h1>
            <h4>
              Messages are stored in MongoDB via our Node.js API. Prefer instant
              answers? Use the AI assistant.
            </h4>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-layout">
            <form className="contact-form" onSubmit={onSubmit}>
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
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject (optional)"
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
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Sending…" : "Send Message"}
              </button>
              {status && (
                <p style={{ marginTop: "1rem", color: "var(--text-color)" }}>
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
