import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const Navigation = ({ handleNavigation, classes = {} }) => (
  <div className={classes.root}>
    <AppBar position='static'>
      <Toolbar>
        {/* TODO: Handle Resoinsiveness */}
        {/* <IconButton className={classes.menuButton} color='inherit' aria-label='Menu'> */}
        {/*   <MenuIcon /> */}
        {/* </IconButton> */}
        <Typography
          variant='h6'
          color='inherit'
          className={classes.grow}
        >
          <span
            role='button'
            tabIndex={0}
            className={classes.homeBtn}
            onClick={handleNavigation('/')}
            onKeyPress={() => {}}
          >
            LOGO
          </span>
        </Typography>
        <Button onClick={handleNavigation('/')} color='inherit'>Home</Button>
        <Button onClick={handleNavigation('/about')} color='inherit'>About</Button>
        <Button onClick={handleNavigation('/events')} color='inherit'>Events</Button>
        <Button onClick={handleNavigation('/teams')} color='inherit'>Club</Button>
        <Button onClick={handleNavigation('/auth')} color='inherit'>Login</Button>
      </Toolbar>
    </AppBar>
  </div>
)

const styles = {
  root: {
    flexGrow: 1,
  },
  homeBtn: {
    cursor: 'pointer',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}


Navigation.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  handleNavigation: PropTypes.func.isRequired,
}

export default withStyles(styles)(Navigation)
