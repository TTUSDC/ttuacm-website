/**
 * Abstract Base Class
 *
 * Declares errors in ACM
 *
 * NOT MEANT TO BE USED ON ITS OWN
 */
class ACMErrors {
  static MissingRequestBody() {
    const err = new Error('Missing Part of request body')
    err.code = 500
    return err
  }

  static UnknownServerError() {
    const err = new Error('An Unknown Server Error has occured')
    err.code = 500
    return err
  }

  static BadInput(input = '') {
    const err = new Error(`Please check input: ${input}`)
    err.code = 422
    return err
  }

  static NotImplemented() {
    const err = new Error('Not Implemented')
    err.code = 500
    return err
  }
}

module.exports = ACMErrors
