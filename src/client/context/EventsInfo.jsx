import * as React from 'react'
import PropTypes from 'prop-types'


const EventsPageCtx = React.createContext()

function EventsPageCtxProvider({ children = [] }) {
  const EventsPageInfo = {
    title: 'EVENTS',
    info: `Many events are organized throughout the semester.
      From companies' info sessions to simple workshops,
      we offer you many opportunities to become successful in your studies`,
    providedTimes: {
      TODAY: 'TODAY',
      TOMORROW: 'TOMORROW',
      THIS_WEEK: 'THIS WEEK',
      THIS_MONTH: 'THIS MONTH',
    },
  }

  return (
    <EventsPageCtx.Provider
      value={EventsPageInfo}
    >
      {children}
    </EventsPageCtx.Provider>
  )
}

EventsPageCtxProvider.propTypes = {
  children: PropTypes.element,
}

const EventsPageCtxConsumer = EventsPageCtx.Consumer

export { EventsPageCtx, EventsPageCtxProvider, EventsPageCtxConsumer }
