require('dotenv').config()
const request = require('supertest')
const chai = require('chai')
const mongoose = require('mongoose')

let app = `${process.env.API_ENDPOINT}/api/v2/auth`

if (process.env.CI) {
  app = 'https://us-central1-acm-texas-tech-web-app-2-beta.cloudfunctions.net/api/v2/auth'
  console.log('Testing integration inside of CI. Testing in staging')
}

const connection_string = process.env.DB_CONNECTION

const { expect } = chai

/* eslint-disable-next-line */
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000

describe('Auth Integration Tests', () => {
  // eslint-disable-next-line
  beforeAll(async () => {
    try {
      await mongoose.connect(connection_string, {
        useNewUrlParser: true,
      })
      await mongoose.connection.dropDatabase()
    } catch(err) {
      console.error(err)
      throw err
    }
  })

  beforeEach(async () => {
    // Make sure to at least create one user for each test
    // or this will error out
    await mongoose.connection.dropDatabase()
  })

  afterEach(async () => {
    await mongoose.connection.dropDatabase()
  })

  it('should be able to connect to the auth service', async () => request(app)
    .get('/test')
    .expect(200))

  it('should be able to register a user, verify the email, and login', async () => {
    try {
      // Register the user
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


      expect(registerBody.body.email === 'johndoe@gmail.com').to.equal(true)
      expect(registerBody.body.confirmEmailToken).not.to.equal('')

      // Confirm the email
      await request(app)
        .get(`/confirm/${registerBody.body.confirmEmailToken}`)
        .expect(302)

      // Login
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
