require('dotenv').config()
const request = require('supertest')
const { expect } = require('chai')
let { app } = require('../../../index.js')

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60 // eslint-disable-line

if (process.env.CI) {
  app = 'https://us-central1-acm-texas-tech-web-app-2-beta.cloudfunctions.net'
} else {
  app.listen(8081)
}

describe('Email Unit Tests', () => {
  const tag = process.env.CI ? '/api' : '' // eslint-disable-line

  it('[test] should be able to connect to events service', async () => {
    try {
      await request(app)
        .get(`${tag}/v2/events/test`)
        .expect(200)
    } catch (err) {
      throw err
    }
  })

  it('[getEvents] should be able to fetch events', async () => {
    try {
      const { body } = await request(app)
        .get(`${tag}/v2/events`)
        .expect(200)

      expect(Array.isArray(body.allEvents)).to.equal(true)
    } catch (err) {
      throw err
    }
  })
})
