const express = require('express')
const router = express.Router()
const { validateUser } = require('../db/users')
// const passport = require('passport')

router.post('/', async (req, res) => {
  // Auth Logic
  const user = req.body.username
  const passwd = req.body.password
  if (await validateUser(user, passwd)) { res.redirect('http://localhost:3000/dashboard') } else res.redirect('http://localhost:3000/error')
  res.send(await validateUser(user, passwd))
})

module.exports = router
