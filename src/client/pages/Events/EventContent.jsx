import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
  EventContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left',
    flexGrow: 3,
  },
  name: {
    fontSize: '4rem',
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
  }
};

const EventContent = ({
  name, timeloc, content, classes,
}) => (
  <CardContent className={classes.EventContent}>
    {/* <div className={classes.EventContent}> */}
    <Typography className={classes.name} component='h4' variant='h4' gutterBottom>{name}</Typography>
    <Typography className={classes.timeloc} variant='body1' gutterBottom>{timeloc}</Typography>
    <Typography className={classes.content}>{content}</Typography>
    {/* </div> */}
  </CardContent>
)

EventContent.propTypes = {
  name: PropTypes.string,
  timeloc: PropTypes.string,
  content: PropTypes.string,
  classes: PropTypes.shape({}),
};

export default withStyles(styles, { withTheme: true })(EventContent);
