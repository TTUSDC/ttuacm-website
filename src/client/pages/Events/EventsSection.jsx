import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

import EventsList from 'components/EventsList'

export function filterEvents(time, events) {
  let filteredEvents = []

  switch (time) {
    case('TODAY'):
      filteredEvents = events.filter((event) => {
        const today = (new Date()).getDate()
        const start = event.startTime.getDate()
        return today === start
      })
      break
    case('TOMORROW'):
      filteredEvents = events.filter((event) => {
        const tomorrow = (new Date()).getDate() + 1
        const start = event.startTime.getDate()
        return tomorrow === start
      })
      break
    case('THIS WEEK'):
      // Check if date is less than 7 away and start day is greater or equal to today
      // Week starts on Sunday
      filteredEvents = events.filter((event) => {
        const now = new Date()
        const currentDate = now.getDate()
        const start = event.startTime.getDate()
        const today = now.getDay()
        const startDay = event.startTime.getDay()
        return ((start - currentDate < 7 && start - currentDate >= 0) && (startDay >= today))
      })
      break
    case('THIS MONTH'):
      filteredEvents = events.filter((event) => {
        const now = new Date()
        const currentDate = now.getDate()
        const start = event.startTime.getDate()
        const thisMonth = now.getMonth()
        const startMonth = event.startTime.getMonth()
        return ((start >= currentDate) && (thisMonth === startMonth))
      })
      break
    default:
      console.error(`Something is wrong with the time that was passed to the function: ${time}`)
      filteredEvents = events
  }

  return filteredEvents
}

const EventsSection = ({
  classes = {}, time, events = [], loading = false,
}) => (
  <Grid
    container
    direction='column'
    justify='center'
    alignItems='center'
    className={classes.EventsView}
  >
    <div>
      {/* Section Header */}
      <Typography variant='h3' className={classes.EventTime}>
        {time}
      </Typography>
    </div>
    <div className={classes.Events}>
      {/* List of Events that fall under the given time */}
      {
          loading
            ? <CircularProgress />
            : <EventsList events={filterEvents(time, events)} />
        }
    </div>
  </Grid>
)

const styles = {
  EventsView: {
    margin: '0 auto',
    width: '100%',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  EventTime: {
    color: 'white',
    textAlign: 'center',
    margin: '4vh',
    fontWeight: 'bold',
  },
}

EventsSection.propTypes = {
  // Styles
  classes: PropTypes.shape({}),
  // The different sections on the Events Page
  time: PropTypes.string.isRequired,
  // Whether or not the events are still being fetched
  loading: PropTypes.bool,
  // The events associated with that time
  events: PropTypes.arrayOf(PropTypes.shape({})),
}

export default withStyles(styles)(EventsSection)
