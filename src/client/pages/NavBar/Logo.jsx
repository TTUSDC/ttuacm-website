import React from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const Logo = ({ classes, handleNavigation, ...props }) => (
  <React.Fragment>
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
  </React.Fragment>
)

const styles = {
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

export default withStyles(styles)(Logo)
