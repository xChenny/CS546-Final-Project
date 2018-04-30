const express = require("express");
const router = express.Router();

const AWS = require("aws-sdk");
AWS.config.loadFromPath("../config.json");
const s3 = new AWS.S3();
const params = { Bucket: "codoc-data" };
let s3Bucket = new AWS.S3({ params });

// router.post("/", upload.single("file"), async (req, res) => {
//   const data = {
//     // Key: req.files[0].name,
//     Body: req.file
//   };
//   console.log(`data to be uploaded: ${JSON.stringify(data)}`);
//   s3Bucket.putObject(data, function(err, stuff) {
//     if (err) {
//       console.log("Error uploading data: ", stuff);
//     } else {
//       console.log("succesfully uploaded the image!");
//       res.send("Success");
//     }
//   });
// });

router.get("/all", async (req, res) => {
  const urlParams = { Bucket: "not-kickstarter", Key: req.params.id };
  s3Bucket.getSignedUrl("getObject", urlParams, function(err, url) {
    res.json([url]);
  });
});

router.get("/:id", async (req, res) => {
  const urlParams = { Bucket: "not-kickstarter", Key: req.params.id };
  s3Bucket.getSignedUrl("getObject", urlParams, function(err, url) {
    res.json([url]);
  });
});

module.exports = router
