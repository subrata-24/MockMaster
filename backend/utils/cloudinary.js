import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (file) => {
  try {
    // Check if file exists
    if (!file) {
      throw new Error("No file provided");
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto", // Automatically detect file type
    });

    /*
      Checks: If a file or directory exists at the specified path on server's local storage.
      Sync(Synchronous): It waits (blocks) until it gets the result
    */

    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }

    return result.secure_url;
  } catch (error) {
    // Delete local file even if upload fails
    if (file && fs.existsSync(file)) {
      fs.unlinkSync(file);
    }

    // console.error("Cloudinary upload error:", error.message)
    return null;
  }
};

export default uploadOnCloudinary;
