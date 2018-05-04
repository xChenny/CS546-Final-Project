const express = require("express");
const router = express.Router();

const AWS = require("aws-sdk");
AWS.config.loadFromPath("config.json");
const params = {
  Bucket: "codoc-data"
};
let s3Bucket = new AWS.S3({
  params
});

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
  const urlParams = {
    Bucket: "codoc-data",
    Prefix: "testUser-"
  };
  s3Bucket.listObjects(urlParams, function(err, data) {
    if (err) res.json(err);
    res.json(data.Contents);
  });
});

router.get("/:id", async (req, res) => {
  const objectParams = {
    Bucket: "codoc-data",
    Key: req.params.id
  };
  // console.log(req.params.id);
  s3Bucket.getObject(objectParams, function(err, data) {
    if (err) res.json(err);
    res.json(data.Body.toString("ascii"));
  });
});

module.exports = router;
