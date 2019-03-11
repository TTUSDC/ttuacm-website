function MissingRequestBody() {
  const err = new Error('Missing Part of request body')
  err.code = 500
  return err
}

function UnknownServerError() {
  const err = new Error('An Unknown Server Error has occured')
  err.code = 500
  return err
}

function BadInput() {
  const err = new Error('Groups is not in an array')
  err.code = 422
  return err
}

function NotImplemented() {
  const err = new Error('Not Implemented')
  err.code = 500
  return err
}

module.exports = {
  BadInput,
  MissingRequestBody,
  NotImplemented,
  UnknownServerError,
}
