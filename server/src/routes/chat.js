const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/", async (req, res) => {
  const base = process.env.AI_SERVICE_URL || "http://127.0.0.1:5050";
  try {
    const { data } = await axios.post(`${base}/chat`, req.body, {
      timeout: 120000,
      headers: { "Content-Type": "application/json" },
    });
    res.json(data);
  } catch (e) {
    const status = e.response?.status || 502;
    const detail =
      e.response?.data?.detail ||
      e.response?.data?.error ||
      e.message ||
      "AI service unavailable";
    res.status(status >= 400 && status < 600 ? status : 502).json({
      error: typeof detail === "string" ? detail : JSON.stringify(detail),
    });
  }
});

module.exports = router;
