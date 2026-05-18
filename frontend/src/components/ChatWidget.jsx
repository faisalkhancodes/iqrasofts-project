import { useCallback, useEffect, useRef, useState } from "react";
import { sendChatMessage } from "../utils/api.js";
import { validateChatMessage } from "../utils/validation.js";

/**
 * Utility function to safely escape HTML
 */
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Format message with markdown-like styling
 */
function formatMessage(text) {
  let t = escapeHtml(text).replace(/\n/g, "<br>");
  t = t.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  return t;
}

/**
 * Chat Widget Component
 * Handles AI chat communication with proper validation and error handling
 */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const messagesEnd = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, sending, open]);

  /**
   * Send message with proper validation and error handling
   */
  const sendMessage = useCallback(async () => {
    // Validate input
    const trimmedInput = input.trim();
    const validationError = validateChatMessage(trimmedInput);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    if (sending) return;

    // Add user message to history
    const userMsg = { role: "user", content: trimmedInput };
    const nextHistory = [...history, userMsg];
    setHistory(nextHistory);
    setInput("");
    setSending(true);
    setError(null);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      // Call API with message history
      const response = await sendChatMessage(nextHistory);
      
      if (response.reply) {
        // Add assistant response to history
        setHistory((h) => [
          ...h,
          { role: "assistant", content: response.reply },
        ]);
      } else if (response.error) {
        // Handle API error response
        setError(response.error);
        setHistory((h) => [
          ...h,
          {
            role: "assistant",
            content: response.error,
          },
        ]);
      }
    } catch (err) {
      // Handle network or other errors
      const errorMessage = err instanceof Error ? err.message : "Connection error";
      setError(errorMessage);
      setHistory((h) => [
        ...h,
        {
          role: "assistant",
          content: `Sorry, I encountered an error: ${errorMessage}`,
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
              src="/pictures/iqrasoftlogo.png"
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
          {error && (
            <div
              className="error-banner"
              style={{
                padding: "8px 12px",
                backgroundColor: "#f8d7da",
                color: "#721c24",
                borderRadius: "4px",
                margin: "8px",
                fontSize: "12px",
              }}
            >
              ⚠️ {error}
            </div>
          )}
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
              const value = e.target.value;
              // Limit input to 2000 characters
              if (value.length <= 2000) {
                setInput(value);
                setError(null); // Clear error when user types
                const ta = e.target;
                ta.style.height = "auto";
                ta.style.height = `${ta.scrollHeight}px`;
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            disabled={sending}
          />
          <button
            type="button"
            id="ai-send-btn"
            className="ai-send-btn"
            disabled={!input.trim() || sending}
            onClick={sendMessage}
            aria-label="Send"
            title={sending ? "Sending..." : "Send message"}
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
          src="/pictures/iqrasoftlogo.png"
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
