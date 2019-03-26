import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const styles = theme => ({
  icon: {
    display: 'flex',
    alignSelf: 'center',
    margin: theme.spacing.unit, // * 0.5,
  },
})

const LinkIcon = ({
  classes = {}, src, alt, linkTo,
}) => (
  <div className={classes.icon}>
    <a href={linkTo} target='_blank' rel='noopener noreferrer'>
      <img src={src} alt={alt} height={24} width={24} />
    </a>
  </div>
)

LinkIcon.propTypes = {
  classes: PropTypes.shape({}),
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
}

export default withStyles(styles)(LinkIcon)
