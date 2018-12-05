const request = require('supertest')

const app = 'https://us-central1-acm-texas-tech-web-app-2-beta.cloudfunctions.net/api/v2/email'

describe('Email Integration Tests', () => {
  it('should be able to connect to email service', () => request(app)
    .get('/test')
    .expect(200))

  it('should be able to send confirmation emails', () => request(app)
    .post('/confirm-email')
    .send({
      name: 'Some Name',
      email: 'some-email@gmail.com',
      topic: 'test',
      message: 'message',
    })
    .expect(200))

  it('should be able to send contact us emails', () => request(app)
    .post('/contact-us')
    .send({
      name: 'Some Name',
      email: 'some-email@gmail.com',
      topic: 'test',
      message: 'message',
    })
    .expect(200))

  it('should be able to send reset password emails', () => request(app)
    .post('/reset-password')
    .send({
      email: 'some-email@gmail.com',
      token: 'test',
    })
    .expect(200))

  it('should be able to send changed password emails', () => request(app)
    .post('/change-password-notif')
    .send({
      email: 'some-email@gmail.com',
      token: 'test',
    })
    .expect(200))
})
