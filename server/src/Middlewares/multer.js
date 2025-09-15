import multer from "multer";
import path from "path";
import ApiError from "../Helpers/ApiError.js";
import cryptoHash from "../Helpers/cryptoHash.js";
import fs from "fs/promises";
import AsyncWrapper from "../Helpers/AsyncWrapper.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MAX_FILE_SIZE = 2 * 1024 * 1024;

// MULTER DISK STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: function (req, file, cb) {
    const encryptedUserId = cryptoHash(req.user.id.toString()).slice(0, 30);

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = `${encryptedUserId}-${uniqueSuffix}${path.extname(
      file.originalname
    )}`;
    cb(null, filename);
  },
});

// ONLY ALLOWING JPEG, JPG, PNG IMAGES
function customFileFilter(req, file, cb) {
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only jpg, jpeg, png images can be uploaded."), false);
  }
}

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: customFileFilter,
});

const handleUpload = (type, fieldName, maxCount = 1) => {
  let uploader;
  if (type === "single") {
    uploader = upload.single(fieldName);
  } else if (type === "multiple") {
    uploader = upload.array(fieldName, maxCount);
  }

  return (req, res, next) => {
    uploader(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return next(new ApiError(400, "File too large. Max size is 2MB."));
        }
        return next(new ApiError(400, err.message));
      } else if (err) {
        return next(new ApiError(400, err.message));
      }
      next();
    });
  };
};

export const removeImageFromUploads = AsyncWrapper(async ({ filename }) => {
  if (!filename) {
    throw new ApiError(400, "Filename is required to remove image.");
  }
  const filePath = path.join(__dirname, `../public/uploads/${filename}`);
  try {
    await fs.unlink(filePath);
    return true;
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new ApiError(404, `File not found: ${filename}`);
    }
    throw new ApiError(500, `Error deleting file: ${err.message}`);
  }
});

const handleSingleImageUpload = handleUpload("single", "profile");
const handleMultipleImageUpload = handleUpload("multiple", "images", 5);

export { handleMultipleImageUpload, handleSingleImageUpload };
