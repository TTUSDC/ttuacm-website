require('dotenv').config()
const request = require('supertest')
const chai = require('chai')
const mongoose = require('mongoose')
const test = require('firebase-functions-test')()

test.mockConfig({
  auth: {
    session_secret: 'SessionSecretForTests!',
    db: 'mongodb://localhost:27017/testing',
  },
})

const app = 'https://us-central1-acm-texas-tech-web-app-2-beta.cloudfunctions.net/api/v2/auth'

const { expect } = chai

describe('Auth Integration Tests', () => {
  // eslint-disable-next-line
  beforeAll((done) => {
    mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
    }, (err) => {
      done(err)
    })
  })

  beforeEach((done) => {
    // Make sure to at least create one user for each test
    // or this will error out
    mongoose.connection.dropCollection('students', done)
  })

  it('should be able to register a user, verify the email, and login', async () => {
    try {
      const registerBody = await request(app)
        .post('/register')
        .send({
          email: 'johndoe@gmail.com',
          firstName: 'John',
          lastName: 'Doe',
          classification: 'Freshman',
          password: 'Some-password123',
        })
        .expect(201)

      expect(registerBody.body.createdUser.email === 'johndoe@gmail').to.equal(true)
      expect(registerBody.body.createdUser.confirmEmailToken).not.to.equal('')

      await request(app)
        .get(`/confirm/${registerBody.body.createdUser.confirmEmailToken}`)
        .expect(302)

      const loginBody = await request(app)
        .post('/login')
        .send({
          email: 'johndoe@gmail.com',
          password: 'Some-password123',
        })
        .expect(200)

      expect(loginBody.body.token).not.to.equal('')
      expect(loginBody.body.user.email).to.equal('johndoe@gmail.com')
    } catch (err) {
      throw err
    }
  })
})
