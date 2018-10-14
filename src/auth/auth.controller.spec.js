require('firebase-functions-test')()

const chai = require('chai')
const mongoose = require('mongoose')
const Controller = require('./auth.controller')
const ErrorMessages = require('./auth.errors')

const { expect } = chai

describe('Auth Unit Tests', () => {
  let ctrl
  // eslint-disable-next-line
  beforeAll((done) => {
    mongoose.connect('mongodb://localhost:27017/testing', {
      useNewUrlParser: true,
    }, (err) => {
      done(err)
    })
  })

  beforeEach(() => {
    ctrl = new Controller()
  })

  afterEach(() => {
    mongoose.connection.dropCollection('students')
  })

  it('[register] should save a new user to the database', () => {
    const testUser = {
      email: 'email@gmail.com',
      password: 'password',
    }

    return ctrl.register(testUser)
      .then((createdUser) => {
        expect(createdUser.email).to.equal('email@gmail.com')
        expect(createdUser.password).not.to.equal('password')
      })
  })

  it('[register] should reject a new user to the database if they share an email', async () => {
    const testUser = {
      email: 'email@gmail.com',
      password: 'password',
    }

    try {
      await ctrl.register(testUser)
      await ctrl.register(testUser)
      throw new Error('should not have gone through without an error')
    } catch(err) {
      const targetError = ErrorMessages.DuplicateAccount()
      expect(err.message).to.equal(targetError.message)
      expect(err.code).to.equal(targetError.code)
    }
  })

  it('[login] should block a user login if they are not verified', async () => {
    const testUser = {
      email: 'email@gmail',
      password: 'password',
    }

    await ctrl.register(testUser)

    try {
      await ctrl.login(testUser.email, testUser.password)
    } catch (err) {
      const targetError = ErrorMessages.UserNotVerified()
      expect(err.message).to.equal(targetError.message)
      expect(err.code).to.equal(targetError.code)
    }
  })

  it('[login] should block a user to login if they are give the wrong password', async () => {
    const testUser = {
      email: 'email@gmail',
      password: 'password',
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
      email: 'email@gmail',
      password: 'password',
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

  it('[forgotLogin] should update the user\'s resetPass attributes', async () => {
    const testUser = {
      email: 'email@gmail',
      password: 'password',
    }

    const newUser = await ctrl.register(testUser)

    try {
      await ctrl.confirmToken(newUser.confirmEmailToken)
      const { user } = await ctrl.forgotLogin(testUser.email)
      expect(user.resetPasswordExpires).to.exist
      expect(user.resetPasswordToken).to.exist
    } catch (err) {
      expect(err).not.to.exist
    }
  })

  it('[forgotLogin] should throw error if an email was not found', async () => {
    const testUser = {
      email: 'email@gmail',
      password: 'password',
    }

    const newUser = await ctrl.register(testUser)

    try {
      await ctrl.confirmToken(newUser.confirmEmailToken)
      await ctrl.forgotLogin('NotAValidEmail')
      throw new Error('should have thrown an error')
    } catch (err) {
      const targetError = ErrorMessages.NotFoundErr()
      expect(err.message).to.equal(targetError.message)
      expect(err.code).to.equal(targetError.code)
    }
  })
})
