function InvalidAPIOption(option) {
  const err = new Error(`The API: '${option}' is not supported`)
  err.code = 404
  return err
}

function OAuthError() {
  const err = new Error('There was an error with the the credentials, please refresh manually')
  err.code = 404
  return err
}

function NotFoundErr() {
  const err = new Error('Cannot find user in datbase')
  err.code = 404
  return err
}

function MergeAccError() {
  const err = new Error('There was an error in merging the account')
  err.code = 409
  return err
}

function CreateUserError() {
  const err = new Error('Could not create user')
  err.code = 409
  return err
}

function DuplicateAccount() {
  const err = new Error('There is already an account with that email/id')
  err.code = 409
  return err
}

function HashingErr() {
  const err = new Error('Error hashing password')
  err.code = 404
  return err
}

function UnknownServerError() {
  const err = new Error('Unknown server error')
  err.code = 404
  return err
}

module.exports = {
  InvalidAPIOption,
  HashingErr,
  CreateUserError,
  UnknownServerError,
  DuplicateAccount,
  MergeAccError,
  OAuthError,
  NotFoundErr,
}
