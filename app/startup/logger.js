const winston = require('winston')
const morgan = require('morgan')
const config = require('config')

winston.configure({
  transports: [
    new (winston.transports.Console)({
      level: 'info',
      colorize: true,
      label: 'Backend'
    }),
    new (winston.transports.File)({
      name: 'info-logger',
      level: 'info',
      filename: config.get('logger.infoLogPath'),
      timestamp: true
    }),
    new (winston.transports.File)({
      name: 'error-logger',
      level: 'error',
      filename: config.get('logger.errorLogPath'),
      timestamp: true
    })
  ]
})

const allReqLogger = morgan('combined', {
  skip: (req, res) => {
    return res.statusCode > 500
  },
  stream: {
    write: message => winston.info(message.trim())
  }
})

const errReqLogger = morgan('combined', {
  skip: (req, res) => {
    return res.statusCode <= 500
  },
  stream: {
    write: message => winston.error(message.trim())
  }
})

module.exports = (app) => {
  app.use(allReqLogger)
  app.use(errReqLogger)
}
