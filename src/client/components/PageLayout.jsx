import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import PageHeader from 'components/PageHeader'

export default function PageLayout({ headerInfo, content }) {
  return (
    <Fragment>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <PageHeader {...headerInfo} />
        </Grid>
        <Grid item xs={12}>
          {content}
        </Grid>
      </Grid>
    </Fragment>
  )
}

PageLayout.propTypes = {
  // The top part of each page
  header: PropTypes.shape({}),
  // The bottom part of the each page
  content: PropTypes.node,
}
