const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
  },
  password: {
    type: String,
    required: true,
  },
  podcast:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Podcast",
  }],
  blog:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Blog"
  }]
});

module.exports = mongoose.model("User", userSchema);
