require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./db");
const contactRoutes = require("./routes/contacts");
const chatRoutes = require("./routes/chat");
const projectRoutes = require("./routes/projects");
const blogRoutes = require("./routes/blog");
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3001;

/**
 * Middleware
 */
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));

/**
 * Health Check
 */
app.get("/health", (req, res) => {
  res.json({
    ok: true,
    service: "IqraSofts API",
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    uptime: process.uptime(),
  });
});

/**
 * API Routes
 */
app.use("/contacts", contactRoutes);
app.use("/chat", chatRoutes);
app.use("/projects", projectRoutes);
app.use("/blog", blogRoutes);

/**
 * Error Handling (must be after all routes)
 */
app.use(notFoundHandler);
app.use(errorHandler);

/**
 * Connect to MongoDB in background (don't block server start)
 */
connectDB();

/**
 * Start Server immediately
 */
app.listen(PORT, () => {
  console.log(`🚀 IqraSofts API running on http://localhost:${PORT}`);
});

module.exports = app;
