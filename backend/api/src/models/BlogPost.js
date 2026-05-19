const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    categoryLabel: { type: String, required: true, trim: true },
    tags: { type: String, default: "" },
    date: { type: String, required: true },
    excerpt: { type: String, required: true },
    image: { type: String, required: true },
    imageAlt: { type: String, default: "" },
    authorName: { type: String, required: true },
    authorRole: { type: String, default: "" },
    authorImg: { type: String, default: "" },
    published: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BlogPost", blogPostSchema);
