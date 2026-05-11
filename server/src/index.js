require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const contactRoutes = require("./routes/contacts");
const chatRoutes = require("./routes/chat");

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/iqrasoft";

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || true,
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    mongo: mongoose.connection.readyState === 1,
  });
});

app.use("/api/contacts", contactRoutes);
app.use("/api/chat", chatRoutes);

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) =>
    console.error(
      "MongoDB connection error (contact saves disabled):",
      err.message
    )
  );

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
