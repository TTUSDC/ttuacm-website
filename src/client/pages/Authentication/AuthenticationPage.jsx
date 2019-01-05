import React, { useState, useContext, useEffect } from 'react'
import LoginContainer from 'containers/LoginContainer'
import RegistrationContainer from 'containers/RegistrationContainer'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase'
import { ConnectionString } from 'context/ConnectionStringContext'
import useEnvironment from 'hooks/useEnvironment'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
})

function handleSignInOAuth(user) {
  console.log(user)
}


function AuthenticationPage({ classes = {} }) {
  const [visibleForm, setVisibleForm] = useState('login')
  const [loading, setLoading] = useState(true)
  const [uiConfig, setUiConfig] = useState({})

  const connectionString = useContext(ConnectionString)
  const [env] = useEnvironment(connectionString)

  useEffect(() => {
    setLoading(true)
    if (!Object.keys(env).length) {
      setLoading(true)
      return null
    }


    firebase.auth().onAuthStateChanged(handleSignInOAuth)

    // Firebase
    setUiConfig({
      // Popup signin flow rather than redirect flow.
      signInFlow: 'popup',
      // We will display Google and Facebook as auth providers.
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false,
      },
    })

    setLoading(false)
  }, [env])

  return (
    <Paper className={classes.root} elevation={1}>
      {
        visibleForm === 'login'
          ? <LoginContainer switchForm={setVisibleForm} />
          : <RegistrationContainer switchForm={setVisibleForm} />
      }
      {
        loading ? null : <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      }
    </Paper>
  )
}

AuthenticationPage.propTypes = {
  classes: PropTypes.shape({}),
}

export default withStyles(styles)(AuthenticationPage)
