import React from 'react'
import firebaseInstance from 'firebase'
import PropTypes from 'prop-types'
import { withFirebase } from 'context/Firebase'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import useSnackbar from 'hooks/useSnackbar'
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

const NavBar = ({ classes, currentPage, navigateTo }) => {
  const { firebase, isUserLoggedIn, isVerified } = withFirebase()
  const [SnackBar, enqueueSnackbar] = useSnackbar()

  const handleNavigation = (nextPage) => () => {
    navigateTo(nextPage)
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
    <AppBar position='static' className={classes.barDefaults}>
      <Grid container spacing={16} className={classes.Container}>
        <Grid
          className={classes.ImageContainer}
          item
          xs={16}
          data-testid='Logo'
        >
          {isVerified === false ? (
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
            currentPage={currentPage}
          />
        </Grid>
      </Grid>
      <SnackBar />
    </AppBar>
  )
}

NavBar.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  classes: PropTypes.shape({}),
  currentPage: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  currentPage: state.router.location.pathname,
})

const mapDispatchToProps = (dispatch) => ({
  navigateTo: (location) => {
    dispatch(push(location))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles, { withTheme: true })(NavBar))
