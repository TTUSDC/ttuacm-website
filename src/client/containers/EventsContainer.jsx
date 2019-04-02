import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import EventsSection from 'pages/Events/EventsSection'
import MOCK_CALENDAR from '__mocks__/calendar'
import useEndpoint from 'hooks/useEndpoint'
import moment from 'moment'

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

  if (err || loading) {
    console.error(err)
    return null
  }

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
    </Grid>
  )
}

EventsContainer.propTypes = {
  classes: PropTypes.shape({}),
}

export default withStyles(styles)(EventsContainer)
