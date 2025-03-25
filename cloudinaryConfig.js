// import { v2 as cloudinary } from 'cloudinary';
// import dotenv from 'dotenv';  

// cloudinary.config({
//   cloud_name: "CLOUDINARY_CLOUD_NAME",
//   api_key: "CLOUDINARY_API_KEY",
//   api_secret: "CLOUDINARY_API_SECRET",
// });

// export default cloudinary;

// src/cloudinaryConfig.js
import { Cloudinary } from '@cloudinary/url-gen';

const cld = new Cloudinary({ 
  cloud: { 
    cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME 
  } 
});

export default cld;

