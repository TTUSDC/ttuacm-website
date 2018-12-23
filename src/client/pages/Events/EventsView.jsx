import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import EventCard from './EventCard.jsx'

function renderEvents(events) {
  if (events.length === 0 || !events) {
    console.log('EMPTY BOOOHOOO');
    return (
      <EventCard
        month=''
        day=''
        weekday=''
        name={'NOTHING\'S HAPPENING'}
        timeloc=''
        content='Please check back later'
      />
    );
  }

  const eventsCards = events.map((event, idx) => {
    const month = event[0]
    const day = event[1]
    const weekday = event[2]
    const name = event[3]
    const timeloc = event[4]
    const content = event[5]
    return (
      <EventCard
        key={idx} // Add to do it because no stable index's available.
        month={month} 
        day={day}
        weekday={weekday}
        name={name}
        timeloc={timeloc}
        content={content}
      />
    )
  });
  console.log(eventsCards);
  return eventsCards;
}


const styles = {
  EventsView: {
    margin: '0 auto',
    width: '100%',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  EventTime: {
    color: 'white',
    textAlign: 'center',
    margin: '4vh',
    fontWeight: 'bold',
  },
}

const EventsView = ({ classes = {}, time, events }) => (
  <Grid
    container
    direction='column'
    justify='center'
    alignItems='center'
    className={classes.EventsView}
  >
    <div><Typography variant='h3' className={classes.EventTime}>{time}</Typography></div>
    <div className={classes.Events}>{renderEvents(events)}</div>
  </Grid>
)

EventsView.propTypes = {
  classes: PropTypes.shape({}),
  time: PropTypes.string,
  events: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
}

export default withStyles(styles)(EventsView);
