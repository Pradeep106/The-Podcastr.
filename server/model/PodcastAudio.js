const mongoose = require("mongoose");

const podcastAudioSchema = new mongoose.Schema({
  audio: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("PodcastAudio", podcastAudioSchema);
