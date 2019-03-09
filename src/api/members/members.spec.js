require('dotenv').config()
const request = require('supertest')
const mongoose = require('mongoose')
// const { expect } = require('chai')
const { app } = require('../../../index.js')

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60 // eslint-disable-line

app.listen(8082)

const connection_string = process.env.DB_CONNECTION

describe('Members Unit Tests', () => {
  // eslint-disable-next-line
  beforeAll(async () => {
    try {
      await mongoose.connect(connection_string, {
        useNewUrlParser: true,
      })
      await mongoose.connection.dropDatabase()
    } catch (err) {
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

  it('[test] should be able to connect to members service', async () => {
    try {
      await request(app)
        .get('/v2/members/test')
        .expect(200)
    } catch (err) {
      throw err
    }
  })
})
