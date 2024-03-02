const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
const Podcast = require("../model/Podcast");
const PodcastAudio = require("../model/PodcastAudio");
const User = require("../model/User");


exports.createPodcast = async (req, res) => {
  try {
    const { podcasterName, podcastTitle, podcastDescription, podcastCategory } =
      req.body;

    const userId = req.user.id;

    const image = req.file.path;

    if (
      !podcasterName ||
      !podcastTitle ||
      !podcastDescription ||
      !podcastCategory ||
      !image
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Uploading the image to Cloudinary
    const fileName = req.file.originalname.split(".")[0];

    const postImage = await cloudinary.uploader.upload(image, {
      resource_type: "image",
      public_id: `PodcastImages/${fileName}`,
    });

    const newAudio = await PodcastAudio.create({
      audio: "nullkk",
    });

    console.log("audio", newAudio);
    const newPost = await Podcast.create({
      podcasterName,
      podcastTitle,
      podcastDescription,
      podcastCategory,
      image: postImage.secure_url,
      audio: newAudio._id,
    });

   const userr = await User.findOneAndUpdate(
      {
        _id: userId._id,
      },
      {
        $push: {
          podcast: newPost._id,
        },
      },
      { new: true }
    );
    console.log(userr)
    return res.status(200).json({
      success: true,
      message: "Podcast uploaded successfully",
      newPost,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Podcast upload failed.",
      error: err.message,
    });
  }
};

exports.getAllPodcast = async (req, res) => {
  try {
    const allPodcast = await Podcast.find(
      {},
      {
        podcasterName: true,
        podcastTitle: true,
        podcastDescription: true,
        podcastCategory: true,
        image: true,
        audio: true,
      }
    )
      .populate("audio")
      .exec();

    console.log(allPodcast.audio);

    // const allAudio = await PodcastAudio.find(allPodcast.audio._id,{
    //   audio,
    // })

    return res.status(200).json({
      success: true,
      message: "Podcast fetched successfully",
      allPodcast,
      // allAudio
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "unable to fetch all podcast",
      error: err,
    });
  }
};

exports.getUserPodcast = async(req,res)=>{
  
  const userId = req.user.id;
  console.log(userId)
  
  try{

    
    const user = await User.findById(req.user.id,{
        podcast:true,
    })

    return res.status(200).json({
      success:true,
      message:"fetched user podcast",
      user
    })

  }catch(err){
    return res.status(500).json({
      success: false,
      message: "unable to fetch usr podcast",
      error: err,
    });
  }
}