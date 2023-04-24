import multer from "multer";
import fs from "node:fs";
import path from "node:path";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads');
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix =
//             Date.now() +
//             '-' +
//             Math.round(Math.random() * 1e9) +
//             path.extname(file.originalname);
//         cb(null, file.fieldname + '-' + uniqueSuffix);
//     },
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "./uploads";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
export const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|png|jpg/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Error only, jpeg png are allowed"));
    }
  },
});
