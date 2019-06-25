import React from 'react'
import { getByText, cleanup } from 'react-testing-library'
import { expect } from 'chai'
import moment from 'moment'
import sinon from 'sinon'
import EventsSection, { filterEvents } from 'client/pages/Events/EventsSection'
import { renderComponent } from './utils'

sinon.useFakeTimers(
  moment([2019, 2, 26])
    .toDate()
    .getTime(),
) // Tuesday March 26, 2019

// We create a mock calendar to assert upon
const CALENDAR = []

const today = moment()

for (let i = 1; i <= 8; i += 1) {
  CALENDAR.push({
    id: i,
    title: `Test Event ${Number(i).toString()}`,
    location: 'IMSE 119',
    startTime: today.toDate(),
    endTime: today.toDate(),
    description: 'Lorem Ipsum Text goes here',
  })

  today.add(1, 'days')
}

afterEach(cleanup)

/**
 * Every event has a startTime that is already a JS Date object
 * We will use an ID to make these assertions very strict
 */
describe('Events Section Component', () => {
  describe('Filtering Function', () => {
    test('should be able to filter out events for `TODAY`', () => {
      const filteredEvents = filterEvents('TODAY', CALENDAR)
      expect(filteredEvents.length).to.equal(1)
    })

    test('should be able to filter out events for `TOMORROW`', () => {
      const filteredEvents = filterEvents('TOMORROW', CALENDAR)
      expect(filteredEvents.length).to.equal(1)
    })

    test('should be able to filter out events for `THIS WEEK`', () => {
      const filteredEvents = filterEvents('THIS WEEK', CALENDAR)
      expect(filteredEvents.length).to.equal(5)
    })

    test('should be able to filter out events for `THIS MONTH`', () => {
      const filteredEvents = filterEvents('THIS MONTH', CALENDAR)
      expect(filteredEvents.length).to.equal(6)
    })
  })

  describe('Component', () => {
    test('should display the only event for `TODAY`', () => {
      const { container } = renderComponent(
        <EventsSection time='TODAY' events={CALENDAR} />,
      )
      getByText(container, 'TODAY', { exact: false })
      getByText(container, 'Test Event 1', { exact: false })
    })

    test('should display the only event for `TOMORROW`', () => {
      const { container } = renderComponent(
        <EventsSection time='TOMORROW' events={CALENDAR} />,
      )
      getByText(container, 'TOMORROW', { exact: false })
      getByText(container, 'Test Event 2', { exact: false })
    })

    test('should display the events for `THIS WEEK`', () => {
      const { container } = renderComponent(
        <EventsSection time='THIS WEEK' events={CALENDAR} />,
      )
      getByText(container, 'THIS WEEK', { exact: false })
      getByText(container, 'Test Event 1', { exact: false })
      getByText(container, 'Test Event 2', { exact: false })
      getByText(container, 'Test Event 3', { exact: false })
      getByText(container, 'Test Event 4', { exact: false })
    })

    test('should display the events for `THIS MONTH`', () => {
      const { container } = renderComponent(
        <EventsSection time='THIS MONTH' events={CALENDAR} />,
      )
      getByText(container, 'THIS MONTH', { exact: false })
      for (let i = 1; i < 6; i += 1) {
        getByText(container, `Test Event ${i}`, { exact: false })
      }
    })
  })
})
