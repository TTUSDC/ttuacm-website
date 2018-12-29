import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = {
  date: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    margin: '0px 20px',
  },
  month: {
    fontSize: '2rem',
  },
  weekday: {
    fontSize: '2rem',
  },
  day: {
    fontSize: '8rem',
    fontWeight: 'bold',
  },
}

const EventDate = ({
  month, day, weekday, classes,
}) => (
  <div className={classes.date}>
    <Typography className={classes.month} variant='h6'>{month || 'January'}</Typography>
    <Typography className={classes.day} variant='h3'>{day || '1'}</Typography>
    <Typography className={classes.weekday} variant='h6'>{weekday || '1970'}</Typography>
  </div>
)

EventDate.propTypes = {
  // January-Decemeber
  month: PropTypes.string,
  // 0-31
  day: PropTypes.string,
  // Monday-Sunday
  weekday: PropTypes.string,
  // Style
  classes: PropTypes.shape({}),
};

export default withStyles(styles, { withTheme: true })(EventDate)
