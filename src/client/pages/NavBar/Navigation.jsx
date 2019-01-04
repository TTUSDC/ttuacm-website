import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import useLoggedIn from 'hooks/useLoggedIn'

const withBox = {
  border: 'solid white 2px',
}

const Navigation = ({
  classes = {}, handleNavigation, currentPage, routes,
}) => {
  const [error, isLoggedIn] = useLoggedIn()
  if (error) {
    // TODO handle this error with a snack bar
    handleNavigation('/home')()
  }

  const handleLogout = () => {
    localStorage.setItem('token', undefined)
    handleNavigation('/home')()
  }

  return (
    <React.Fragment>
      {
      routes.map((route, key) => (
        <Typography
          key={`${route[0]}-${key + 1}`}
          variant='h6'
          style={route[0] === currentPage ? withBox : {}}
          onClick={handleNavigation(`${route[0]}`)}
          className={classes.nav}
        >
          {route[1]}
        </Typography>
      ))
    }
      {
      isLoggedIn
        ? (
          <Typography
            variant='h6'
            onClick={handleLogout}
            className={classes.nav}
            data-testid='login-logout'
          >
        Logout
          </Typography>
        )
        : (
          <Typography
            variant='h6'
            style={currentPage === '/auth' ? withBox : {}}
            onClick={handleNavigation('/auth')}
            className={classes.nav}
            data-testid='login-logout'
          >
        Login
          </Typography>
        )
    }
    </React.Fragment>
  )
}

const style = () => ({
  nav: {
    padding: '5px',
    margin: '0px 5px',
    width: '85px',
    textAlign: 'center',
  },
})

Navigation.propTypes = {
  handleNavigation: PropTypes.func.isRequired,
  classes: PropTypes.shape({}),
  currentPage: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
}

export default withStyles(style)(Navigation)
