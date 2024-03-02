const multer = require("../middlewares/multer2");
const podcastAudio = require("../controller/podcastAudio");
const router = require("express").Router();

router.put("/upload/audio", multer.upload, podcastAudio.uploadAudio);

module.exports = router;
