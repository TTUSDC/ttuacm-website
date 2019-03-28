import React from 'react'
import PageLayout from 'components/PageLayout'
import EventsContainer from 'containers/EventsContainer'

function EventsPage() {
  const EventsPageInfo = {
    title: 'EVENTS',
    info: `Many events are organized throughout the semester.
      From companies' info sessions to simple workshops,
      we offer you many opportunities to become successful in your studies`,
  }

  return (
    <PageLayout headerInfo={EventsPageInfo} content={<EventsContainer />} />
  )
}

export default EventsPage
