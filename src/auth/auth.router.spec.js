const test = require('firebase-functions-test')()
const mongoose = require('mongoose')

test.mockConfig({
  auth: {
    session_secret: 'SessionSecretForTests',
    db: 'mongodb://localhost:27017/development',
    facebook_clientid: "200556733895479",
    github_client_secret: "oUPA7cV--cIpJjr7UHGuXEEM",
    google_clientid: "200743691961-upugqobu93oa2rjajsvadpldll7r03ia.apps.googleusercontent.com",
    google_client_secret: "238c5be7e90da744d8551334e70b62d4168d4635",
    github_clientid: "aea94a0a1b79749f4c88",
    gcalapikey: "AIzaSyCUY5hRNgM2yGrVWwRC2vvdBk3MtwapJEI",
    facebook_client_secret: "ae687f6cd71f6aa75b004e414e74dc0b",
  },
  connections: {
    host: 'localhost:5000/sandbox-206807/us-central1',
    protocol: 'http',
  }
})

const request = require('supertest')
const chai = require('chai')
const Controller = require('./auth.controller')
const app = require('./auth.app')

const { expect } = chai

describe('Auth Integration Tests', () => {
  describe('OAuth Tests', () => {
    it('should be able to send back a oAuthClient to extract', () => request(app)
        .get('/api/v2/google-api')
        .expect(200)
        .then(({ body }) => {
          expect(body.client.credentials).to.exist
        }))

    it('should be able to get Facebook OAuth', () => request(app)
        .get('/api/v2/facebook')
        .expect(302)
        )

    it('should be able to get Google OAuth', () => request(app)
        .get('/api/v2/google')
        .expect(302)
        )

    it('should be able to get GitHub OAuth', () => request(app)
        .get('/api/v2/github')
        .expect(302)
        )
  })

  describe('Local Registration', () => {
    // eslint-disable-next-line
    beforeAll((done) => {
      mongoose.connect('mongodb://localhost:27017/testing', {
        useNewUrlParser: true,
      }, (err) => {
        done(err)
      })
    })

    afterEach((done) => {
      // Make sure to at least create one user for each test
      // or this will error out
      mongoose.connection.dropCollection('students', done)
    })

    it('should be able to get register a user', () => request(app)
        .post('/api/v2/register')
        .send({
          email: 'Some-email@gmail.com',
          firstName: 'John',
          lastName: 'Doe',
          classification: 'Freshman',
          password: 'Some-password123',
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.createdUser.email === 'Some-email@gmail.com').to.equal(true)
        })
        )

    it('should be able to log a user in', async () => {
      const ctrl = new Controller()
      const newUser = await ctrl.register({
        email: 'email@gmail.com',
        password: 'password',
        firstName: 'John',
        lastName: 'Doe',
        classification: 'Freshman',
      })

      await ctrl.confirmToken(newUser.confirmEmailToken)

      return request(app)
        .post('/api/v2/login')
        .send({
          email: 'email@gmail.com',
          password: 'password'
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.token).not.to.equal("")
        })
    })
  })
})
