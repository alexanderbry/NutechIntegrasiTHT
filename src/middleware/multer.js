const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadMiddleware = upload.single("profile_image");

module.exports = uploadMiddleware;
