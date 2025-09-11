import React, { useState } from "react";

const INITIAL_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const Contact = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Name required";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      return "Valid email required";
    if (!form.subject.trim()) return "Subject required";
    if (!form.message.trim() || form.message.trim().length < 10)
      return "Message must be at least 10 characters";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: "idle", msg: "" });
    const err = validate();
    if (err) {
      setStatus({ state: "error", msg: err });
      return;
    }
    try {
      setStatus({ state: "loading", msg: "Sending..." });
      // Adjust endpoint to match your backend route
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        setStatus({
          state: "success",
          msg: "Message sent. We will reply soon.",
        });
      }

      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus({ state: "error", msg: err.message });
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>Contact Us</h1>
        <p style={styles.subtitle}>
          Questions, feedback, or partnership ideas—drop a message.
        </p>
        <form onSubmit={handleSubmit} noValidate style={styles.form}>
          <div style={styles.field}>
            <label htmlFor="name" style={styles.label}>
              Name
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
              placeholder="Your name"
              required
            />
          </div>
          <div style={styles.field}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
              placeholder="you@example.com"
              required
            />
          </div>
          <div style={styles.field}>
            <label htmlFor="subject" style={styles.label}>
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              style={styles.input}
              placeholder="Subject"
              required
            />
          </div>
          <div style={styles.field}>
            <label htmlFor="message" style={styles.label}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              style={{
                ...styles.input,
                height: 140,
                resize: "vertical",
                lineHeight: 1.5,
              }}
              placeholder="Type your message..."
              required
            />
          </div>

          {status.state !== "idle" && (
            <div
              role="status"
              style={{
                marginBottom: 12,
                color:
                  status.state === "error"
                    ? "#b00020"
                    : status.state === "success"
                    ? "#0a7d35"
                    : "#555",
                fontSize: 14,
              }}
            >
              {status.msg}
            </div>
          )}

          <button
            type="submit"
            disabled={status.state === "loading"}
            style={{
              ...styles.button,
              opacity: status.state === "loading" ? 0.7 : 1,
              cursor: status.state === "loading" ? "progress" : "pointer",
            }}
          >
            {status.state === "loading" ? "Sending..." : "Send Message"}
          </button>
        </form>
        <div style={styles.metaBox}>
          <p style={styles.metaLine}>Email: harshilsuthar1995@gmail.com</p>
          <p style={styles.metaLine}>Response time: within 24–48 hours.</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: "calc(100vh - 120px)",
    padding: "40px 16px",
    background: "#0f0f0f",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    color: "#eee",
  },
  card: {
    width: "100%",
    maxWidth: 720,
    background: "#1c1c1c",
    border: "1px solid #2a2a2a",
    borderRadius: 12,
    padding: "32px 36px 40px",
    boxShadow: "0 4px 18px rgba(0,0,0,0.5)",
  },
  title: { margin: 0, fontSize: 32, fontWeight: 600, letterSpacing: 0.5 },
  subtitle: {
    margin: "8px 0 28px",
    fontSize: 15,
    color: "#b7b7b7",
    lineHeight: 1.4,
  },
  form: { display: "flex", flexDirection: "column" },
  field: { display: "flex", flexDirection: "column", marginBottom: 18 },
  label: {
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 6,
    fontWeight: 600,
    color: "#d2d2d2",
  },
  input: {
    background: "#121212",
    border: "1px solid #333",
    color: "#f1f1f1",
    padding: "12px 14px",
    borderRadius: 8,
    fontSize: 14,
    outline: "none",
    transition: "border 0.2s, background 0.2s",
  },
  button: {
    background: "linear-gradient(135deg,#ff0844,#ff5f45)",
    color: "#fff",
    border: "none",
    padding: "14px 20px",
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: 0.5,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 14px rgba(255,80,80,0.35)",
    transition: "transform 0.15s, box-shadow 0.15s",
  },
  metaBox: {
    marginTop: 36,
    paddingTop: 18,
    borderTop: "1px solid #2d2d2d",
    fontSize: 13,
    color: "#a9a9a9",
    lineHeight: 1.5,
  },
  metaLine: { margin: "4px 0" },
};

export default Contact;
