import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => {
  const SMALL_TEXT_SIZE = '1rem'

  const curr = {
    date: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      margin: '0px 20px',
      [theme.breakpoints.down('xs')]: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
      },
    },
    month: {
      ...theme.typography.h3,
      fontSize: '2rem',
      [theme.breakpoints.down('xs')]: {
        fontSize: SMALL_TEXT_SIZE,
      },
      fontWeight: 'bold',
    },
    weekday: {
      ...theme.typography.h3,
      fontSize: '2rem',
      [theme.breakpoints.down('xs')]: {
        fontSize: SMALL_TEXT_SIZE,
      },
      fontWeight: 'bold',
    },
    day: {
      fontSize: '4rem',
      [theme.breakpoints.down('xs')]: {
        fontSize: SMALL_TEXT_SIZE,
      },
      fontWeight: 'bold',
    },
  }
  return curr
}

const EventDate = ({
  month, day, weekday, classes,
}) => (
  <div className={classes.date}>
    <Typography className={classes.month}>{month || 'January'}</Typography>
    <Typography className={classes.day}>{day || '1'}</Typography>
    <Typography className={classes.weekday}>{weekday || '1970'}</Typography>
  </div>
)

EventDate.propTypes = {
  // January-Decemeber
  month: PropTypes.string,
  // 0-31
  day: PropTypes.string,
  // Monday-Sunday
  weekday: PropTypes.string,
  // Styles
  classes: PropTypes.shape({}),
};

export default withStyles(styles, { withTheme: true })(EventDate)
