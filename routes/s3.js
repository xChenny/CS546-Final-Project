const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");

const getExtension = filename => {
  if (filename.indexOf(".") !== -1)
    return filename
      .split(".")
      .slice(-1)
      .pop()
      .toLowerCase();
};

// Init Storage configuration for multer (file upload)

// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: function(req, file, cb) {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     );
//   }
// });

// Just use memorystorage for now.
const storage = multer.memoryStorage();
// 'file' is the 'name' of the axios body input in fileupload/index.js
let upload = multer({
  storage,
  limits: {
    fileSize: 1000000
  }
}).single("file");

// AWS configuration
AWS.config.loadFromPath("config.json");
const params = { Bucket: "codoc-data1" };
let s3Bucket = new AWS.S3({ params });

// Grab all file urls from AWS S3 belonging to current user
// TODO: Make cookies work so that we can parse which files belong to this user
router.get("/all", async (req, res) => {
  const urlParams = {
    Bucket: "codoc-data1"
  };
  s3Bucket.listObjects(urlParams, function(err, data) {
    if (err) res.json(err);
    else res.json(data.Contents);
  });
});

// get an image's url from S3
router.get("/image/:id", async (req, res) => {
  let objectParams = {
    Bucket: "codoc-data1",
    Key: `${req.params.id}`
  };
  const ext = getExtension(req.params.id);
  if (ext === "pdf") {
    objectParams = Object.assign(objectParams, { Range: "bytes=0-9" });
    // pdfs need to be handled differently
    s3Bucket.getObject(objectParams, function(err, data) {
      if (err) res.json(err);
      else {
        res.send(data);
      }
    });
  } else {
    // images/videos/gifs etc
    s3Bucket.getSignedUrl("getObject", objectParams, function(err, url) {
      res.set("Content-Type", "application/pdf");
      res.set(`Content-Disposition: inline; filename=${req.params.id}`);
      res.send(url);
    });
  }
});

// Get the contents of a specific file from S3 so we can populate the editor
router.get("/:id", async (req, res) => {
  const objectParams = {
    Bucket: "codoc-data1",
    Key: `${req.params.id}`
  };
  s3Bucket.getObject(objectParams, function(err, data) {
    if (err) res.json(err);
    res.json(data.Body.toString("ascii"));
  });
});

// dummy route for filepond to get a response
router.post("/dummy/dummy", (req, res) => {
  res.send("dummy");
});

// Upload files to S3 with multer middleware
router.post("/upload/:id", async (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.send(err);
    } else {
      let objectParams = {
        Bucket: "codoc-data1",
        Key: req.params.id,
        Body: req.file.buffer
      };
      s3Bucket.putObject(objectParams, function(err, data) {
        if (err) res.json(err);
        res.send(req.file);
      });
    }
  });
});

// Upload empty files or save files to S3
router.post("/:id", (req, res) => {
  let objectParams = {
    Bucket: "codoc-data1",
    Key: req.params.id
  };
  if (req.body.text) objectParams.Body = req.body.text;
  s3Bucket.putObject(objectParams, function(err, data) {
    if (err) res.json(err);
    res.send(data);
  });
});

// Delete files
router.post("/delete/:id", async (req, res) => {
  let objectParams = {
    Bucket: "codoc-data1",
    Key: req.params.id
  };
  s3Bucket.deleteObject(objectParams, function(err, data) {
    if (err) res.send(false);
    res.send(true);
  });
});

module.exports = router;
