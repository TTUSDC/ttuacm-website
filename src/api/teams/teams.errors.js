function MissingRequestBody(body) {
  const err = new Error('Missing Part of request body')
  console.warn(body)
  err.code = 404
  return err
}

function CreateTeamError(name) {
  const err = new Error(`Cannot create team: ${name}`)
  err.code = 500
  return err
}

function TeamNotFound(name) {
  const err = new Error(`Cannot find team: ${name}`)
  err.code = 404
  return err
}

function UnknownServerError() {
  const err = new Error('An Unknown Server Error has occured')
  err.code = 500
  return err
}

exports = {
  CreateTeamError,
  MissingRequestBody,
  TeamNotFound,
  UnknownServerError,
}
