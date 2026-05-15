/**
 * Validation middleware for contact form
 */

const validateContactData = (req, res, next) => {
  const { name, email, message, subject } = req.body || {};

  // Array to collect all errors
  const errors = [];

  // Validate name
  if (!name || typeof name !== "string") {
    errors.push("Name is required");
  } else if (name.trim().length < 2) {
    errors.push("Name must be at least 2 characters");
  } else if (name.length > 100) {
    errors.push("Name must not exceed 100 characters");
  }

  // Validate email
  if (!email || typeof email !== "string") {
    errors.push("Email is required");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("Please provide a valid email address");
    }
  }

  // Validate message
  if (!message || typeof message !== "string") {
    errors.push("Message is required");
  } else if (message.trim().length < 10) {
    errors.push("Message must be at least 10 characters");
  } else if (message.length > 5000) {
    errors.push("Message must not exceed 5000 characters");
  }

  // Validate subject (optional)
  if (subject && (typeof subject !== "string" || subject.length > 200)) {
    errors.push("Subject must not exceed 200 characters");
  }

  // If there are validation errors, return them
  if (errors.length > 0) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors,
    });
  }

  // Sanitize inputs (trim whitespace)
  req.body = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    subject: (subject || "").trim(),
    message: message.trim(),
  };

  next();
};

/**
 * Validation middleware for chat messages
 */
const validateChatData = (req, res, next) => {
  const { messages } = req.body || {};

  if (!Array.isArray(messages)) {
    return res.status(400).json({
      error: "Messages must be an array",
    });
  }

  if (messages.length === 0) {
    return res.status(400).json({
      error: "At least one message is required",
    });
  }

  // Validate each message
  const errors = [];
  messages.forEach((msg, index) => {
    if (!msg.role || !["user", "assistant", "system"].includes(msg.role)) {
      errors.push(`Message ${index} has invalid role`);
    }
    if (!msg.content || typeof msg.content !== "string") {
      errors.push(`Message ${index} requires content`);
    } else if (msg.content.length > 2000) {
      errors.push(`Message ${index} exceeds max length (2000)`);
    }
  });

  if (errors.length > 0) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors,
    });
  }

  next();
};

module.exports = {
  validateContactData,
  validateChatData,
};
