const chai = require('chai')
const Controller = require('./events.controller')

const { expect } = chai

describe('Events Unit Test', () => {
  it('should be able to fetch events from ACM', (done) => {
    Controller.getAllEvents((err, events) => {
      expect(err).to.equal(null)
      expect(events.length > 0).to.equal(true)
      done(err)
    })
  })
})
