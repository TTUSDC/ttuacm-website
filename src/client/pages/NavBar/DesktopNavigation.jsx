import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

const withBox = {
  border: 'solid white 2px',
}

const routes = [
  ['/home', 'Home'],
  ['/about', 'About Us'],
  ['/events', 'Events'],
  ['/teams', 'Club'],
]


const DesktopNavigation = ({
  classes = {}, handleNavigation, currentPage, handleLogout, isLoggedIn,
}) => (
  <React.Fragment>
    {
      routes.map((route, key) => (
        <Button
          key={`${route[0]}-${key + 1}`}
          data-testid={route[1]}
          style={route[0] === currentPage ? withBox : {}}
          onClick={handleNavigation(`${route[0]}`)}
          className={classes.DesktopNav}
        >
          {route[1]}
        </Button>
      ))
    }
    {
      isLoggedIn
        ? (
          <Button
            onClick={handleLogout}
            className={classes.DesktopNav}
            data-testid='login-logout'
          >
        Logout
          </Button>
        )
        : (
          <Button
            style={currentPage === '/auth' ? withBox : {}}
            onClick={handleNavigation('/auth')}
            className={classes.DesktopNav}
            data-testid='login-logout'
          >
        Login
          </Button>
        )
    }
  </React.Fragment>
)

const styles = theme => ({
  DesktopNav: {
    textTransform: 'none',
    fontSize: '1.25rem',
    boxShadow: 'none',
    fontWeight: '300',
    '&:hover': {
      backgroundColor: 'initial',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: 'inital',
    },
    '&:focus': {
      boxShadow: 'none',
      backgroundColor: 'inital',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'initial',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
})

DesktopNavigation.propTypes = {
  handleNavigation: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  classes: PropTypes.shape({}),
  currentPage: PropTypes.string.isRequired,
}

export default withStyles(styles)(DesktopNavigation)
