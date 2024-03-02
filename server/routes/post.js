const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const { createPost } = require("../controller/Post");

router.post("/upload", upload.single("image"), createPost);

module.exports = router;
