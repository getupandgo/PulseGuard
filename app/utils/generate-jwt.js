const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (user) {
  return jwt.sign(user, config.get('jwt.secret'), {
    expiresIn: 10080 // in seconds
  })
}
