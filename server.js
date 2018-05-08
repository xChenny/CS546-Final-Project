const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const bodyParser = require('body-parser')
const routes = require('./routes')
const { loggedIn } = require('./middlewares/session')

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.raw())
app.use(bodyParser.urlencoded({extended: true}))
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(
  session({
    secret: 'secret-boye',
    resave: false,
    saveUninitialized: false
  })
)
app.use(loggedIn)

routes(app)

app.listen(5500, () => {
  console.log('App is running on port 5500')
})
