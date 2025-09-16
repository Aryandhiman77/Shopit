import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import ApiError from "../Helpers/ApiError.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) throw new ApiError(400, "Local image file not found.");
    const uploaded = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
    });
    return uploaded;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export async function uploadWithRetry(
  filePath,
  CLOUDINARY_RETRY_COUNT = 3,
  RETRY_DELAY_MS = 1000
) {
  let lastError;
  for (let attempt = 1; attempt <= CLOUDINARY_RETRY_COUNT; attempt++) {
    try {
      const uploaded = await uploadOnCloudinary(filePath);
      if (!uploaded) throw new Error("Cloudinary upload failed");
      return uploaded;
    } catch (err) {
      lastError = err;
      console.warn(
        `Cloudinary upload attempt ${attempt} failed: ${err.message}`
      );
      if (attempt < CLOUDINARY_RETRY_COUNT) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      }
    }
  }
  throw new ApiError(
    500,
    "Unable to upload image after multiple attempts.",
    lastError.message
  );
}

export async function deleteFromCloudinary(public_id) {
  try {
    const deleted = await cloudinary.uploader.destroy(public_id);
    if (!deleted) throw new ApiError(500, "Unable to delete file.");
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Unable to delete file.");
  }
}
export default uploadOnCloudinary;
