const jsend = require('jsend')

/* JSend wrapper for express by @nickrabaev
* typical usage:
* ApiResponseSuccess(data)
* non typical usage:
* ApiResponseFail(data, httpCode)
* */

class Response {
  constructor (requestBody = null, httpStatusCode = 200, type = 'success') {
    this.type = type
    this.httpStatusCode = httpStatusCode
    this.responseBody = requestBody
  }
  buildResponseBody () {
    return jsend[this.type](this.responseBody)
  }
  send (res) {
    res.status(this.httpStatusCode).json(this.buildResponseBody())
  }
}

function SuccessResponse (requestBody, httpStatusCode) {
  return new Response(requestBody, httpStatusCode)
}

function FailResponse (requestBody, httpStatusCode = 400) {
  return new Response(requestBody, httpStatusCode, 'fail')
}

function ErrorResponse (requestBody, httpStatusCode = 500) {
  return new Response(requestBody, httpStatusCode, 'error')
}

module.exports = {
  SuccessResponse,
  FailResponse,
  ErrorResponse
}
