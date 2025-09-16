import multer from "multer";
import path from "path";
import cryptoHash from "../Helpers/cryptoHash.js";
import { cwd } from "process";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

// MULTER DISK STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(cwd(), "public","temp"));
  },
  filename: function (req, file, cb) {
    const encryptedUserId = cryptoHash(req.user.id.toString()).slice(0, 20);

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
export { upload };
