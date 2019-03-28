import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import firebase from 'firebase'
import { toggleAuthState } from 'redux/actions/auth-actions'
import Tech from 'assets/Tech.png'
import DesktopNavigation from './DesktopNavigation.jsx'

const styles = (theme) => ({
  barDefaults: {
    background: '#333333',
  },
  img: {
    height: 40,
    width: 'auto',
    margin: '0px 6px',
  },
  ImageContainer: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      marginTop: '15px',
    },
  },
  Tabs: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  Container: {
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-around',
    },
  },
})

const NavBar = ({
  classes,
  currentPage,
  navigateTo,
  isLoggedIn,
  checkIfLoggedIn,
}) => {
  useEffect(() => {
    checkIfLoggedIn()
  })

  const handleNavigation = (nextPage) => () => {
    navigateTo(nextPage)
  }

  const handleLogout = () => {
    // OAuth Sign out
    if (localStorage.getItem('oauth_user')) firebase.auth().signOut()

    // Local Sign Out
    // TODO(@miggy) remove this shit lol make it all firebase handled
    localStorage.removeItem('token')
    localStorage.removeItem('oauth_user')

    handleNavigation('/')()
  }

  return (
    <AppBar position='static' className={classes.barDefaults}>
      <Grid
        container
        spacing={16}
        className={classes.Container}
      >
        <Grid
          className={classes.ImageContainer}
          item
          xs={6}
          onClick={handleNavigation('/')}
        >
          <img
            className={classes.img}
            alt='tech building'
            src={Tech}
          />
        </Grid>
        {/* Desktop Navigation */}
        <Grid
          item
          xs='auto'
          className={classes.Tabs}
        >
          <DesktopNavigation
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
            handleNavigation={handleNavigation}
            currentPage={currentPage}
          />
        </Grid>
      </Grid>
    </AppBar>
  )
}

NavBar.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  checkIfLoggedIn: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  classes: PropTypes.shape({}),
  currentPage: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  currentPage: state.router.location.pathname,
  isLoggedIn: state.auth.get('isLoggedIn'),
})

const mapDispatchToProps = (dispatch) => ({
  navigateTo: (location) => {
    dispatch(push(location))
  },
  checkIfLoggedIn: () => {
    dispatch(toggleAuthState())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles, { withTheme: true })(NavBar))
