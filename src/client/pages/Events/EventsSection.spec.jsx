import { expect } from 'chai'
import { filterEvents } from './EventsSection'

// We create a mock calendar to assert upon
const CALENDAR = []

let constantDate = new Date('August 1, 2018')
CALENDAR.push({ id: 1, startTime: new Date(constantDate.getTime()) })

for (let i = 1; i < 15; i += 1) {
  constantDate.setDate(constantDate.getDate() + 1)
  CALENDAR.push({ id: i + 1, startTime: new Date(constantDate.getTime()) })
}

constantDate = new Date('August 1, 2018')

// We mock the Date object so that we don't have to make everything dynamic
/* eslint no-global-assign:off */
Date = class extends Date {
  constructor() {
    super()
    return constantDate
  }
}

/**
 * Every event has a startTime that is already a JS Date object
 * We will use an ID to make these assertions very strict
 */
describe('Events Section Component', () => {
  test('should be able to filter out events for `TODAY`', () => {
    const filteredEvents = filterEvents('TODAY', CALENDAR)
    expect(filteredEvents.length).to.equal(1)
    expect(filteredEvents[0].id).to.equal(1)
  })

  test('should be able to filter out events for `TOMORROW`', () => {
    const filteredEvents = filterEvents('TOMORROW', CALENDAR)
    expect(filteredEvents.length).to.equal(1)
    expect(filteredEvents[0].id).to.equal(2)
  })

  test('should be able to filter out events for `THIS WEEK`', () => {
    const filteredEvents = filterEvents('THIS WEEK', CALENDAR)
    expect(filteredEvents.length).to.equal(3)
    expect(filteredEvents[0].id).to.equal(2)
    expect(filteredEvents[1].id).to.equal(3)
    expect(filteredEvents[2].id).to.equal(4)
  })

  test('should be able to filter out events for `THIS MONTH`', () => {
    const filteredEvents = filterEvents('THIS MONTH', CALENDAR)
    expect(filteredEvents.length).to.equal(15)
  })
})
