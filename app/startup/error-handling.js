const mongoose = require('mongoose')
const winston = require('winston')

const { FailResponse, ErrorResponse } = require('../lib/jsend-response')

function logErrors (err, req, res, next) {
  if (err instanceof mongoose.Error) {
    winston.error(`${err.name}: ${err.message}`)
    for (const field in err.errors) {
      if (!err.errors.hasOwnProperty(field)) continue
      winston.error(`    ${field}: ${err.errors[field].message}`)
    }
  } else {
    winston.error(err)
  }
  next(err)
}

function clientErrorHandler (err, req, res, next) {
  if (err && err.body && err.code && err.code !== 500) {
    winston.warn(err.body)
    new FailResponse(err.body, err.code).send(res)
  } else {
    winston.error(err.body)
    new ErrorResponse(err.body ? err.body : err).send(res)
  }
}

module.exports = (app) => {
  app.use(logErrors)
  app.use(clientErrorHandler)
}
