import { useCallback, useEffect, useRef, useState } from "react";

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatMessage(text) {
  let t = escapeHtml(text).replace(/\n/g, "<br>");
  t = t.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  return t;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [sending, setSending] = useState(false);
  const messagesEnd = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, sending, open]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || sending) return;

    const userMsg = { role: "user", content: text };
    const nextHistory = [...history, userMsg];
    setHistory(nextHistory);
    setInput("");
    setSending(true);
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextHistory.map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setHistory((h) => [
          ...h,
          {
            role: "assistant",
            content:
              typeof data.error === "string"
                ? data.error
                : "I'm sorry, I'm having trouble connecting right now.",
          },
        ]);
      } else if (data.reply) {
        setHistory((h) => [
          ...h,
          { role: "assistant", content: data.reply },
        ]);
      }
    } catch {
      setHistory((h) => [
        ...h,
        {
          role: "assistant",
          content:
            "Oops! Something went wrong communicating with the server.",
        },
      ]);
    } finally {
      setSending(false);
    }
  }, [input, history, sending]);

  return (
    <>
      <div
        id="ai-chat-widget"
        className={`ai-widget-container${open ? "" : " closed"}`}
        aria-hidden={!open}
      >
        <div className="ai-chat-header">
          <div className="ai-assistant-info">
            <img
              src="/pictures/iqrasoftlogo.jpeg"
              alt="IqraSoft Logo"
              className="ai-avatar"
            />
            <div>
              <h4>IqraSoft AI Assistant</h4>
              <span className="ai-status">Online</span>
            </div>
          </div>
          <button
            type="button"
            id="ai-close-btn"
            className="ai-close-btn"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
          >
            <i className="fas fa-times" />
          </button>
        </div>
        <div id="ai-chat-messages" className="ai-chat-messages">
          <div className="message bot-message">
            <p>
              Hello! 👋 I&apos;m the IqraSoft AI Assistant. How can I help you
              today? Would you like to know more about our Web Development,
              Cybersecurity, or UI/UX services?
            </p>
          </div>
          {history.map((m, i) => (
            <div
              key={i}
              className={`message ${
                m.role === "user" ? "user-message" : "bot-message"
              }`}
            >
              <p
                dangerouslySetInnerHTML={{ __html: formatMessage(m.content) }}
              />
            </div>
          ))}
          {sending && (
            <div id="ai-typing-indicator" className="typing-indicator">
              <div className="typing-dot" />
              <div className="typing-dot" />
              <div className="typing-dot" />
            </div>
          )}
          <div ref={messagesEnd} />
        </div>
        <div className="ai-chat-input-area">
          <textarea
            ref={textareaRef}
            id="ai-chat-input"
            placeholder="Type your message..."
            rows={1}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              const ta = e.target;
              ta.style.height = "auto";
              ta.style.height = `${ta.scrollHeight}px`;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button
            type="button"
            id="ai-send-btn"
            className="ai-send-btn"
            disabled={!input.trim() || sending}
            onClick={sendMessage}
            aria-label="Send"
          >
            <i className="fas fa-paper-plane" />
          </button>
        </div>
      </div>

      <a
        href="https://wa.me/923715316610"
        target="_blank"
        id="wa-fab"
        className="wa-fab"
        rel="noopener noreferrer"
      >
        <i className="fab fa-whatsapp" />
      </a>

      <button
        type="button"
        id="ai-fab"
        className="ai-fab"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="ai-chat-widget"
      >
        <img
          src="/pictures/iqrasoftlogo.jpeg"
          alt="AI Icon"
          style={{
            width: 25,
            height: 25,
            borderRadius: "50%",
            objectFit: "cover",
            background: "white",
            padding: 2,
          }}
        />
        <span className="ai-fab-text">IqraSoft AI Assistant</span>
      </button>
    </>
  );
}
