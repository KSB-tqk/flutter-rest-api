const multer = require("multer");
const mongoose = require("mongoose");

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/.(jpg|jpeg|png)$/)) {
      cb(new Error("Please upload an image"));
    }
    cb(null, true);
  },
});

module.exports = upload;