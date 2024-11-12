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
const projectDetails = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'project-details',
    allowed_formats: ['doc', 'docx', 'pdf'],
  },
});
const upload = multer({ storage: storage });
const upload2 = multer({
  storage: projectDetails,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
});


module.exports = {upload,upload2};
