require('firebase-functions-test')()
const chai = require('chai')
const mongoose = require('mongoose')
const Controller = require('./profile.controller')
const Model = require('./profile.model')
const ErrorMessages = require('./profile.errors')

const { expect } = chai

describe('Profile Unit Tests', () => {
  let ctrl
  let model
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
    model = new Model()
  })

  afterEach(() => {
    // Make sure to at least create one user for each test
    // or this will error out
    mongoose.connection.dropCollection('profiles')
  })

  it('[createNewUser] should reject a new profile to the database if one exists', async () => {
    const testProfile = {
      email: 'email@gmail.com',
      firstName: 'Miggy',
      lastName: 'Reyes',
      classification: 'Freshman'
    }

    try {
      await model.createNewProfile(testProfile)
      await ctrl.createProfile(testProfile)
      throw ErrorMessages.ErrorTestUtil()
    } catch (err) {
      const targetError = ErrorMessages.DuplicateAccount()
      expect(err.message).to.equal(targetError.message)
      expect(err.code).to.equal(targetError.code)
    }
  })

  it('[createNewUser] should save a new profile to the database if one does not exists', async () => {
    const testProfile = {
      email: 'email@gmail.com',
      firstName: 'Miggy',
      lastName: 'Reyes',
      classification: 'Freshman'
    }

    try {
      const createdUser = await ctrl.createProfile(testProfile)
      expect(createdUser.firstName).to.equal('Miggy')
    } catch (err) {
      expect(err).not.to.exist
    }
  })


  it('[getProfileByEmail] should find a profile in the database if one does exists', async () => {
    const testProfile = {
      email: 'email@gmail.com',
      firstName: 'Miggy',
      lastName: 'Reyes',
      classification: 'Freshman'
    }

    try {
      await model.createNewProfile(testProfile)
      const foundUser = await ctrl.getProfileByEmail('email@gmail.com')
      expect(foundUser.firstName).to.equal('Miggy')
    } catch (err) {
      expect(err).not.to.exist
    }
  })

  it('[getProfileByEmail] should error out when a user is not found', async () => {
    const testProfile = {
      email: 'email@gmail.com',
      firstName: 'Miggy',
      lastName: 'Reyes',
      classification: 'Freshman'
    }

    try {
      await model.createNewProfile(testProfile)
      await ctrl.getProfileByEmail('some-other-email@gmail.com')
      throw ErrorMessages.ErrorTestUtil()
    } catch (err) {
      const targetError = ErrorMessages.NotFoundErr()
      expect(err.message).to.equal(targetError.message)
      expect(err.code).to.equal(targetError.code)
    }
  })
})
