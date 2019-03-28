import React from 'react'
import { PropTypes } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import NavBar from 'pages/NavBar/NavBar.jsx'
import SiteContent from './SiteContent.jsx'

const styles = {
  Main: {
    display: 'flex',
    flexFlow: 'column wrap',
  },
}

const Main = ({ classes = {}, history }) => (
  <div className={classes.Main}>
    <CssBaseline />
    <NavBar />
    <SiteContent history={history} />
  </div>
)

Main.propTypes = {
  classes: PropTypes.shape({}),
  history: PropTypes.shape({}),
}

export default withStyles(styles)(Main)
