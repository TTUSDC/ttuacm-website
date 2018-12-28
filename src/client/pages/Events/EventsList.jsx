import React from 'react'
import EventCard from 'components/EventCard'

// Returns a list of event cards
export default function EventsList({ events }) {
  if (events.length === 0 || !events) {
    return (
      <EventCard
        month=''
        day=''
        weekday=''
        name={'NOTHING\'S HAPPENING'}
        timeloc=''
        content='Please check back later'
      />
    )
  }

  const eventsCards = events.map(({
    day, startTime, title, location, description,
  }) => {
    const start = new Date(startTime)
    const month = start.getMonth()
    const weekday = start.getDate()

    return (
      <EventCard
        month={month}
        day={day}
        weekday={weekday}
        name={title}
        timeloc={location}
        content={description}
      />
    )
  })
  return eventsCards
}
