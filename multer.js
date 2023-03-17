const multer = require("multer")


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, "./img");
    },
    filename: function (req, file, cb) {
        var ext=file.originalname.substr(file.originalname.lastIndexOf('.'));
      cb(null, 'user'+req.params.id+ext);
    },
});

module.exports = upload = multer({ storage: storage })
 