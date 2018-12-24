import React, { Fragment } from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

 import PageInfo from 'components/PageInfo'
import EventsContainer from '../../containers/EventsContainer'

import { EventsPageInfo } from '../../containers/EventsFakeAPI'

const styles = {
  container: {
    backgroundColor: '#333333',
  },
}


function EventsPage({ classes = {} }) {
  return (
    <Fragment>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <PageInfo {...EventsPageInfo} />
        </Grid>
        <Grid item xs={12}>
          <EventsContainer />
        </Grid>
      </Grid>
    </Fragment>
  )
}

EventsPage.propTypes = {
  classes: PropTypes.string,
};

export default withStyles(styles)(EventsPage);
