const test = require('firebase-functions-test')()

test.mockConfig({
  email: {
    // Fake email provider. No need to hide it
    email_username: "v2z435ain366pxsa@ethereal.email",
    email_password: "g7U7pZp5YAmZ2sMXDb"
  }
})

const request = require('supertest')
const app = require('./email.app')

describe('Email Integration Tests', () => {
  it('should be able to connect to email service', () => request(app)
      .get('/api/v2/test')
      .expect(200))

  it('should be able to send confirmation emails', () => request(app)
      .post('/api/v2/confirm-email')
      .send({
        name: 'Some Name',
        email: 'some-email@gmail.com',
        topic: 'test',
        message: 'message'
      })
      .expect(200))

  it('should be able to send contact us emails', () => request(app)
      .post('/api/v2/contact-us')
      .send({
        name: 'Some Name',
        email: 'some-email@gmail.com',
        topic: 'test',
        message: 'message'
      })
      .expect(200))

  it('should be able to send reset password emails', () => request(app)
      .post('/api/v2/reset-password')
      .send({
        email: 'some-email@gmail.com',
        token: 'test',
      })
      .expect(200))

  it('should be able to send changed password emails', () => request(app)
      .post('/api/v2/change-password-notif')
      .send({
        email: 'some-email@gmail.com',
        token: 'test',
      })
      .expect(200))
})
