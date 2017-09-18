const jsend = require('jsend')

class ApiResponse {
  constructor (data, status = 200) {
    this.status = status
    this.data = data
  }

  build () {
    switch (this.constructor.name) {
      case 'ApiResponseSuccess':
        return jsend.success(this.data)
      case 'ApiResponseFail':
        return jsend.fail(this.data)
      case 'ApiResponseError':
        return jsend.error(this.data)
      default:
        return null
    }
  }

  send (res) {
    res.status(this.status).json(this.build())
  }
}

class ApiResponseSuccess extends ApiResponse { }

class ApiResponseFail extends ApiResponse {
  constructor (data, status = 400) {
    super(data, status)
  }
}

class ApiResponseError extends ApiResponse {
  constructor (data, status = 500) {
    super(data, status)
  }
}

module.exports = {
  ApiResponseSuccess,
  ApiResponseFail,
  ApiResponseError
}
