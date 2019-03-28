import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import moment from 'moment'

import EventsList from 'components/EventsList'

export function filterEvents(time, events) {
  let filteredEvents = []

  switch (time) {
    case 'TODAY':
      filteredEvents = events.filter((event) => {
        const eventTime = moment(event.startTime)
        const today = moment()
        return eventTime.diff(today, 'days') === 0
      })
      break
    case 'TOMORROW':
      filteredEvents = events.filter((event) => {
        const eventTime = moment(event.startTime)
        const today = moment()
        return eventTime.diff(today, 'days') === 1
      })
      break
    case 'THIS WEEK':
      filteredEvents = events.filter((event) => {
        const currentWeek = moment().week()
        const eventWeek = moment(event.startTime).week()
        return currentWeek === eventWeek
      })
      break
    case 'THIS MONTH':
      filteredEvents = events.filter((event) => {
        const currentMonth = moment().month()
        const eventMonth = moment(event.startTime).month()
        return currentMonth === eventMonth
      })
      break
    default:
      console.error(
        `Something is wrong with the time that was passed to the function: ${time}`,
      )
      filteredEvents = events
  }

  return filteredEvents
}

const EventsSection = ({
  classes = {},
  time,
  events = [],
  loading = false,
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
      {loading ? (
        <CircularProgress />
      ) : (
        <EventsList time={time} events={filterEvents(time, events)} />
      )}
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
