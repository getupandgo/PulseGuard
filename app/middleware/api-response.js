const apiResponse = require('../utils/api-response')

module.exports = (err, req, res, next) => {
  if (err instanceof apiResponse.ApiResponseFail) {
    err.send(res)
    return
  }

  next(err)
}
