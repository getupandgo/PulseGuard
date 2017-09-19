const { ApiResponseSuccess, generateJwt } = require('../utils')
const User = require('../models/user')
const { validateUser } = require('../schemas')

  //   _id: request._id,
  //   username: request.profile.username,
  //   email: request.email,
  //   role: request.role

exports.register = function (req, res, next) {
  if (!validateUser(req.body)) next({ message: 'Validation error' })

  User.findOne({ email: req.body.email })
    .then(existingUser => {
      if (existingUser) next({ message: 'That email address is already in use.' })

      const user = new User(req.body)
      return user.save()
    })
    .then(() => new ApiResponseSuccess({ message: 'registration success' }).send(res))
    .catch(next)
}

exports.login = function (req, res, next) {
  new ApiResponseSuccess({
    token: `JWT ${generateJwt(req.body)}`,
    user: req.body
  }).send(res)
}

//
// exports.me = (req, res) => {
//   return new ApiResponseSuccess({ user: setUserInfo(req.user) }).send(res)
// }
//
// exports.updatePassword = (req, res, next) => {
//   const password = req.body.password
//   const oldPassword = req.body.oldPassword
//
//   if (!password || !oldPassword) {
//     next({ body: { message: 'Password or old password not provided' }, message: 'Password or old password not provided', code: 400 })
//   }
//
//   User.findById(req.user._id)
//     .then(user => {
//       if (!user) next({body: {message: 'Wrong user\'s email'}, message: 'Wrong user\'s email', code: 400})
//       return user.comparePassword(oldPassword)
//     })
//     .then(user => {
//       user.password = password
//       user.save(err => {
//         if (err) next(err)
//         new ApiResponseSuccess({ user: setUserInfo(user) }).send(res)
//       })
//     })
//     .catch(next)
// }
//
// exports.updateProfile = (req, res, next) => {
//   const username = req.body.username
//   const password = req.body.password
//   const oldPassword = req.body.oldPassword
//
//   if (!password || !oldPassword) throw { body: { message: 'Username password or old password not provided' }, message: 'Password or old password not provided', code: 400 }
//
//   User.findById(req.user._id)
//     .then(user => {
//       if (!user) next({body: {message: 'Wrong user\'s email'}, message: 'Wrong user\'s email', code: 400})
//       return user.comparePassword(oldPassword)
//     })
//     .then(user => {
//       user.password = password
//       user.profile.username = username
//       user.save(err => {
//         if (err) next(err)
//         new ApiResponseSuccess({user: setUserInfo(user)}).send(res)
//       })
//     })
//     .catch(next)
// }
//
// exports.updateUsername = async (req, res, next) => {
//   try {
//     const username = req.body.username
//     if (!username) throw { body: { message: 'Username was not provided' } }
//
//     const updatedUser = await User.findByIdAndUpdate(req.user._id, { $set: { 'profile.username': username } }, { new: true })
//     if (!updatedUser) throw { body: { message: 'something wrong with token' } }
//
//     new ApiResponseSuccess({ user: setUserInfo(updatedUser) }).send(res)
//   } catch (err) {
//     next(err)
//   }
// }
