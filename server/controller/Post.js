const post = require("../model/Blog");
const cloudinary = require("../utils/cloudinary");

exports.createPost = async (req, res) => {
  try {
    //req.body

    const { postTitle, postContent, postTag, postCategory } = req.body;

    //check empty field
    const result = req.file.path;

    console.log(result)

    if (!postTitle || !postContent || !postTag || !postCategory || !result) {
      res.status(401).json({
        success: false,
        message: "All fields required",
      });
    }
    const fileName = req.file.originalname.split(".")[0];

    const postImage = await cloudinary.uploader.upload(result, {
      resource_type: "image",
      public_id: `PostImages/${fileName}`,
    });

    const newPost = await post.create({
      postTitle,
      postContent,
      postImages: postImage.secure_url,
      postTag,
      postCategory,
    });

    res.status(200).json({
      success: true,
      message: "Post created successfully",
      newPost,
    });

    //create psot

    //return response
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed post creation",
    });
  }
};
