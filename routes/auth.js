const express = require('express')
const router = express.Router()
const { validateUser } = require('../db/users')

router.post('/', async (req, res) => {
  // Auth Logic
  const user = req.body.username
  const passwd = req.body.password
  if (await validateUser(user, passwd)) {
    req.session.user = user
    console.log(req.session)
    res.send(true)
  } else {
    res.send(false)
  }
})

module.exports = router
