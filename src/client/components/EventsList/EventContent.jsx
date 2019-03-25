import React from 'react'
import CardContent from '@material-ui/core/CardContent'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  EventContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  name: {
    fontSize: '3rem',
    fontWeight: 'bold', // Before I override the CardHeader's values in theme
    marginBottom: '0px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '2rem',
    },
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
})

const EventContent = ({
  name, timeloc, content, classes,
}) => (
  <CardContent className={classes.EventContent}>
    <Typography className={classes.name} variant='h4' gutterBottom>{name}</Typography>
    {
      content
        ? (<Typography className={classes.timeloc} variant='body1' gutterBottom>{timeloc}</Typography>)
        : (
          <Typography className={classes.timeloc} variant='body1' gutterBottom>
            More events will show up when the start of the semester approaches
          </Typography>
        )
    }
    <Typography className={classes.content}>{content}</Typography>
  </CardContent>
)

EventContent.propTypes = {
  name: PropTypes.string.isRequired,
  timeloc: PropTypes.string,
  content: PropTypes.string,
  classes: PropTypes.shape({}),
}

export default withStyles(styles, { withTheme: true })(EventContent)
