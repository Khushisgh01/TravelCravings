const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const path = require('path');

// Check if Cloudinary credentials are available
const hasCloudinaryConfig = process.env.CLOUD_NAME && 
                           process.env.CLOUD_API_KEY && 
                           process.env.CLOUD_API_SECRET;

let storage;

if (hasCloudinaryConfig) {
  // Configure Cloudinary
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
  });

  // Use Cloudinary storage
  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'TravelCravings_DEV',
      allowedFormats: ["png", "jpg", "jpeg", "webp"],
      transformation: [{ width: 800, height: 600, crop: "fill" }]
    },
  });
} else {
  // Fallback to local storage
  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, 'public/images'));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
}

module.exports = {
  cloudinary: hasCloudinaryConfig ? cloudinary : null,
  storage,
  hasCloudinaryConfig
};