import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import OAuthContainer from 'containers/OAuthContainer'

const styles = (theme) => ({
  root: {
    ...theme.mixins.gutters(),
    display: 'flex',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
})

function AuthenticationPage({ classes = {} }) {
  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <OAuthContainer />
      </Paper>
    </div>
  )
}

AuthenticationPage.propTypes = {
  classes: PropTypes.shape({}),
}

export default withStyles(styles)(AuthenticationPage)
