require('dotenv').config()
const request = require('supertest')
const mongoose = require('mongoose')
const { expect } = require('chai')
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

  it('should be able to insert members', async () => {
    try {
      const { body } = await request(app)
        .post('/v2/members')
        .send({ email: 'email' })
        .expect(201)

      expect(body.newMember.email).to.equal('email')
      expect(body.newMember.hasPaidDues).to.equal(false)
      expect(body.newMember.groups.length).to.equal(0)
    } catch (err) {
      throw err
    }
  })

  it('should be able to get the members in the database that were inserted', async () => {
    try {
      await request(app)
        .post('/v2/members')
        .send({ email: 'email' })

      const { body } = await request(app)
        .get('/v2/members')
        .expect(201)

      expect(Array.isArray(body.members)).to.equal(true)
      expect(body.members[0].email).to.equal('email')
    } catch (err) {
      throw err
    }
  })

  it('should be able to delete the members in the database that were inserted', async () => {
    try {
      await request(app)
        .post('/v2/members')
        .send({ email: 'email' })

      await request(app)
        .delete('/v2/members')
        .send({ email: 'email' })
        .expect(202)
    } catch (err) {
      throw err
    }
  })

  it('should allow a user to (un)subscribe to a group', async () => {
    try {
      await request(app)
        .post('/v2/members')
        .send({ email: 'email' })

      const { body: subBody } = await request(app)
        .put('/v2/members/subscribe')
        .send({ email: 'email', groups: ['group1'] })
        .expect(202)

      expect(subBody.member.groups.length).to.equal(1)

      const { body: unsubBody } = await request(app)
        .put('/v2/members/subscribe')
        .send({ email: 'email', groups: ['group1'] })
        .expect(202)

      expect(unsubBody.member.groups.length).to.equal(0)
    } catch (err) {
      throw err
    }
  })

  // Admins only
  it('should allow admins to let users pay dues', async () => {
    try {
      await request(app)
        .post('/v2/members')
        .send({ email: 'email' })

      const { body: duesBody } = await request(app)
        .patch('/v2/members/dues')
        .send({ email: 'email' })

      expect(duesBody.email).to.equal('email')
      expect(duesBody.hasPaidDues).to.equal(true)
    } catch (err) {
      throw err
    }
  })

  // Admins only
  it('should allow admins to reset dues and groups', async () => {
    await request(app)
      .post('/v2/members')
      .send({ email: 'email1' })
    await request(app)
      .post('/v2/members')
      .send({ email: 'email2' })
    await request(app)
      .post('/v2/members')
      .send({ email: 'email3' })

    await request(app)
      .patch('/v2/members/dues')
      .send({ email: 'email1' })
    await request(app)
      .patch('/v2/members/dues')
      .send({ email: 'email2' })
    await request(app)
      .patch('/v2/members/dues')
      .send({ email: 'email3' })

    const { body } = await request(app).post('/v2/members/reset')

    expect(body.members.length).to.equal(3)

    for (const member of body.members) {
      expect(member.groups.length).to.equal(0)
      expect(member.hasPaidDues).to.equal(false)
    }
  })
})
