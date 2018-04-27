const express = require("express");
const router = expres.Router();
const { createUser, validateUser } = require("../db/users");

const authenticate = request => {
  const username = request.body.username;
  const password = request.body.password;
};

router.get("/", (req, res) => {
  // Logic
  res.redirect("/home");
});

module.exports = router;
