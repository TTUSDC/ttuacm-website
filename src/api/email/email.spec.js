require('dotenv').config()
const request = require('supertest')
let { app } = require('../../../index.js')

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 10 // eslint-disable-line

if (process.env.CI) {
  app = 'https://us-central1-acm-texas-tech-web-app-2-beta.cloudfunctions.net'
} else {
  app.listen(8080)
}

describe('Email Unit Tests', () => {
  const tag = process.env.CI ? '/api' : '' // eslint-disable-line

  it('[test] should be able to connect to email service', () =>
    request(app)
      .get(`${tag}/v2/email/test`)
      .expect(200))

  it('[confirm-email] should be able to send confirmation emails', () =>
    request(app)
      .post(`${tag}/v2/email/confirm-email`)
      .send({
        name: 'Some Name',
        email: 'some-email@gmail.com',
        topic: 'test',
        message: 'message',
      })
      .expect(200))

  it('[reset-password] should be able to send reset password emails', () =>
    request(app)
      .post(`${tag}/v2/email/reset-password`)
      .send({
        email: 'some-email@gmail.com',
        token: 'test',
      })
      .expect(200))
})
