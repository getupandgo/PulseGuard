const jwt = require('jsonwebtoken')
const config = require('config')

exports.generateToken = function (user) {
  return jwt.sign(user, config.get('jwt.secret'), {
    expiresIn: 10080 // in seconds
  })
}
