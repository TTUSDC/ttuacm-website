import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { MenuItem, MenuList } from '@material-ui/core'
import Dashboard from '../dashboard/Dashboard'
import Logo from '../../../../assets/Tech.png'

const drawerWidth = 240

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
      color: 'black',
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,

  drawerPaper: {
    width: drawerWidth,
    padding: 20,
    backgroundColor: 'black',
  },
  content: {
    flexGrow: 3,
    padding: theme.spacing.unit * 3,
  },
})

const logoStyle = {
  height: 100,
  width: drawerWidth - 30,
  paddingRight: 10,
  marginRight: 20,
  objectFit: 'contain',
}

class ConsoleMenu extends React.Component {
  state = {
    mobileOpen: false,
  }

  handleDrawerToggle = () => {
    this.setState((state) => ({ mobileOpen: !state.mobileOpen }))
  }

  render() {
    const { classes, theme, children } = this.props

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <div className='logo'>
          <img src={Logo} alt='Logo' style={logoStyle} />
        </div>
        <Divider />
        <MenuList>
          <a href='/console' style={{ textDecoration: 'none' }}>
            <MenuItem style={{ padding: 30 }}>
              <Typography variant='h6' color='inherit' align='center' noWrap>
                Home
              </Typography>
            </MenuItem>
          </a>
          <a href='/console/members' style={{ textDecoration: 'none' }}>
            <MenuItem style={{ padding: 30 }}>
              <Typography variant='h6' color='inherit' align='center' noWrap>
                Members
              </Typography>
            </MenuItem>
          </a>
          <a href='/console/officers' style={{ textDecoration: 'none' }}>
            <MenuItem style={{ padding: 30 }}>
              <Typography variant='h6' color='inherit' align='center' noWrap>
                Officers
              </Typography>
            </MenuItem>
          </a>
          <a href='/console/committees' style={{ textDecoration: 'none' }}>
            <MenuItem style={{ padding: 30 }}>
              <Typography variant='h6' color='inherit' align='center' noWrap>
                Committees
              </Typography>
            </MenuItem>
          </a>
          <a href='/console/events' style={{ textDecoration: 'none' }}>
            <MenuItem style={{ padding: 30 }}>
              <Typography variant='h6' color='inherit' align='center' noWrap>
                Events
              </Typography>
            </MenuItem>
          </a>
        </MenuList>
      </div>
    )

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position='fixed' className={classes.appBar}>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='Open drawer'
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation='css'>
            <Drawer
              container={this.props.container}
              variant='permanent'
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {Dashboard}
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation='css'>
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant='permanent'
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    )
  }
}
ConsoleMenu.propTypes = {
  classes: PropTypes.isRequired,
  container: PropTypes.isRequired,
  theme: PropTypes,
  children: PropTypes,
}

export default withStyles(styles, { withTheme: true })(ConsoleMenu)
