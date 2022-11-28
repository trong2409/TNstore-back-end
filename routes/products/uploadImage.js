import multer from "multer";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    const image =
      file.fieldname +
      "-" +
      Date.now() +
      "." +
      file.originalname.split(".")[file.originalname.split(".").length - 1];
    cb(null, image);
    req.image =image;
  },
});
export const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext =
      file.originalname.split(".")[file.originalname.split(".").length - 1];
    if (ext !== "png" && ext !== "jpg" && ext !== "gif" && ext !== "jpeg") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
});
