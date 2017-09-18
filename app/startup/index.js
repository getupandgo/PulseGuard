const Promise = require('bluebird')

const database = require('./database')
const middleware = require('./middleware')
const errorHandling = require('./error-handling')

module.exports = app =>
  Promise
    .each([
      database,
      middleware,
      errorHandling
    ], func => func(app))
    .then(() => app)
