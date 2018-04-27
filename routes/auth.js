const express = require("express");
const router = express.Router();
const { createUser, validateUser } = require("../db/users");

router.post("/", (req, res) => {
  // Auth Logic
  const user = req.body.username;
  const passwd = req.body.password;
  if (validateUser(user, passwd)) res.redirect("/home");
  else res.send("Invalid Username/Password combination!");
});

module.exports = router;
