import React from 'react'
import moment from 'moment'
import EventCard from './EventCard'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// Returns a list of event cards
export default function EventsList({ events }) {
  if (!events.length) {
    return []
  }

  const eventsCards = events.map(({
    startTime, endTime, title, location, description, day: weekday,
  }) => {
    const month = MONTHS[startTime.getMonth()]
    const day = startTime.getDate().toString()

    const fmtStart = moment(startTime).format('h:mm a')
    const fmtEnd = moment(endTime).format('h:mm a')
    const timeloc = `${fmtStart} to ${fmtEnd} @ ${location}`

    return (
      <EventCard
        key={`event-${title}`}
        month={month}
        day={day}
        weekday={weekday}
        name={title}
        timeloc={timeloc}
        content={description}
      />
    )
  })
  return eventsCards
}
