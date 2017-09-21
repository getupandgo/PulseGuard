const Promise = require('bluebird')

const database = require('./database')
const middleware = require('./middleware')
const errorHandling = require('./error-handling')
const logger = require('./logger')

module.exports = app =>
  Promise
    .each([
      logger,
      database,
      middleware,
      errorHandling
    ], func => func(app))
    .then(() => app)
