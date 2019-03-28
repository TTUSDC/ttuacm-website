import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { withStyles } from '@material-ui/core/styles'

const withBox = {
  border: 'solid white 2px',
}

const routes = [
  ['/home', 'Home'],
  ['/about', 'AboutUs'],
  ['/events', 'Events'],
  ['/teams', 'Teams'],
]


const DesktopNavigation = ({
  classes = {}, handleNavigation, currentPage, handleLogout, isLoggedIn,
}) => {
  const [currTab, setCurrTab] = useState(0)

  function fmtRouteName(name) {
    return name.slice(1, name.length)
  }

  return (
    <Tabs
      value={currTab}
      variant='fullWidth'
      classes={{ indicator: classes.tabsIndicator }}
      onChange={(e, val) => setCurrTab(val)}
    >
      {
      routes.map((route, key) => (
        <Tab
          disableRipple
          key={`${route[0]}-${key + 1}`}
          label={fmtRouteName(route[0])}
          data-testid={route[1]}
          onClick={handleNavigation(`${route[0]}`)}
          style={route[0] === currentPage ? withBox : {}}
          classes={{ root: classes.DesktopNav, selected: classes.tabSelected }}
        />
      ))
    }
      {
      isLoggedIn
        ? (
          <Tab
            disableRipple
            onClick={handleLogout}
            label='Logout'
            classes={{ root: classes.DesktopNav, selected: classes.tabSelected }}
            data-testid='login-logout'
          />
        )
        : (
          <Tab
            disableRipple
            style={currentPage === '/auth' ? withBox : {}}
            label='Login'
            onClick={handleNavigation('/auth')}
            classes={{ root: classes.DesktopNav, selected: classes.tabSelected }}
            data-testid='login-logout'
          />
        )
    }
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
  currentPage: PropTypes.string.isRequired,
}

export default withStyles(styles)(DesktopNavigation)
