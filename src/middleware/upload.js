const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const wrapper = require("../utils/wrapper");
const cloudinary = require("../config/cloudinary");

module.exports = {
  uploadEvent: (request, response, next) => {
    const storage = new CloudinaryStorage({
      cloudinary,
      params: {
        folder: "event-organizing/event",
      },
    });

    const upload = multer({
      storage,
      limits: { fileSize: 512000 },
      // eslint-disable-next-line consistent-return
      fileFilter(req, file, callback) {
        const ext = file.mimetype.split("/")[1];
        if (ext !== "png" && ext !== "jpg" && ext !== "gif" && ext !== "jpeg") {
          return callback(new Error("Only images are allowed"));
        }
        callback(null, true);
      },
    }).single("image");

    upload(request, response, (err) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return wrapper.response(response, 401, err.message, null);
      }
      if (err) {
        // An unknown error occurred when uploading.
        return wrapper.response(response, 401, err.message, null);
      }

      // Everything went fine.
      next();
    });
  },
};
