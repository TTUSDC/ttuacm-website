import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles'
import EventDate from './EventDate'
import EventContent from './EventContent'

const styles = (theme) => ({
  EventsCard: {
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
    flexFlow: 'row',
    alignItems: 'stretch',
    width: '86vw',
    minHeight: '37vh',
    backgroundColor: '#253F51',
    margin: '0 auto 2em',
    padding: '15px 0px',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      flexFlow: 'column',
      minHeight: '32vh',
    },
  },
})

const EventCard = ({
  month,
  day,
  weekday,
  name,
  timeloc,
  content,
  classes,
}) => (
  <Card className={classes.EventsCard}>
    <EventDate month={month} day={day} weekday={weekday} />
    <EventContent name={name} timeloc={timeloc} content={content} />
  </Card>
)

EventCard.propTypes = {
  // January-December
  month: PropTypes.string,
  // 0-31
  day: PropTypes.string,
  // Monday-Friday
  weekday: PropTypes.string,
  // Title for the event
  name: PropTypes.string,
  // Time and location
  timeloc: PropTypes.string,
  // Description
  content: PropTypes.string,
  classes: PropTypes.shape({}),
}

export default withStyles(styles, { withTheme: true })(EventCard)
