const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    categoryLabel: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    imageAlt: { type: String, default: "" },
    description: { type: String, required: true },
    tags: { type: [String], default: [] },
    liveDemo: { type: String, default: "" },
    github: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
