import React from 'react'
import moment from 'moment'
import EventCard from './EventCard'

// Returns a list of event cards
export default function EventsList({ events, time }) {
  if (!events.length) {
    return []
  }

  const eventsCards = events.map(({
    startTime, endTime, title, location, description,
  }, i) => {
    const eventStart = moment(startTime)
    const eventEnd = moment(endTime)

    const fmtStart = eventStart.format('h:mm a')
    const fmtEnd = eventEnd.format('h:mm a')
    const timeloc = `${fmtStart} to ${fmtEnd} @ ${location}`

    return (
      <EventCard
        key={`event-${title}-${time}-${i - 1}`}
        month={eventStart.format('MMMM')}
        day={eventStart.format('D')}
        weekday={eventStart.format('dddd')}
        name={title}
        timeloc={timeloc}
        content={description}
      />
    )
  })
  return eventsCards
}
