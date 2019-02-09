import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import firebase from 'firebase'
import { toggleAuthState } from 'redux/actions/auth-actions'
import DesktopNavigation from './DesktopNavigation.jsx'
import Logo from './Logo.jsx'

const styles = {
  barDefaults: {
    maxHeight: '64px',
    maxWidth: '100%',
  },
  root: {
    display: 'flex',
    maxWidth: '100%',
  },
}

const NavBar = ({
  classes, currentPage, navigateTo, isLoggedIn, toggleLoggedIn,
}) => {
  useEffect(() => {
    toggleLoggedIn()
  }, [])

  const handleNavigation = nextPage => () => {
    if (currentPage !== nextPage) {
      navigateTo(nextPage)
    }
  }

  const handleLogout = () => {
    // OAuth Sign out
    if (localStorage.getItem('oauth_user')) firebase.auth().signOut()

    // Local Sign Out
    localStorage.removeItem('token')
    localStorage.removeItem('oauth_user')

    toggleLoggedIn()
    handleNavigation('/')()
  }

  return (
    <div className={classes.root}>
      <AppBar
        position='static'
        className={classes.barDefaults}
      >
        <Toolbar
          className={classes.barDefaults}
        >
          <Logo
            handleNavigation={handleNavigation}
            currentPage={currentPage}
          />

          {/* Desktop Navigation */}
          <DesktopNavigation
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
            handleNavigation={handleNavigation}
            currentPage={currentPage}
          />
        </Toolbar>
      </AppBar>
    </div>
  )
}

NavBar.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  toggleLoggedIn: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  classes: PropTypes.shape({}),
  currentPage: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  currentPage: state.router.getIn(['location', 'pathname']),
  isLoggedIn: state.auth.get('isLoggedIn'),
})

const mapDispatchToProps = dispatch => ({
  navigateTo: (location) => {
    dispatch(push(location))
  },
  toggleLoggedIn: () => {
    dispatch(toggleAuthState())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NavBar))
