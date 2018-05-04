const express = require('express')
const router = express.Router()
const {createUser} = require('../db/users')

router.post('/user', async (req, res) => {
  const user = req.body.username
  const pass = req.body.password
  if (await createUser(user, pass)) { res.redirect('http://localhost:3000/dashboard') } else { res.redirect('http://localhost:3000/signup') }
})

router.post('/file', async (req, res) => {
  const fileName = req.body.fileName
  console.log(fileName);
  res.redirect(`/editor/${fileName}`);
})

module.exports = router
