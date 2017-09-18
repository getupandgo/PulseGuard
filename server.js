const config = require('config')
const winston = require('winston')

const start = require('./app')

start()
  .then(app => {
    app.listen(config.get('port'), config.get('hostname'), () => {
      winston.info('Server listening on port %s', config.get('port'))
    })
  })
