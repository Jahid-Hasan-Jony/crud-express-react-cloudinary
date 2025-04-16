const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary.js");

// const path = require("path");
// const fs = require("fs");

// const uploadPath = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadPath)) {
//   fs.mkdirSync(uploadPath, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // if (file.mimetype !== "image/png") {
//     //   return cb(new Error("Only PNGs allowed"));
//     // }
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
// });

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "upload", // optional
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

module.exports = upload;
