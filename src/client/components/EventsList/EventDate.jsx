import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

import useWindowSize from 'hooks/useWindowSize'
import { useTheme } from '@material-ui/styles'

function getStyle(theme, width) {
  let monthSize = '2rem'
  let weekSize = '2rem'
  let daySize = '8rem'
  let alignment = 'center'
  let layout = 'column'

  const boldedDay = 'bold'

  if (width < theme.breakpoints.values.sm) {
    monthSize = '1rem'
    weekSize = '1rem'
    daySize = '1rem'
    alignment = 'space-evenly'
    layout = 'row'
  }

  const curr = {
    date: {
      display: 'flex',
      flexDirection: layout,
      alignItems: 'center',
      justifyContent: alignment,
      textAlign: 'center',
      margin: '0px 20px',
    },
    month: {
      ...theme.typography.h3,
      fontSize: monthSize,
      fontWeight: boldedDay,
    },
    weekday: {
      ...theme.typography.h3,
      fontSize: weekSize,
      fontWeight: boldedDay,
    },
    day: {
      fontSize: daySize,
      fontWeight: boldedDay,
    },
  }
  return curr
}

const EventDate = ({
  month, day, weekday,
}) => {
  const { width } = useWindowSize()
  const theme = useTheme()
  const style = getStyle(theme, width)

  return (
    <div style={style.date}>
      <Typography style={style.month}>{month || 'January'}</Typography>
      <Typography style={style.day}>{day || '1'}</Typography>
      <Typography style={style.weekday}>{weekday || '1970'}</Typography>
    </div>
  )
}

EventDate.propTypes = {
  // January-Decemeber
  month: PropTypes.string,
  // 0-31
  day: PropTypes.string,
  // Monday-Sunday
  weekday: PropTypes.string,
};

export default EventDate
