import MOCK_CALENDAR from 'client/__mocks__/calendar'
import EventsList from 'client/pages/Events/EventsList'
import useEndpoint from 'client/services/useEndpoint'
import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'

const SHOW_MOCK_CALENDAR = process.env.NODE_ENV === 'development'

const today = moment()

const placeHolder = [
  {
    day: today.format('dddd'),
    startTime: today,
    endTime: today,
    title: 'No Events Yet! Stay Tuned!',
    location: '',
    description: '',
    recurringEvent: false,
  },
]

function UpcomingEventCard({ defaultEvents = placeHolder }) {
  const [err, loading, events] = useEndpoint(
    {
      path: '/events',
    },
    SHOW_MOCK_CALENDAR
      ? { allEvents: MOCK_CALENDAR }
      : { allEvents: defaultEvents },
  )

  if (err || loading) return null // TODO handle this later

  const displayedEvents = [events.allEvents[0]] || placeHolder
  return <EventsList events={displayedEvents} />
}

UpcomingEventCard.propTypes = {
  defaultEvents: PropTypes.arrayOf(PropTypes.shape({})),
}

export default UpcomingEventCard
