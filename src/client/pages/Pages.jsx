import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'
import { Router } from '@reach/router'
import Footer from 'client/pages/Footer'
import NavBar from 'client/pages/NavBar/NavBar.jsx'
import { PropTypes } from 'prop-types'
import React from 'react'

import AboutUsPage from './AboutUs/AboutUsPage'
import AuthenticationPage from './Authentication/AuthenticationPage'
import EventsPage from './Events/EventsPage'
import LandingPage from './Landing/LandingPage'
import NotFoundPage from './NotFound/NotFoundPage'
import TeamsPage from './Teams/TeamsPage'

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

const Main = ({ classes = {} }) => (
  <div className={classes.Main}>
    <CssBaseline />
    <NavBar />
    <div className={classes.SiteContent}>
      <main className={classes.Router}>
        <Router primary={false}>
          <LandingPage path='/' />
          <LandingPage path='/home' />
          <AboutUsPage path='/about' />
          <TeamsPage path='/teams' />
          <EventsPage path='/events' />
          <AuthenticationPage path='/auth' />
          <NotFoundPage default />
        </Router>
      </main>
      <Footer />
    </div>
  </div>
)

Main.propTypes = {
  classes: PropTypes.shape({}),
  history: PropTypes.shape({}),
}

export default withStyles(styles)(Main)
