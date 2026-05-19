const express = require("express");
const Project = require("../models/Project");
const { asyncHandler } = require("../middleware/errorHandler");

const router = express.Router();

/**
 * GET /projects
 * Returns all projects ordered by 'order' field
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const projects = await Project.find({ }).sort({ order: 1 }).lean();
    res.json({ ok: true, data: projects });
  })
);

module.exports = router;
