import React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { withStyles } from '@material-ui/core/styles'

const routes = [
  ['/home', 'Home'],
  ['/about', 'AboutUs'],
  ['/events', 'Events'],
  ['/teams', 'Teams'],
]

const DesktopNavigation = ({
  classes = {},
  handleNavigation,
  handleLogout,
  isLoggedIn,
}) => {
  function fmtRouteName(name) {
    return name.slice(1, name.length)
  }

  return (
    <Tabs variant='fullWidth' classes={{ indicator: classes.tabsIndicator }}>
      {routes.map((route, key) => (
        <Tab
          disableRipple
          key={`${route[0]}-${key + 1}`}
          label={fmtRouteName(route[0])}
          data-testid={route[1]}
          onClick={handleNavigation(`${route[0]}`)}
          classes={{ root: classes.DesktopNav }}
        />
      ))}
      {isLoggedIn ? (
        <Tab
          disableRipple
          onClick={handleLogout}
          label='Logout'
          classes={{ root: classes.DesktopNav }}
          data-testid='login-logout'
        />
      ) : (
        <Tab
          disableRipple
          label='Login'
          onClick={handleNavigation('/auth')}
          classes={{ root: classes.DesktopNav }}
          data-testid='login-logout'
        />
      )}
    </Tabs>
  )
}

const styles = {
  DesktopNav: {
    minWidth: 72,
    border: '0 !important',
    '&:hover': {
      color: 'white',
      opacity: 1,
    },
  },
  tabsIndicator: {
    backgroundColor: 'white',
  },
}

DesktopNavigation.propTypes = {
  handleNavigation: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  classes: PropTypes.shape({}),
}

export default withStyles(styles)(DesktopNavigation)
