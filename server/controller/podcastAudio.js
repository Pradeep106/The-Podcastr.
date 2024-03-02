const PodcastAudio = require("../model/PodcastAudio");
const uploadPodcat = require("../model/Podcast")
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
const createPodcastController = require("../controller/uploadPodcast");

exports.uploadAudio = async (req, res) => {
  try {
    const { path } = req.file;
    const { podcastId } = req.body;
    console.log("podcastId", podcastId);
    console.log("audio", path);

    if (!path || !podcastId) {
      return res.status(500).json({
        success: false,
        message: "All field required",
      });
    }

    const fName = req.file.originalname.split(".")[0];
    let secureUrl = "";

    const uploadedAudio = await cloudinary.uploader.upload(
      path,
      {
        resource_type: "raw",
        public_id: `AudioUploads/${fName}`,
      },
      (err, audio) => {
        if (err) {
          fs.unlinkSync(path);
          return res.send(err);
        }

        fs.unlinkSync(path);
        // res.send(audio);
        secureUrl = audio.secure_url;
      }
    );

    console.log("secureUrl", secureUrl);

    const audioId = await uploadPodcat.findById(
      podcastId,
    );

    console.log("audioId.audio._id", audioId.audio._id)


    const newAudio = await PodcastAudio.findByIdAndUpdate(  audioId.audio._id,{
            audio:secureUrl,
    })

    // console.log(newAudio)
    // console.log("audio id",idAsString);
    return res.status(200).json({
      success: true,
      message: "song updated successfully",
      newAudio,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Uploading audio failed",
      errro: err,
    });
  }
};

