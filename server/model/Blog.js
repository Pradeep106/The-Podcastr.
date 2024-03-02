const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  postTitle: {
    type: String,
    required: true,
  },
  postContent: {
    type: String,
    required: true,
  },
  postImages: {
      type: String,
  },
  postTag: {
    type: String,
    required: true,
  },
  postCategory: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
