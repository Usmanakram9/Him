import path from "path";
import express from "express";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "../himalayafinal-master/front-end/public/uploads/"); // Adjust the path accordingly
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB limit (adjust as needed)
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  try {
    res.send({
      message: "Image Upload",
      image: `/uploads/${req.file.filename}`,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;
