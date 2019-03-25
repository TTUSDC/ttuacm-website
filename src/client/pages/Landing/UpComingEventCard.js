import React, { useState, useEffect, useContext } from 'react'
import MOCK_CALENDAR from '__mocks__/calendar'
import EventsList from 'components/EventsList'
import { ConnectionString } from 'context/ConnectionStringContext'
import * as axios from 'axios'

let SHOW_MOCK_CALENDAR = true
if (process.env.NODE_ENV !== 'development') SHOW_MOCK_CALENDAR = false

const placeHolder = [
  {
    day: 'Monday',
    startTime: new Date(),
    endTime: new Date(),
    title: 'No Events Yet! Stay Tuned!',
    location: '',
    description: '',
    recurringEvent: false,
  },
]

function UpcomingEventCard() {
  const [events, setEvents] = useState(
    SHOW_MOCK_CALENDAR ? [MOCK_CALENDAR[0]] : placeHolder,
  )
  const [loading, setLoading] = useState(false)
  const connectionString = useContext(ConnectionString)

  if (process.env.NODE_ENV === 'production') {
    // Fetch the events from the API
    useEffect(() => {
      setLoading(true)
      // Grabs all the events from the API and maps their times from strings to dates
      axios
        .get(`${connectionString}/events`)
        .then(({ data }) => {
          const allEvents = data.allEvents.map((event) => ({
            ...event,
            startTime: new Date(event.startTime),
            endTime: new Date(event.endTime),
          }))
          setEvents(allEvents[0] || [])
        })
        .catch((err) => {
          // TODO set up error handling
          console.error(err)
          setEvents([])
        })
        .finally(() => {
          setLoading(false)
        })
    }, [])
  }

  return !loading ? <EventsList events={events} /> : null
}

export default UpcomingEventCard