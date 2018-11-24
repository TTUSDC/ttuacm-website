const request = require('supertest')
const chai = require('chai')
const mongoose = require('mongoose')

const app = 'https://us-central1-acm-texas-tech-web-app-2-beta.cloudfunctions.net/auth'

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
      mongoose.connect(process.env.DB_CONNECTION_STRING, {
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

    it('should be able to register a user, verify the email, and login', async () => {
      try {
        const registerBody = await request(app)
          .post('/api/v2/register')
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
          .get(`/api/v2/confirm/${registerBody.body.createdUser.confirmEmailToken}`)
          .expect(302)

        const loginBody = await request(app)
          .post('/api/v2/login')
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
})
