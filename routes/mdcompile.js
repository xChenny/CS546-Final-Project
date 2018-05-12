const express = require("express");
const router = express.Router();
var markdown = require("markdown").markdown;

router.post("/compile", (req, res) => {
  let md = null;
  if (req.body.md) md = req.body.md;
  else res.send();
  // console.log(md);
  res.send(markdown.toHTML(md));
  // console.log(markdown.toHTML(md))
});

module.exports = router;
