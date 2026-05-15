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

// Request logging (optional - for debugging)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

/**
 * Health Check Endpoint
 */
app.get("/api/health", (req, res) => {
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
app.use("/api/contacts", contactRoutes);
app.use("/api/chat", chatRoutes);

/**
 * MongoDB Connection
 */
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("[DB] MongoDB connected successfully"))
  .catch((err) => {
    console.error("[DB ERROR] MongoDB connection failed:", err.message);
    console.log("[DB] NOTE: Contact saving disabled until MongoDB is running");
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
  console.log(`
╔════════════════════════════════════╗
║   IqraSoft API Server Started      ║
║   Port: ${PORT}                         ║
║   Environment: ${process.env.NODE_ENV || "development"}              ║
║   MongoDB: ${MONGODB_URI}║
╚════════════════════════════════════╝
  `);
});
