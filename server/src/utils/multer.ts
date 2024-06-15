import multer from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req: Request, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

export default upload;
