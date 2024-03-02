const multer = require("multer");

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const fileExt = file.originalname.split(".").pop();
    const filename = `${new Date().getTime()}.${fileExt}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "audio/mp3" || file.mimetype === "audio/mpeg") {
    cb(null, true);
  } else {
    cb({ message: "Unsupported File Format" }, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fieldNameSize: 200,
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter,
}).single("audio");


module.exports = { upload };
