import React, { Fragment, useContext } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import PageInfo from 'components/PageInfo'
import EventsContainer from 'containers/EventsContainer'
import { EventsPageCtx } from 'context/EventsInfo'

const styles = {
  container: {
    backgroundColor: '#333333',
  },
}

function EventsPage() {
  const EventsPageInfo = useContext(EventsPageCtx)
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

export default withStyles(styles)(EventsPage);
