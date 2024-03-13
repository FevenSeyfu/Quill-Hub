import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv'; 
dotenv.config()

// setup cloudinary to upload image
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_KEY, 
    api_secret: process.env.CLOUD_SECRET_KEY
});

export default cloudinary;