import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Links from './Links.jsx'
import Copyright from './Copyright.jsx'

const style = {
  root: {
    backgroundColor: 'red',
    display: 'flex',
    height: '60px',
  },
  container: {
    margin: '0px 15px',
  },
  copyright: {
    display: 'flex',
    alignItems: 'center',
  },
  links: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
}

const FooterBottom = ({ classes = {} }) => (
  <div className={classes.root}>
    <Grid container spacing={12}>
      <Grid className={classes.copyright} item xs={10}>
        <Copyright />
      </Grid>
      <Grid className={classes.links} item xs={2}>
        <Links />
      </Grid>
    </Grid>
  </div>
)

FooterBottom.propTypes = {
  classes: PropTypes.shape({}),
}

export default withStyles(style)(FooterBottom)
