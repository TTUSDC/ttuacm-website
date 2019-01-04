import React from 'react'
import PropTypes from 'prop-types'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Navigation from './Navigation.jsx'
import Logo from './Logo.jsx'

const NavBar = ({ classes, currentPage, navigateTo }) => {
  const handleNavigation = nextPage => () => {
    navigateTo(nextPage)
  }

  const routeNames = [
    ['/', 'Home'],
    ['/about', 'About Us'],
    ['/events', 'Events'],
    ['/teams', 'Club'],
    // ['/auth', 'Login'],
  ]

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Logo
            handleNavigation={handleNavigation}
            currentPage={currentPage}
          />
          <Navigation
            routes={routeNames}
            handleNavigation={handleNavigation}
            currentPage={currentPage}
          />
        </Toolbar>
      </AppBar>
    </div>
  )
}

const styles = {
  root: {
    flexGrow: 1,
  },
}

NavBar.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  classes: PropTypes.shape({}),
  currentPage: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  currentPage: state.router.location.pathname,
})

const mapDispatchToProps = dispatch => ({
  navigateTo: (location) => {
    dispatch(push(location))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NavBar))
