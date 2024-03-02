const mongoose = require("mongoose");

const connectToDB = async () => {
  const URL =
    "mongodb+srv://pradp137:pradeep123@cluster0.3js7hpc.mongodb.net/podcast?retryWrites=true&w=majority"; // Replace with your MongoDB connection string

  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Server is connected successfully to the database");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
};

module.exports = connectToDB;
