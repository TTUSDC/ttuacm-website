import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Links from './Links.jsx'
import Copyright from './Copyright.jsx'

const style = (theme) => ({
  footerBottom: {
    backgroundColor: theme.palette.primary.main,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {},
  copyright: {
    display: 'flex',
    flexGrow: 4,
    alignContent: 'space-around',
  },
  links: {
    flexGrow: 1,
    flexDirection: 'row',
  },
})

const FooterBottom = ({ classes = {} }) => (
  <Grid container spacing={24} className={classes.footerBottom}>
    <Grid item className={classes.copyright} xs={9}>
      <Copyright />
    </Grid>
    <Grid item className={classes.links}>
      <Links />
    </Grid>
  </Grid>
)

FooterBottom.propTypes = {
  classes: PropTypes.shape({}),
}

export default withStyles(style, { withTheme: true })(FooterBottom)
