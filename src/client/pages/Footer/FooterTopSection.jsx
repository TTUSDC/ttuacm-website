import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import { withHref } from './FooterInfo'

const renderDescriptions = (
  classes,
  description,
  containsAppLink,
  containsOutLink,
  handleNavigation,
) =>
  description.map((item) => (
    <Typography
      className={classes.Description}
      key={item[0]}
      variant='body1'
      color='textSecondary'
      gutterBottom
      onClick={handleNavigation(item[0])}
    >
      {/*eslint-disable-line*/ containsOutLink
        ? withHref(classes, item[0], item[1])
        : containsAppLink
        ? item[1]
        : item}
    </Typography>
  ))

const styles = (theme) => ({
  // eslint-disable-line
  Title: {
    fontWeight: '500',
    marginBottom: '30px',
  },
  FooterALink: {
    color: 'rgba(255, 255, 255, 0.7)',
    textDecoration: 'none',
  },
  FooterTopSection: {
    minWidth: 225,
  },
  Description: {
    fontSize: '1rem',
    fontWeight: '300 !important',
  },
})

const FooterTopSection = ({
  title,
  description,
  containsAppLink,
  containsOutLink,
  handleNavigation,
  classes = {},
}) => (
  <Grid item xs key={title} className={classes.FooterTopSection}>
    <Typography
      variant='h5'
      color='textPrimary'
      gutterBottom
      className={classes.Title}
    >
      {title}
    </Typography>
    {renderDescriptions(
      classes,
      description,
      containsAppLink,
      containsOutLink,
      handleNavigation,
    )}
  </Grid>
)

FooterTopSection.propTypes = {
  classes: PropTypes.shape({}),
  title: PropTypes.string,
  description: PropTypes.node,
  containsAppLink: PropTypes.bool,
  containsOutLink: PropTypes.bool,
  handleNavigation: PropTypes.func.isRequired,
}

export default withStyles(styles)(FooterTopSection)
