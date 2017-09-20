const apiResponse = require('../lib/jsend-response')

module.exports = (err, req, res, next) => {
  if (err instanceof apiResponse.ApiResponseFail) {
    err.send(res)
    return
  }

  next(err)
}
