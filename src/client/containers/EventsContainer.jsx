import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import EventsSection from 'pages/Events/EventsSection'
import { ConnectionString } from 'context/ConnectionStringContext'
import * as axios from 'axios'
import MOCK_CALENDAR from '__mocks__/calendar'

const SHOW_MOCK_CALENDAR = process.env.NODE_ENV === 'development'

const styles = {
  EventsContainer: {
    margin: '0 0',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
  },
}

const placeHolder = [{
  day: 'Monday',
  startTime: new Date(),
  endTime: new Date(),
  title: 'No Events Yet! Stay Tuned!',
  location: '',
  description: '',
  recurringEvent: false,
}]

const EventsContainer = ({ classes = {} }) => {
  const providedTimes = {
    TODAY: 'TODAY',
    TOMORROW: 'TOMORROW',
    THIS_WEEK: 'THIS WEEK',
    THIS_MONTH: 'THIS MONTH',
  }

  const [events, setEvents] = useState(SHOW_MOCK_CALENDAR ? MOCK_CALENDAR : placeHolder)
  const [loading, setLoading] = useState(false)
  const connectionString = useContext(ConnectionString)

  if (process.env.NODE_ENV !== 'development') {
    // Fetch the events from the API
    useEffect(() => {
      async function fetchEvents() {
        // Grabs all the events from the API and maps their times from strings to dates
        try {
          setLoading(true)
          const { data } = await axios.get(`${connectionString}/events`)
          const allEvents = data.allEvents.map(event => ({
            ...event,
            startTime: new Date(event.startTime),
            endTime: new Date(event.endTime),
          }))
          setEvents(allEvents)
        } catch (err) {
          console.error(err)
          setEvents([])
        }
        setLoading(false)
      }

      fetchEvents()
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
        events.length
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
