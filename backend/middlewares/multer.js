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

/*
  Now when we use multer like that:
  "router.post("/signup", upload.single("image"), signUp);"
  When comes to this route:
  multer catches the uploaded file
  Saves it to  local ./public folder (because I configured diskStorage)
  Adds this object to the request:

  req.file = {
    fieldname: 'image',
    originalname: 'photo.png',
    encoding: '7bit',
    mimetype: 'image/png',
    destination: './public',
    filename: 'image-123456789.png',
    path: 'public/image-123456789.png',
    size: 12345
  }
*/
