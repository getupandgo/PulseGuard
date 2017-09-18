const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String
  },
  role: {
    type: String,
    enum: ['admin', 'client'],
    default: 'client'
  }
},
  {
    timestamps: true
  })

UserSchema.pre('save', async function userPreSave (next) {
  const user = this
  const SALT_FACTOR = 5

  if (!user.isModified('password')) next()

  const salt = await bcrypt.genSalt(SALT_FACTOR)
  user.password = await bcrypt.hash(user.password, salt)
  next()
})

UserSchema.methods.comparePassword = function comparePassword (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('User', UserSchema)
