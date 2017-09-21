const bodyParser = require('body-parser')
const cors = require('cors')

const routes = require('../routes')

module.exports = (app) => {
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(routes)
}
