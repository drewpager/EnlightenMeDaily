require('dotenv').config();
const cloudinary = require('cloudinary');
const Cloudinary = cloudinary.v2;

function upload() {
  const response = Cloudinary.uploader.upload('https://images.unsplash.com/photo-1509029032154-54ba8b3216d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80', {
    folder: '/enlighten-me-daily',
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    cloud_name: process.env.CLOUDINARY_NAME,
  })
  return response;
}

upload();
