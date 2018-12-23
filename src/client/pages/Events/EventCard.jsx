import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import EventDate from './EventDate.jsx';
import EventContent from './EventContent.jsx';

const styles = {
  EventsCard: {
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
    flexFlow: 'row wrap',
    alignItems: 'stretch',
    width: '86vw',
    height: '37vh',
    backgroundColor: '#253F51',
    margin: '0 auto 2em',
  },
};

const EventCard = ({
  month, day, weekday, name, timeloc, content, classes,
}) => (
  <Card className={classes.EventsCard}>
    <EventDate month={month} day={day} weekday={weekday} />
    <EventContent name={name} timeloc={timeloc} content={content} />
  </Card>
)


EventCard.propTypes = {
  month: PropTypes.string,
  day: PropTypes.string,
  weekday: PropTypes.string,
  name: PropTypes.string,
  timeloc: PropTypes.string,
  content: PropTypes.string,
  classes: PropTypes.shape({}),
};

export default withStyles(styles)(EventCard);
