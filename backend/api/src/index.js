require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const contactRoutes = require("./routes/contacts");
const chatRoutes = require("./routes/chat");
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/iqrasoft";

/**
 * Middleware Setup
 */
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));

// Request logging middleware

/**
 * Health Check Endpoint
 */
app.get("/health", (req, res) => {
  res.json({
    ok: true,
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

/**
 * MongoDB Connection
 */
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // MongoDB connected
  })
  .catch((err) => {
    // MongoDB connection error - contacts will be unavailable
  });

/**
 * Error Handling Middleware (must be after all routes)
 */
app.use(notFoundHandler);
app.use(errorHandler);

/**
 * Start Server
 */
app.listen(PORT, () => {
  // IqraSoft API Server is running
});

module.exports = app;
