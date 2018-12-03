import React from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  root: {
    flexGrow: 4,
  },
}

const Copyright = ({ classes }) => {
  console.log()
  return (
    <Typography
      variant='h6'
      className={classes.root}
    >
      &copy; 2018 TEXAS TECH ACM CHAPTER, ALL RIGHTS RESERVED
    </Typography>
  )
}

export default withStyles(styles)(Copyright)
