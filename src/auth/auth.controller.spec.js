require('firebase-functions-test')()

const chai = require('chai')
const mongoose = require('mongoose')
const { Mockgoose } = require('mockgoose')
const Controller = require('./auth.controller')
const ErrorMessages = require('./auth.errors')

const mockgoose = new Mockgoose(mongoose)
const { expect } = chai

describe('Auth Unit Tests', () => {
  let ctrl
  // eslint-disable-next-line
  beforeAll((done) => {
    mockgoose.prepareStorage().then(() => {
      mongoose.connect('mongodb://localhost:27017/testing', {
        useNewUrlParser: true,
      }, (err) => {
        done(err)
      })
    })
  })

  beforeEach(() => {
    ctrl = new Controller()
  })

  it('should save a new user to the database', (done) => {
    const testUser = {
      email: 'email@gmail.com',
      password: 'password',
    }

    ctrl.register(testUser)
      .then((createdUser) => {
        expect(createdUser.email).to.equal('email@gmail.com')
        expect(createdUser.password).not.to.equal('password')
        done()
      })
      .catch(err => done(err))
  })

  it('should reject a new user to the database if they share an email', async () => {
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
})
