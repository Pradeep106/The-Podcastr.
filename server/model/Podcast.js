const mongoose = require("mongoose");

const podcastSchema = new mongoose.Schema({
  podcasterName: {
    type: String,
    required: true,
  },
  podcastTitle: {
    type: String,
    required: true,
  },
  podcastDescription: {
    type: String,
    required: true,
  },
  podcastCategory:{
    type: String,
    required: true,
  },

  image: {
    // Corrected property name from "podcastThumnail"
    type: String,
    required: true,
  },

  audio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PodcastAudio",
  },
});

module.exports = mongoose.model("Podcast", podcastSchema);
