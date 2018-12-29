import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import EventsSection from 'pages/Events/EventsSection'
import { ConnectionString } from 'context/ConnectionStringContext'
import { EventsPageCtx } from 'context/EventsInfo'
import * as axios from 'axios'
import MOCK_CALENDAR from '__mocks__/calendar'

let SHOW_MOCK_CALENDAR = true
if (process.env.NODE_ENV === 'production') SHOW_MOCK_CALENDAR = false

const styles = {
  EventsContainer: {
    margin: '0 0',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
  },
}

const placeHolder = {
  day: 'Monday',
  startTime: new Date(),
  endTime: new Date(),
  title: 'No Events Yet! Stay Tuned!',
  location: '',
  description: '',
  recurringEvent: false,
}

const EventsContainer = ({ classes = {} }) => {
  // Get constants from context
  const { providedTimes } = useContext(EventsPageCtx)
  const [events, setEvents] = useState(SHOW_MOCK_CALENDAR ? MOCK_CALENDAR : [placeHolder])
  const [loading, setLoading] = useState(false)
  const connectionString = useContext(ConnectionString)

  if (process.env.NODE_ENV === 'production') {
    // Fetch the events from the API
    useEffect(() => {
      setLoading(true)
      // Grabs all the events from the API and maps their times from strings to dates
      axios.get(`${connectionString}/events`).then(({ data }) => {
        const allEvents = data.allEvents.map(event => ({
          ...event,
          startTime: new Date(event.startTime),
          endTime: new Date(event.endTime),
        }))
        setEvents(allEvents)
      }).catch((err) => {
        // TODO set up error handling
        console.error(err)
        setEvents([])
      }).finally(() => {
        setLoading(false)
      })
    }, [])
  }

  return (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      className={classes.EventsContainer}
    >
      <EventsSection loading={loading} time={providedTimes.TODAY} events={events} />
      {
        events.length > 1
          ? (
            <React.Fragment>
              <EventsSection loading={loading} time={providedTimes.TOMORROW} events={events} />
              <EventsSection loading={loading} time={providedTimes.THIS_WEEK} events={events} />
              <EventsSection loading={loading} time={providedTimes.THIS_MONTH} events={events} />
            </React.Fragment>
          )
          : null
      }
    </Grid>
  )
}

EventsContainer.propTypes = {
  classes: PropTypes.shape({}),
}

export default withStyles(styles)(EventsContainer)
