const express = require("express");
const router = expres.Router();

const authenticate = request => {
    const username = request.body.username;
    const password = request.body.password;
}

router.get("/", (req, res) => {
    // Logic
    res.redirect("/home")
})

