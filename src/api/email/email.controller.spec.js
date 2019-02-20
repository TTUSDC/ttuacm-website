const test = require('firebase-functions-test')()

test.mockConfig({
  email: {
    email_username: 'v2z435ain366pxsa@ethereal.email',
    email_password: 'g7U7pZp5YAmZ2sMXDb',
  },
  connections: {
    protocol: 'protocol',
    host: 'host',
  },
  environment: {
    env: 'testing',
  },
})

const chai = require('chai')
const Controller = require('./email.controller')

const { expect } = chai

describe('Email Unit Tests', () => {
  let ctrl

  beforeEach(() => {
    ctrl = new Controller()
  })

  it('[sendResetEmail] should send reset email without error', async () => {
    try {
      await ctrl.sendResetEmail('email@gmail.com', 'Token')
    } catch (err) {
      expect(err).not.to.exist
    }
  })

  it('[sendChangedPasswordEmail] should send changed password email without error', async () => {
    try {
      await ctrl.sendChangedPasswordEmail('email@gmail.com')
    } catch (err) {
      expect(err).not.to.exist
    }
  })

  it('[contactUs] should send contact us email without error', async () => {
    try {
      const options = {
        email: 'email@gmail.com',
        name: 'testUser',
        topic: 'topic',
        message: 'hello world!',
      }
      await ctrl.contactUs(options)
    } catch (err) {
      expect(err).not.to.exist
    }
  })

  it('[sendConfirmationEmail] should send confirmation email without error', async () => {
    try {
      await ctrl.sendConfirmationEmail('email@gmail.com', 'token')
    } catch (err) {
      expect(err).not.to.exist
    }
  })
})
