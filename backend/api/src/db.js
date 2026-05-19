const mongoose = require("mongoose");

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/iqrasofts";

/**
 * Connect to MongoDB Atlas (or local MongoDB in dev)
 */
async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected:", mongoose.connection.host);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    // Don't crash the server — API still works (chat, etc.)
  }
}

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️  MongoDB disconnected");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB error:", err.message);
});

module.exports = connectDB;
