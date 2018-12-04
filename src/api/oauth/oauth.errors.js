function OAuthError() {
  const err = new Error('There was an error with the the credentials, please refresh manually')
  err.code = 500
  return err
}

function UnknownServerError() {
  const err = new Error('Unknown server error')
  err.code = 500
  return err
}

module.exports = {
  OAuthError,
  UnknownServerError,
}
