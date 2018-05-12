const express = require('express')
const router = express.Router()
const { validateUser } = require('../db/users')

// Authenticate users
router.post('/', async (req, res) => {
  // Auth Logic
  const user = req.body.username
  const passwd = req.body.password
  if (await validateUser(user, passwd)) {
    // console.log(req.cookies)
    res.clearCookie("user")
    res.clearCookie("loggedOut")
    res.cookie("user", user, { maxAge: 900000, httpOnly: true })
    res.send(true)
  } else {
    res.send(false)
  }
})

module.exports = router
