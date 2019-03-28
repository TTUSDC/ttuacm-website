require('dotenv').config()

const test = require('firebase-functions-test')()

test.mockConfig({
  environment: {
    env: 'development',
  },
  connections: {
    protocol: 'protocol',
    host: 'host',
  },
  email: {
    email_username: 'user',
    email_password: 'pass',
  },
})

const request = require('supertest')
const { app } = require('../../../index.js')

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60 // eslint-disable-line

app.listen(8080)

describe('Email Unit Tests', () => {
  it('[test] should be able to connect to email service', () =>
    request(app)
      .get('/v2/email/test')
      .expect(200))

  it('[confirm-email] should be able to send confirmation emails', () =>
    request(app)
      .post('/v2/email/confirm-email')
      .send({
        name: 'Some Name',
        email: 'some-email@gmail.com',
        topic: 'test',
        message: 'message',
      })
      .expect(200))

  it('[reset-password] should be able to send reset password emails', () =>
    request(app)
      .post('/v2/email/reset-password')
      .send({
        email: 'some-email@gmail.com',
        token: 'test',
      })
      .expect(200))
})
