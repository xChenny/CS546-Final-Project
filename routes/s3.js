const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");

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
const storage = multer.memoryStorage()
// 'file' is the 'name' of the axios body input in fileupload/index.js 
let upload = multer({
  storage,
  limits: {
    fileSize: 1000000
  }
}).single("file");

// AWS configuration
AWS.config.loadFromPath("config.json");
const params = { Bucket: "codoc-data" };
let s3Bucket = new AWS.S3({ params });

// Grab all file urls from AWS S3 belonging to current user
// TODO: Make cookies work so that we can parse which files belong to this user
router.get("/all", async (req, res) => {
  const urlParams = {
    Bucket: "codoc-data"
    // Prefix: 'testUser-'
  };
  s3Bucket.listObjects(urlParams, function(err, data) {
    if (err) res.json(err);
    else res.json(data.Contents);
  });
});

// Get the contents of a specific file from S3 so we can populate the editor
router.get("/:id", async (req, res) => {
  const objectParams = {
    Bucket: "codoc-data",
    Key: `${req.params.id}`
  };
  s3Bucket.getObject(objectParams, function(err, data) {
    if (err) res.json(err);
    res.json(data.Body.toString("ascii"));
  });
});

// Upload files to S3 with multer middleware
router.post("/:id", async (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.send(err);
    } else {
      let objectParams = {
        Bucket: "codoc-data",
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

// Delete files
router.post("/delete/:id", async (req, res) => {
  let objectParams = {
    Bucket: "codoc-data",
    Key: req.params.id
  };
  s3Bucket.deleteObject(objectParams, function(err, data) {
    if (err) res.send(false);
    res.send(true);
  });
});

module.exports = router;
