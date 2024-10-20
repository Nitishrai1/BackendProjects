const cloudinary = require('cloudinary').v2;
const CLOUDINARY_URL="cloudinary://312452695442161:lSVXayVJ5dxHQ8y24zBbIUtM0Gs@dbeu0rspd"

const CLOUDINARY_API_KEY=312452695442161
const CLOUDINARY_API_SECRET="lSVXayVJ5dxHQ8y24zBbIUtM0Gs"
const cloud_name="tasky"

cloudinary.config({
  cloud_name: "tasky",
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
