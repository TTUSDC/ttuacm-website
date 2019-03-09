const chai = require('chai')
const Controller = require('./events.controller')

const { expect } = chai

describe('Events Unit Test', () => {
  let ctrl

  beforeEach(() => {
    ctrl = new Controller()
  })

  it('[getAllEvents] should be able to fetch events from ACM', async () => {
    try {
      const events = await ctrl.getAllEvents()
      expect(events.length > 0).to.equal(true)
    } catch (err) {
      expect(err).to.equal(null)
    }
  })
})
