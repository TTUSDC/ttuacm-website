import React from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import useWindowSize from 'hooks/useWindowSize'
import { useTheme } from '@material-ui/styles'
import EventDate from './EventDate'
import EventContent from './EventContent'


function getStyle(theme, width) {
  let direction = 'row'
  let cardHeight = '37vh'

  if (width < theme.breakpoints.values.sm) {
    direction = 'column'
    cardHeight = '32vh'
  }

  const curr = {
    EventsCard: {
      color: 'white',
      display: 'flex',
      flexDirection: direction,
      flexFlow: direction,
      alignItems: 'stretch',
      width: '86vw',
      height: cardHeight,
      backgroundColor: '#253F51',
      margin: '0 auto 2em',
      padding: '15px 0px',
    },
  }

  return curr
}

const EventCard = ({
  month, day, weekday, name, timeloc, content,
}) => {
  const { width } = useWindowSize()
  const theme = useTheme()
  const style = getStyle(theme, width)

  return (
    <Card style={style.EventsCard}>
      <EventDate month={month} day={day} weekday={weekday} />
      <EventContent name={name} timeloc={timeloc} content={content} />
    </Card>
  )
}


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

export default EventCard
