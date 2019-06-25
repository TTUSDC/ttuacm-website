import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import MOCK_CALENDAR from 'client/__mocks__/calendar'
import EventsSection from 'client/pages/Events/EventsSection'
import useEndpoint from 'client/services/useEndpoint'
import useSnackbar from 'client/services/useSnackbar'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'

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

const today = moment()

const placeHolder = [
  {
    day: today.format('dddd'),
    startTime: today,
    endTime: today,
    title: 'No Events Yet! Stay Tuned!',
    location: '',
    description: '',
    recurringEvent: false,
  },
]

const EventsContainer = ({ classes = {} }) => {
  const [SnackBar, enqueueSnackbar] = useSnackbar()
  const providedTimes = {
    TODAY: 'TODAY',
    TOMORROW: 'TOMORROW',
    THIS_WEEK: 'THIS WEEK',
    THIS_MONTH: 'THIS MONTH',
  }

  const [err, loading, { allEvents: events }] = useEndpoint(
    {
      path: '/events',
    },
    SHOW_MOCK_CALENDAR
      ? { allEvents: MOCK_CALENDAR }
      : { allEvents: placeHolder },
  )

  // Makes sure that we don't keep updating the state when an error occurs
  useEffect(() => {
    if (err) {
      enqueueSnackbar('Something went wrong...', 'error')
      console.error(err)
    }
  }, [err, enqueueSnackbar])

  return (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      className={classes.EventsContainer}
    >
      <EventsSection
        loading={loading}
        time={providedTimes.TODAY}
        events={events}
      />
      {events.length ? (
        <React.Fragment>
          <EventsSection
            loading={loading}
            time={providedTimes.TOMORROW}
            events={events}
          />
          <EventsSection
            loading={loading}
            time={providedTimes.THIS_WEEK}
            events={events}
          />
          <EventsSection
            loading={loading}
            time={providedTimes.THIS_MONTH}
            events={events}
          />
        </React.Fragment>
      ) : null}
      <SnackBar />
    </Grid>
  )
}

EventsContainer.propTypes = {
  classes: PropTypes.shape({}),
}

export default withStyles(styles)(EventsContainer)
