const Ajv = require('ajv')
const ajv = new Ajv({ allErrors: true })

const UserSchema = require('./user')

module.exports = {
  validateUser: ajv.compile(UserSchema)
}
