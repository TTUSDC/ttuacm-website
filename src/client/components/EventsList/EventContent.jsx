import React from 'react'
import CardContent from '@material-ui/core/CardContent'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

import useWindowSize from 'hooks/useWindowSize'
import { useTheme } from '@material-ui/styles'


function getStyle(theme, width) {
  let centeredText = null
  let titleSize = '3rem'

  if (width < theme.breakpoints.values.sm) {
    centeredText = 'center'
    titleSize = '2rem'
  }

  const curr = {
    EventContent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'left',
      textAlign: centeredText,
    },
    name: {
      fontSize: titleSize,
      fontWeight: 'bold', // Before I override the CardHeader's values in theme
      marginBottom: '0px',
    },
    timeloc: {
      fontSize: '1rem',
      marginTop: '0',
      fontStyle: 'italic',
      color: 'white',
      opacity: 0.6,
    },
    content: {
      fontSize: '1em',
      wordWrap: 'break-word',
    },
  }

  return curr
}

const EventContent = ({
  name, timeloc, content,
}) => {
  const { width } = useWindowSize()
  const theme = useTheme()
  const style = getStyle(theme, width)

  return (
    <CardContent style={style.EventContent}>
      <Typography style={style.name} variant='h4' gutterBottom>{name}</Typography>
      {
      content
        ? (<Typography style={style.timeloc} variant='body1' gutterBottom>{timeloc}</Typography>)
        : (
          <Typography style={style.timeloc} variant='body1' gutterBottom>
            More events will show up when the start of the semester approaches
          </Typography>
        )
    }
      <Typography style={style.content}>{content}</Typography>
    </CardContent>
  )
}

EventContent.propTypes = {
  name: PropTypes.string.isRequired,
  timeloc: PropTypes.string,
  content: PropTypes.string,
}

export default EventContent
