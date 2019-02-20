const test = require('firebase-functions-test')()

test.mockConfig({
  auth: {
    session_secret: 'SessionSecretForTests!',
  },
  connections: {
    db: 'mongodb://localhost:27017/testing',
  },
})

const chai = require('chai')
const mongoose = require('mongoose')
const Controller = require('./auth.controller')
const Model = require('./auth.model')
const ErrorMessages = require('./auth.errors')

const { expect } = chai

describe('Auth Unit Tests', () => {
  let ctrl
  let model
  // eslint-disable-next-line
  beforeEach(async () => {
    ctrl = new Controller()
    model = new Model()
    await model.connect()
    await mongoose.connection.dropDatabase()
  })

  it('[register] should save a new user to the database', async () => {
    const testUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'email@gmail.com',
      password: 'password',
      classification: 'Freshman',
    }

    const createdUser = await ctrl.register(testUser)
    expect(createdUser.email).to.equal('email@gmail.com')
    expect(createdUser.password).not.to.equal('password')
  })

  it('[register] should reject a new user to the database if they share an email', async () => {
    const testUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'email@gmail.com',
      password: 'password',
      classification: 'Freshman',
    }

    try {
      await ctrl.register(testUser)
      await ctrl.register(testUser)
      throw ErrorMessages.ErrorTestUtil()
    } catch (err) {
      const targetError = ErrorMessages.DuplicateAccount()
      expect(err.message).to.equal(targetError.message)
      expect(err.code).to.equal(targetError.code)
    }
  })

  it('[login] should block a user login if they are not verified', async () => {
    const testUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'email@gmail.com',
      password: 'password',
      classification: 'Freshman',
    }

    const newUser = await ctrl.register(testUser)

    try {
      await ctrl.login(newUser.email, newUser.password)
    } catch (err) {
      const targetError = ErrorMessages.UserNotVerified()
      expect(err.message).to.equal(targetError.message)
      expect(err.code).to.equal(targetError.code)
    }
  })

  it('[login] should block a user to login if they are give the wrong password', async () => {
    const testUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'email@gmail.com',
      password: 'password',
      classification: 'Freshman',
    }

    const newUser = await ctrl.register(testUser)

    try {
      await ctrl.confirmToken(newUser.confirmEmailToken)
      await ctrl.login(testUser.email, 'NotTheRightPassword')
    } catch (err) {
      const targetError = ErrorMessages.InvalidLogin()
      expect(err.message).to.equal(targetError.message)
      expect(err.code).to.equal(targetError.code)
    }
  })

  it('[login] should allow a user to login if they are give the right password', async () => {
    const testUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'email@gmail.com',
      password: 'password',
      classification: 'Freshman',
      verified: true,
    }

    const newUser = await ctrl.register(testUser)

    try {
      await ctrl.confirmToken(newUser.confirmEmailToken)
      // testUser is passed by reference so you have to hardcode password
      const { token, foundUser } = await ctrl.login(testUser.email, 'password')
      expect(token).to.exist
      expect(foundUser).to.exist
    } catch (err) {
      expect(err).not.to.exist
    }
  })

  it("[forgotLogin] should update the user's resetPass attributes", async () => {
    const testUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'email@gmail.com',
      password: 'password',
      classification: 'Freshman',
      confirmEmailToken: '',
      verified: true,
    }

    try {
      await model.createNewUser(testUser)
      const { user } = await ctrl.forgotLogin(testUser.email)
      expect(user.resetPasswordExpires).to.exist
      expect(user.resetPasswordToken).to.exist
    } catch (err) {
      expect(err).not.to.exist
    }
  })

  it('[forgotLogin] should throw error if an email was not found', async () => {
    const testUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'email@gmail.com',
      password: 'password',
      classification: 'Freshman',
      verified: true,
    }

    try {
      await model.createNewUser(testUser)
      await ctrl.forgotLogin('NotAValidEmail')
      throw ErrorMessages.ErrorTestUtil()
    } catch (err) {
      const targetError = ErrorMessages.NotFoundErr()
      expect(err.message).to.equal(targetError.message)
      expect(err.code).to.equal(targetError.code)
    }
  })

  it('[resetToken] should throw an error if a reset token was not passed', async () => {
    const testUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'email@gmail.com',
      password: 'password',
      classification: 'Freshman',
    }

    try {
      await model.createNewUser(testUser)
      await ctrl.resetToken()
      throw ErrorMessages.ErrorTestUtil()
    } catch (err) {
      const targetError = ErrorMessages.MissingToken()
      expect(err.message).to.equal(targetError.message)
      expect(err.code).to.equal(targetError.code)
    }
  })

  it('[resetToken] should throw an error if an invalid token was passed', async () => {
    const testUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'email@gmail.com',
      password: 'password',
      classification: 'Freshman',
    }

    try {
      await model.createNewUser(testUser)
      await ctrl.resetToken('Bad Token')
      throw ErrorMessages.ErrorTestUtil()
    } catch (err) {
      const targetError = ErrorMessages.NotFoundErr()
      expect(err.message).to.equal(targetError.message)
      expect(err.code).to.equal(targetError.code)
    }
  })

  it("[resetToken] should resolve with the user's token", async () => {
    const testUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'email@gmail.com',
      password: 'password',
      classification: 'Freshman',
      resetPasswordToken: 'Token',
      resetPasswordExpires: Date.now() + 1000000,
    }

    try {
      await model.createNewUser(testUser)
      const successToken = await ctrl.resetToken('Token')
      expect(successToken).to.exist
    } catch (err) {
      expect(err).not.to.exist
    }
  })

  it('[verifyUser] should throw an error when the user passes a bad JWT', async () => {
    const testUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'email@gmail.com',
      password: 'password',
      classification: 'Freshman',
      resetPasswordToken: 'Token',
      resetPasswordExpires: Date.now() + 1000000,
    }

    try {
      const newUser = await model.createNewUser(testUser)
      await ctrl.verifyUser('Bad Token', newUser.password)
      throw ErrorMessages.ErrorTestUtil()
    } catch (err) {
      const targetError = ErrorMessages.NotFoundErr()
      expect(err.message).to.equal(targetError.message)
      expect(err.code).to.equal(targetError.code)
    }
  })

  it('[verifyUser] should update the found user when they pass a valid JWT', async () => {
    const testUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'email@gmail.com',
      password: 'password',
      classification: 'Freshman',
      resetPasswordToken: 'Token',
      resetPasswordExpires: Date.now() + 1000000,
    }

    try {
      await model.createNewUser(testUser)
      const updatedUser = await ctrl.verifyUser('Token', 'password')
      expect(updatedUser).to.exist
    } catch (err) {
      expect(err).not.to.exist
    }
  })

  it('[confirmToken] should correctly compare two matching tokens', async () => {
    const testUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'email@gmail.com',
      password: 'password',
      classification: 'Freshman',
      confirmEmailToken: 'Token',
    }

    try {
      await model.createNewUser(testUser)
      const updatedUser = await ctrl.confirmToken('Token')
      expect(updatedUser.confirmEmailToken).to.equal('')
      expect(updatedUser.verified).to.equal(true)
    } catch (err) {
      expect(err).not.to.exist
    }
  })

  it('[confirmToken] should throw error for two mismatching tokens', async () => {
    const testUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'email@gmail.com',
      password: 'password',
      classification: 'Freshman',
      confirmEmailToken: 'Token',
    }

    try {
      await model.createNewUser(testUser)
      await ctrl.confirmToken('Bad Token')
      throw ErrorMessages.ErrorTestUtil()
    } catch (err) {
      const targetError = ErrorMessages.NotFoundErr()
      expect(err.message).to.equal(targetError.message)
      expect(err.code).to.equal(targetError.code)
    }
  })
})
