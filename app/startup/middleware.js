const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('config')
const morgan = require('morgan')

const routes = require('../routes')

// const apiResponseMiddleware = require('../middleware/api-response')

module.exports = (app) => {
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  if (config.util.getEnv('NODE_ENV') !== 'test') {
    app.use(morgan('dev'))
  }
  app.use(routes)
  // app.use(apiResponseMiddleware)
}
