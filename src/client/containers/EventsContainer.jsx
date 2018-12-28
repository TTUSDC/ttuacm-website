import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import EventsSection from 'pages/Events/EventsSection'
import { ConnectionString } from 'context/ConnectionStringContext'
import { EventsPageCtx } from 'context/EventsInfo'

const styles = {
  EventsContainer: {
    margin: '0 0',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
  },
}

const EventsContainer = ({ classes = {} }) => {
  // Fetch the events from the API
  const connectionString = useContext(ConnectionString)
  const { providedTimes } = useContext(EventsPageCtx)

  const [events, setEvents] = useState([])

  useEffect(() => {
    console.log(`Calling API: ${connectionString}/events`)
    setEvents([])
  }, [])

  return (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      className={classes.EventsContainer}
    >
      <EventsSection time={providedTimes.TODAY} events={events} />
      <EventsSection time={providedTimes.TOMORROW} events={events} />
      <EventsSection time={providedTimes.THIS_WEEK} events={events} />
      <EventsSection time={providedTimes.THIS_MONTH} events={events} />
    </Grid>
  )
}

EventsContainer.propTypes = {
  classes: PropTypes.shape({}),
}

export default withStyles(styles)(EventsContainer)
