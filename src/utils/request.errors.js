module.exports.BadService = (service) => {
  const err = new Error(`The API: '${service}' is not supported`)
  err.code = 400
  return err
}

module.exports.BadVersion = (version) => {
  const err = new Error(`The version: '${version}' is not supported`)
  err.code = 400
  return err
}

module.exports.BadVersion = (version) => {
  const err = new Error(`The version: '${version}' is not supported`)
  err.code = 400
  return err
}

module.exports.ResponseError = (error) => {
  const err = new Error(`Response Error: ${error}`)
  err.code = error.code
  return err
}

module.exports.NoResponseError = () => {
  const err = new Error('No Response Error')
  err.code = 404
  return err
}

module.exports.NoResponseError = () => {
  const err = new Error('Unknown Server Error')
  err.code = 404
  return err
}
