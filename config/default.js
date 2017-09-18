const path = require('path')

module.exports = {
  port: 3000,
  hostname: '0.0.0.0',
  database: 'mongodb://localhost:27017/pulseguard',
  templatesDir: path.join(__dirname, '../views/'),
  jwt: {
    secret: 'banana123351'
  },
  logger: {
    infoLogPath: './logs/info.log',
    errorLogPath: './logs/error.log'
  }
}
