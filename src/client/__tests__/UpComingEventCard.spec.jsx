import { expect } from 'chai'
import UpcomingEventCard from 'client/pages/Landing/UpComingEventCard'
import moment from 'moment'
import React from 'react'
import { queryByText } from 'react-testing-library'

import { renderComponent } from './utils'

const today = moment()

test('should only display one event no matter the size of the fetched events', () => {
  const placeHolder = [
    {
      day: today.format('dddd'),
      startTime: today,
      endTime: today,
      title: 'Event 1',
      location: '',
      description: '',
      recurringEvent: false,
    },
    {
      day: today.format('dddd'),
      startTime: today,
      endTime: today,
      title: 'Event 2',
      location: '',
      description: '',
      recurringEvent: false,
    },
  ]

  const { container } = renderComponent(
    <UpcomingEventCard defaultEvents={placeHolder} />,
  )

  expect(queryByText(container, 'Event 1', { exact: false })).to.exist
  expect(queryByText(container, 'Event 2', { exact: false })).to.equal(null)
})
