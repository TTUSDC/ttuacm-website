import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { navigate, Location } from '@reach/router'
import { withFirebase } from 'client/context/Firebase'
import firebaseInstance from 'firebase'
import useSnackbar from 'client/hooks/useSnackbar'
import PropTypes from 'prop-types'
import React from 'react'

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
    padding: '0px 25px !important',
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

const NavBar = ({ classes }) => {
  const { firebase, isUserLoggedIn, isVerified } = withFirebase()
  const [SnackBar, enqueueSnackbar] = useSnackbar()

  const handleNavigation = (nextPage) => () => {
    navigate(nextPage)
  }

  const handleLogout = () => {
    // OAuth Sign out
    if (firebase.isUserLoggedIn()) firebase.signOut()

    handleNavigation('/')()
  }

  async function sendEmailVerification() {
    try {
      await firebaseInstance.auth().currentUser.sendEmailVerification()
      enqueueSnackbar('Success! Please check your email', 'success')
    } catch (err) {
      console.error(err)
      enqueueSnackbar('Error sending email... Please try again later', 'error')
    }
  }

  const username = firebase.getUserName() ? firebase.getUserName() : 'Guest'

  return (
    <Location>
      {({ location }) => (
        <AppBar position='static' className={classes.barDefaults}>
          <Grid container spacing={16} className={classes.Container}>
            <Grid
              className={classes.ImageContainer}
              item
              xs={16}
              data-testid='Logo'
            >
              {isVerified === false && isUserLoggedIn ? (
                <Typography onClick={sendEmailVerification} variant='body1'>
                  Click To Send Email Verification
                </Typography>
              ) : (
                <Typography onClick={handleNavigation('/home')} variant='body1'>
                  {username}
                </Typography>
              )}
            </Grid>
            {/* Desktop Navigation */}
            <Grid item xs='auto' className={classes.Tabs}>
              <DesktopNavigation
                isLoggedIn={isUserLoggedIn}
                handleLogout={handleLogout}
                handleNavigation={handleNavigation}
                currentPage={location.pathname}
              />
            </Grid>
          </Grid>
          <SnackBar />
        </AppBar>
      )}
    </Location>
  )
}

NavBar.propTypes = {
  classes: PropTypes.shape({}),
}

export default withStyles(styles, { withTheme: true })(NavBar)
