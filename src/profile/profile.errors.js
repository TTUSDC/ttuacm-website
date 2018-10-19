function NotFoundErr() {
  const err = new Error('Cannot find profile in datbase')
  err.code = 404
  return err
}

function CreateProfileError() {
  const err = new Error('Could not create profile')
  err.code = 409
  return err
}

function UpdateProfileError() {
  const err = new Error('Could not update profile')
  err.code = 500
  return err
}

function DuplicateAccount() {
  const err = new Error('There is already an account with that email/id')
  err.code = 409
  return err
}

function UnknownServerError() {
  const err = new Error('Unknown server error')
  err.code = 500
  return err
}

function ErrorTestUtil() {
  const err = new Error('should have thrown an error')
  err.code = 500
  return err
}

module.exports = {
  ErrorTestUtil,
  CreateProfileError,
  UnknownServerError,
  DuplicateAccount,
  NotFoundErr,
  UpdateProfileError,
}
