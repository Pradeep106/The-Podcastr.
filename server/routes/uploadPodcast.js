// uploadPodcast.js
const router = require("express").Router();
const podcastImageMulter = require("../middlewares/podcastImageMulter");
const {createPodcast,getAllPodcast,getUserPodcast} = require("../controller/uploadPodcast");
const {auth} = require("../middlewares/auth")

router.post("/upload", auth,podcastImageMulter, createPodcast);
router.get("/getpodcast", getAllPodcast);
router.get("/getuserpodcast",auth, getUserPodcast);

module.exports = router;
