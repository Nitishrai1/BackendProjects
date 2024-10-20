const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../middlewire/Cloudinery');


const storage = new CloudinaryStorage({
  
  cloudinary: cloudinary,
  params: {
    folder: 'user-profile-pictures', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
