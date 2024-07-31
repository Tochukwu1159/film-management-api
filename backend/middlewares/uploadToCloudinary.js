import sharp from 'sharp';
import cloudinary from '../helpers/cloudinary.js';
import streamifier from 'streamifier';

export const uploadToCloudinary = async (buffer) => {
  try {
    // Check if the buffer is a valid image by attempting to use sharp
    await sharp(buffer).metadata(); // This will throw an error if the buffer is not a valid image
  
    // Resize the image to a maximum width of 1024 pixels while maintaining aspect ratio
    const resizedBuffer = await sharp(buffer)
      .resize({ width: 1024, withoutEnlargement: true })
      .toBuffer();
    
    // Upload the resized image to Cloudinary
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });
      
      streamifier.createReadStream(resizedBuffer).pipe(stream);
      
    });
  } catch (err) {
    console.log(err.message)
    throw new Error(`Image processing failed: ${err.message}`);
  }
};
