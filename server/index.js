const express = require("express");
const app = express();
const dbConnection = require("./config/connectDB");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const podcastRoute = require("./routes/uploadPodcast");
const podcastAudioRoute = require("./routes/podcastAudio");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000", // Remove the trailing slash here
    credentials: true,
  })
);

// Middleware (note the correct spelling)
app.use("/auth", userRoute);
app.use("/post", postRoute);
app.use("/podcast", podcastRoute);
app.use("/podcast", podcastAudioRoute);

app.get("/", (req, res) => res.send("api is running"));

// Call the database connection function and use a Promise to start the server afterward
dbConnection()
  .then(() => {
    const PORT = process.env.PORT || 8002;

    app.listen(PORT, () => {
      console.log("Server is started on port", PORT);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
