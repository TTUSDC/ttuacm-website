import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'

import EventCard from 'components/EventCard'

function Events({ events }) {
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

const EventsView = ({ classes = {}, time, events }) => {
  // TODO(@miggy) Apply the event filters based on the time that was given
  console.log()
  return (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      className={classes.EventsView}
    >
      <div>
        <Typography variant='h3' className={classes.EventTime}>
          {time}
        </Typography>
      </div>
      <div className={classes.Events}>
        <Events events={events} />
      </div>
    </Grid>
  )
}

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

EventsView.propTypes = {
  // Styles
  classes: PropTypes.shape({}),
  // The different sections on the Events Page
  time: PropTypes.string,
  // The events associated with that time
  events: PropTypes.arrayOf(PropTypes.shape({})),
}

export default withStyles(styles)(EventsView)
