const test = require('firebase-functions-test')()

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
    host: '',
    protocol: '',
  }
})

const request = require('supertest')
const chai = require('chai')
const app = require('./auth.app')

const { expect } = chai

describe('Auth Integration Tests', () => {
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
