const express = require("express");
const BlogPost = require("../models/BlogPost");
const { asyncHandler } = require("../middleware/errorHandler");

const router = express.Router();

/**
 * GET /blog
 * Returns all published blog posts ordered by 'order' field
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const posts = await BlogPost.find({ published: true }).sort({ order: 1 }).lean();
    res.json({ ok: true, data: posts });
  })
);

module.exports = router;
