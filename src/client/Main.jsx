import React from 'react'
import { PropTypes } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import NavBar from 'pages/NavBar/NavBar.jsx'
import { connect } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router/immutable'
import Routes from 'Routes'
import Footer from 'pages/Footer'

const styles = (theme) => ({
  Main: {
    display: 'flex',
    flexFlow: 'column wrap',
  },
  Router: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 auto',
    marginTop: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  SiteContent: {
    margin: 0,
    width: '100%',
  },
})

const Main = ({ classes = {}, history }) => (
  <div className={classes.Main}>
    <CssBaseline />
    <NavBar />
    <div className={classes.SiteContent}>
      <main className={classes.Router}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </main>
      <Footer />
    </div>
  </div>
)

Main.propTypes = {
  classes: PropTypes.shape({}),
  history: PropTypes.shape({}),
}

export default connect()(withStyles(styles)(Main))
