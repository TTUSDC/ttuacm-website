import React from 'react'
import PropTypes from 'prop-types'
import MOCK_CALENDAR from 'client/__mocks__/calendar'
import EventsList from 'client/components/EventsList'
import useEndpoint from 'client/hooks/useEndpoint'
import moment from 'moment'

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

  return <EventsList events={[events.allEvents[0]]} />
}

UpcomingEventCard.propTypes = {
  defaultEvents: PropTypes.shape({}),
}

export default UpcomingEventCard
