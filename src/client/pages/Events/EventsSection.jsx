import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'

import EventsList from 'pages/Events/EventsList'

const EventsSection = ({ classes = {}, time, events }) => {
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
        {/* Section Header */}
        <Typography variant='h3' className={classes.EventTime}>
          {time}
        </Typography>
      </div>
      <div className={classes.Events}>
        {/* List of Events that fall under the given time */}
        <EventsList events={events} />
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

EventsSection.propTypes = {
  // Styles
  classes: PropTypes.shape({}),
  // The different sections on the Events Page
  time: PropTypes.string,
  // The events associated with that time
  events: PropTypes.arrayOf(PropTypes.shape({})),
}

export default withStyles(styles)(EventsSection)
