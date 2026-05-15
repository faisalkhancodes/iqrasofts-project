const express = require("express");
const axios = require("axios");
const { validateChatData } = require("../middleware/validation");
const { asyncHandler, AppError } = require("../middleware/errorHandler");

const router = express.Router();

/**
 * POST /api/chat
 * Forward chat messages to AI service with proper error handling
 */
router.post(
  "/",
  validateChatData, // Validation middleware
  asyncHandler(async (req, res) => {
    const aiServiceUrl = process.env.AI_SERVICE_URL || "http://127.0.0.1:5050";
    const { messages } = req.body;

    try {
      console.log(`[CHAT] Sending ${messages.length} messages to AI service...`);

      // Call AI service with timeout and error handling
      const response = await axios.post(
        `${aiServiceUrl}/chat`,
        { messages },
        {
          timeout: 120000, // 2 minutes timeout
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("[CHAT] AI service responded successfully");

      // Return AI response
      res.json(response.data);
    } catch (error) {
      console.error("[CHAT ERROR]", error.message);

      // Handle different types of errors
      if (error.response) {
        // AI service returned an error
        const status = error.response.status || 502;
        const detail =
          error.response.data?.detail ||
          error.response.data?.error ||
          "AI service error";

        throw new AppError(
          typeof detail === "string" ? detail : "AI service error",
          status >= 400 && status < 600 ? status : 502
        );
      } else if (error.code === "ECONNREFUSED") {
        throw new AppError(
          "AI service is unavailable. Please try again later.",
          503
        );
      } else if (error.code === "ENOTFOUND") {
        throw new AppError(
          "Cannot reach AI service. Configuration error.",
          503
        );
      } else if (error.code === "ETIMEDOUT") {
        throw new AppError(
          "AI service response timeout. Please try again.",
          504
        );
      } else {
        throw new AppError(
          error.message || "Failed to process chat request",
          500
        );
      }
    }
  })
);

module.exports = router;
