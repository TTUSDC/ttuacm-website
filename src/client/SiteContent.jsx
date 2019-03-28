import React from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { ConnectedRouter } from 'connected-react-router/immutable'
import Footer from 'pages/Footer/Footer.jsx'
import Routes from 'Routes'

const styles = (theme) => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 auto',
    marginTop: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  mainShift: {
    // marginTop: drawerHeight,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  SiteContent: {
    margin: 0,
    width: '100%',
  },
})

const SiteContent = ({ classes = {}, history }) => (
  <div className={classes.SiteContent}>
    <main className={classes.main}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </main>
    <Footer />
  </div>
)

SiteContent.propTypes = {
  classes: PropTypes.shape({}),
  history: PropTypes.shape({}),
}

export default connect()(withStyles(styles)(SiteContent))
