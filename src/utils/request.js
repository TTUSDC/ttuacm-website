const axios = require('axios')
const functions = require('firebase-functions')
const ErrorMessages = require('./request.errors')

const { connections } = functions.config()

// These are the required environment variables
const { protocol, host } = connections

const AVAILABLE_VERSIONS = ['v2']
const AVAILABLE_SERVICES = [
  'auth',
  'teams',
  'events',
  'profile',
  'email',
]

/**
 * Handles the errors returned from call
 *
 * @param {object} err Axios Error
 */
function errorHandler(err) {
  if (err.response) {
    // Server responded with a status code outside 2xx range.
    console.error(ErrorMessages.ResponseError(err))
  } else if (err.request) {
    // No response recieved
    console.error(ErrorMessages.NoResponseError())
  } else {
    // Who knows
    console.error(ErrorMessages.UnknownServerError())
  }
}

/**
 * Handles the creation of API Calls
 *
 * @example
 * const request = new Request('v2', 'auth')
 *
 * request.post().path('/register')
 *  .body(newUser)
 *  .end().then((res) => {
 *    console.log('Success!')
 *  }).catch((err) => {
 *    console.log('Failure!')
 *    console.error(err)
 *  })
 */
class Request {
  /**
   * Sets defaults for the connection
   * @param {string} version version of the api to use
   * @param {string} service service of the api to use
   */
  constructor(version, service) {
    if (!AVAILABLE_VERSIONS.includes(version)) throw ErrorMessages.BadVersion()
    if (!AVAILABLE_SERVICES.includes(service)) throw ErrorMessages.BadService()

    this.version = version
    this.status = 0
    this.url = '/'
    this.method = 'get'
    this.config = {
      data: {},
      params: {},
    }

    this.instance = axios.create({
      baseURL: `${protocol}://${host}/api/${version}/${service}`,
      timeout: 5000,
    })
  }

  /**
   * Sets the body of the request object
   *
   * @param {object} body
   * @returns {Request}
   */
  body(body) {
    Object.keys(body).forEach((key) => {
      this.config.data[key] = body[key]
    })
    return this
  }

  /**
   * Sets the params of the request object
   *
   * @param {object} params
   * @returns {Request}
   */
  params(params) {
    Object.keys(params).forEach((key) => {
      this.config.params[key] = params[key]
    })
    return this
  }

  /**
   * Sets the path
   *
   * @param {string} path
   * @returns {Request}
   */
  _path(path) {
    this.url = path || '/'
    return this
  }

  /**
   * Sets the method for the call
   *
   * @private
   * @param {string} method
   * @returns {Request}
   */
  _setMethod(method) {
    this.method = method
    return this
  }

  post(path) {
    this._path(path)
    return this._setMethod('post')
  }

  del(path) {
    this._path(path)
    return this._setMethod('delete')
  }


  put(path) {
    this._path(path)
    return this._setMethod('put')
  }

  patch(path) {
    this._path(path)
    return this._setMethod('patch')
  }

  get(path) {
    this._path(path)
    return this._setMethod('get')
  }

  test() { return this._path('/test') }

  /**
   * Composes the call altogether
   * @returns {Promise.<Response, Error>}
   */
  async end() {
    this.config.method = this.method
    this.config.url = this.url

    try {
      let res
      if (process.env.NODE_ENV !== 'test') {
        res = this.instance(this.config)
      } else {
        res = this.config
      }
      return res
    } catch (err) {
      errorHandler(err)
      return err
    }
  }
}

module.exports.Request = Request
module.exports.SERVICES = AVAILABLE_SERVICES
module.exports.VERSIONS = AVAILABLE_VERSIONS
