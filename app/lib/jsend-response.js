const jsend = require('jsend')

/* JSend wrapper for express by @nickrabaev
* typical usage:
* ApiResponseSuccess(data)
* non typical usage:
* ApiResponseFail(data, httpCode)
* */

class Response {
  constructor (requestBody = null, httpStatusCode = 200) {
    this.httpStatusCode = httpStatusCode
    this.requestBody = requestBody
  }

  buildJSendBody () {
    switch (this.constructor.name) {
      case 'SuccessResponse':
        return jsend.success(this.requestBody)
      case 'FailResponse':
        return jsend.fail(this.requestBody)
      case 'ErrorResponse':
        return jsend.error(this.requestBody)
      default:
        return null
    }
  }

  send (res) {
    res.status(this.httpStatusCode).json(this.buildJSendBody())
  }
}

class SuccessResponse extends Response { }

class FailResponse extends Response {
  constructor (requestBody, httpStatusCode = 400) {
    super(requestBody, httpStatusCode)
  }
}

class ErrorResponse extends Response {
  constructor (requestBody, httpStatusCode = 500) {
    super(requestBody, httpStatusCode)
  }
}

module.exports = {
  SuccessResponse,
  FailResponse,
  ErrorResponse
}
