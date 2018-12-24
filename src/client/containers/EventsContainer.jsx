import React from 'react';

import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

 import EventsView from 'pages/Events/EventsView'

/*
*
* FAKE API HANDLING PART - START
*/
// Fake Events API
import { EventsResponse, EventField, ProvidedTimes } from './EventsFakeAPI'

function getEventsAsArray(givenTime) {
  const eventsAsArray = [];
  const eventsForGivenTime = EventsResponse[givenTime];

  if (EventsResponse[givenTime]) {
    for (let eventIdx = 0; eventIdx < eventsForGivenTime.length; eventIdx += 1) {
      const event = eventsForGivenTime[eventIdx];
      const eventArr = []

      for (const field of EventField) {
        eventArr.push(event[field])
      }

      eventsAsArray.push(eventArr)
    }
  }
  return eventsAsArray;
}

function renderEventsViews(givenTime) {
  // const allEvents = ProvidedTimes.map((time) => {

  // });
  // console.log(allEvents);
  const anEvent = getEventsAsArray(givenTime);
  return (
    <EventsView
      time={givenTime}
      events={anEvent}
    />
  );
}

/*
*
* FAKE API HANDLING PART - END
*/


const styles = {
  EventsContainer: {
    margin: '0 0',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
  },
};


const EventsContainer = ({ classes = {} }) => (
  <Grid
    container
    direction='column'
    justify='center'
    alignItems='center'
    className={classes.EventsContainer}
  >
    {/* <p>Inside the EventsContainer</p> */}
    {renderEventsViews(ProvidedTimes[0])}
    {renderEventsViews(ProvidedTimes[1])}
    {renderEventsViews(ProvidedTimes[2])}
    {renderEventsViews(ProvidedTimes[3])}
  </Grid>
)

EventsContainer.propTypes = {
  classes: PropTypes.shape({}),
};

export default withStyles(styles)(EventsContainer);
