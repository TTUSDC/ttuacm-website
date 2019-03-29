import React, { useState } from 'react'
import LoginContainer from 'containers/LoginContainer'
import RegistrationContainer from 'containers/RegistrationContainer'
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
  const [visibleForm, setVisibleForm] = useState('login')

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        {visibleForm === 'login' ? (
          <LoginContainer switchForm={setVisibleForm} />
        ) : (
          <RegistrationContainer switchForm={setVisibleForm} />
        )}

      </Paper>
      <OAuthContainer />
    </div>
  )
}

AuthenticationPage.propTypes = {
  classes: PropTypes.shape({}),
}

export default withStyles(styles)(AuthenticationPage)
