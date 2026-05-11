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
                : "I'm having trouble connecting right now. Please try again.",
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
          content: "Oops! Something went wrong communicating with the server.",
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
              className="ai-avatar"
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=80&h=80&fit=crop"
              alt=""
            />
            <div>
              <h4>IqraSoft AI</h4>
              <div className="ai-status">Online</div>
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
          {history.length === 0 && (
            <div className="message bot-message">
              <p>
                Hi! I am the IqraSoft assistant. Ask me about our services,
                stack, or how we can help with your project.
              </p>
            </div>
          )}
          {history.map((m, i) => (
            <div
              key={i}
              className={`message ${
                m.role === "user" ? "user-message" : "bot-message"
              }`}
            >
              <p dangerouslySetInnerHTML={{ __html: formatMessage(m.content) }} />
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
            id="ai-chat-input"
            placeholder="Type your message..."
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            style={{ height: "auto" }}
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
      <button
        type="button"
        id="ai-fab"
        className="ai-fab"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="ai-chat-widget"
      >
        <i className="fas fa-robot" />
        <span className="ai-fab-text">IqraSoft AI Assistant</span>
      </button>
    </>
  );
}
