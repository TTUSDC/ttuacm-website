require('dotenv').config()
const request = require('supertest')
const chai = require('chai')
const mongoose = require('mongoose')

let app = 'https://us-central1-acm-texas-tech-web-app-2-beta.cloudfunctions.net/api/v2/auth'

if (!process.env.CI) {
  console.log('Testing integration outside of CI. Using API_ENDPOINT')
  app = `${process.env.API_ENDPOINT}/api/v2/auth`
}

const connection_string = process.env.DB_CONNECTION

const { expect } = chai

describe('Auth Integration Tests', () => {
  // eslint-disable-next-line
  beforeAll((done) => {
    mongoose.connect(connection_string, {
      useNewUrlParser: true,
    }, (err) => {
      console.error(err)
      done(err)
    })
  })

  beforeEach((done) => {
    // Make sure to at least create one user for each test
    // or this will error out
    try {
      mongoose.connection.dropCollection('students', done)
    } catch (err) {
      console.error(err)
      done()
    }
  })

  it('should be able to connect to the auth service', async () => request(app)
    .get('/test')
    .expect(200))

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

      expect(registerBody.body.createdUser.email === 'johndoe@gmail.com').to.equal(true)
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
