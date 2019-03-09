require('dotenv').config()
const request = require('supertest')
const { expect } = require('chai')
const { app } = require('../../../index.js')

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60 // eslint-disable-line

app.listen(8081)

describe('Email Unit Tests', () => {
  it('[test] should be able to connect to events service', async () => {
    try {
      await request(app)
        .get('/v2/events/test')
        .expect(200)
    } catch (err) {
      throw err
    }
  })

  it('[get-events] should be able to fetch events', async () => {
    try {
      const { body } = await request(app)
        .get('/v2/events')
        .expect(200)

      expect(Array.isArray(body.allEvents)).to.equal(true)
    } catch (err) {
      throw err
    }
  })
})
