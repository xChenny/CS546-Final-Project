const express = require("express");
const router = express.Router();
const { createUser } = require("../db/users");

// Create a new user within MongoDB
router.post("/user", async (req, res) => {
  const user = req.body.username;
  const pass = req.body.password;
  if (await createUser(user, pass)) {
    res.send(true);
  } else {
    res.send(false);
  }
});

module.exports = router;
