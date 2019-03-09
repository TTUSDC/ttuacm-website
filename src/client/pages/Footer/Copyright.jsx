import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

const Copyright = ({ classes = {} }) => (
  <Typography
    variant='h6'
    className={classes.root}
  >
      &copy; 2018 TEXAS TECH ACM CHAPTER, ALL RIGHTS RESERVED
  </Typography>
)

Copyright.propTypes = {
  classes: PropTypes.shape({}),
}

export default Copyright
