const express = require("express");
const mongoose = require("mongoose");
const Contact = require("../models/Contact");
const { validateContactData } = require("../middleware/validation");
const { asyncHandler, AppError } = require("../middleware/errorHandler");

const router = express.Router();

/**
 * POST /api/contacts
 * Create a new contact submission
 * Validates input and saves to database
 */
router.post(
  "/",
  validateContactData, // Validation middleware
  asyncHandler(async (req, res) => {
    // Check database connection
    if (mongoose.connection.readyState !== 1) {
      throw new AppError(
        "Database unavailable. Please try again later.",
        503
      );
    }

    const { name, email, subject, message } = req.body;

    try {
      // Create and save contact document
      const contact = await Contact.create({
        name,
        email,
        subject,
        message,
      });

      // Log successful submission
      console.log(`[SUCCESS] Contact created: ${contact._id}`);

      res.status(201).json({
        ok: true,
        id: contact._id,
        message: "Your message has been received successfully",
      });
    } catch (error) {
      console.error("[DB ERROR]", error);
      throw new AppError("Failed to save contact. Please try again.", 500);
    }
  })
);

/**
 * GET /api/contacts/health
 * Health check endpoint (optional)
 */
router.get("/health", (req, res) => {
  res.json({
    ok: true,
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

module.exports = router;
