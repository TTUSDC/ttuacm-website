import React from 'react'
import MOCK_CALENDAR from '__mocks__/calendar'
import EventsList from 'components/EventsList'
import useEndpoint from 'hooks/useEndpoint'
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

function UpcomingEventCard() {
  const [err, loading, events] = useEndpoint(
    {
      path: '/events',
    },
    SHOW_MOCK_CALENDAR ? MOCK_CALENDAR : placeHolder,
  )

  if (err || loading) return null // TODO handle this later

  return <EventsList events={[events.allEvents[0]]} />
}

export default UpcomingEventCard
