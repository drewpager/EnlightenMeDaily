require('dotenv').config();
const cloudinary2 = require('cloudinary');

const auth = {
  api_secret: process.env.CLOUDINARY_SECRET,
  api_key: process.env.CLOUDINARY_KEY,
  cloud_name: process.env.CLOUDINARY_NAME,
};
const fetchCloud = () => {
  const response = cloudinary2.v2.search.execute(auth).then(result => console.log(result));

  // cloudinary2.v2.search
  // .folder('enlighten-me-daily')
  // .execute().then(result => console.log(result.url));
  return response;
}

fetchCloud();
