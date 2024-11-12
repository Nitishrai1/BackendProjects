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
const projectDetailsStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'project-details',
    allowed_formats: ['doc', 'docx', 'pdf', 'jpg'], 
  },
});
const upload = multer({ storage: storage });
const upload2=multer({storage:projectDetials});

module.exports = {upload,upload2};
