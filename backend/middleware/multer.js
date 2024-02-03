import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {

    const fileExt = path.extname(file.originalname);
    const formattedDate = new Date().toISOString().replace(/[-T:\.Z]/g, "");
    const uniqueFileName = `${file.fieldname}-${formattedDate}${fileExt}`;

    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage });

export default upload;
