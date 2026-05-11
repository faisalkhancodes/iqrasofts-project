const express = require("express");
const mongoose = require("mongoose");
const Contact = require("../models/Contact");

const router = express.Router();

router.post("/", async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      error:
        "Database unavailable. Start MongoDB and set MONGODB_URI, then retry.",
    });
  }
  try {
    const { name, email, subject, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({
        error: "name, email, and message are required",
      });
    }
    const doc = await Contact.create({ name, email, subject, message });
    res.status(201).json({ id: doc._id, ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message || "Failed to save contact" });
  }
});

module.exports = router;
