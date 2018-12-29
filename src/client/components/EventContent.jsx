import React from 'react'
import CardContent from '@material-ui/core/CardContent'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = {
  EventContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left',
    flexGrow: 3,
  },
  name: {
    fontSize: '3rem',
    fontWeight: 'bold', // Before I override the CardHeader's values in theme
    marginBottom: '0px',
  },
  timeloc: {
    fontSize: '2rem',
    marginTop: '0',
    fontStyle: 'italic',
  },
  content: {
    fontSize: '1.1em',
    wordWrap: 'break-word',
    wordBreak: 'break-all',
  },
}

const EventContent = ({
  name, timeloc, content, classes,
}) => (
  <CardContent className={classes.EventContent}>
    <Typography className={classes.name} component='h4' variant='h4' gutterBottom>{name}</Typography>
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
