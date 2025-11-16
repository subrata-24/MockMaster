import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  // Set destination folder where files will be temporarily stored
  destination: (req, file, cb) => {
    cb(null, "./public"); // Store files in public folder before uploading to Cloudinary
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    // Extract file extension from original filename (e.g., ".jpg", ".png")
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

export const upload = multer({ storage });
