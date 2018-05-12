// Routers
const auth = require('./auth')
const create = require('./create')
const s3 = require('./s3')
const mdcompile = require('./mdcompile')

// Router combiner: Joins all routers to create the backend
const routes = app => {
  app.use('/login', auth)
  app.use('/create', create)
  app.use('/s3', s3)
  app.use('/mdcompile', mdcompile)

  app.use('*', (req, res) => {
    res.status(404).send('Page Not Found!')
  })
}

module.exports = routes
