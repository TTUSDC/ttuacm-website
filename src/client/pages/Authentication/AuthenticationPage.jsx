import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { navigate } from '@reach/router'
import Tech from 'assets/Tech.png'
import FirebaseAuthButtons from 'components/FirebaseAuthButtons'
import { withFirebase } from 'context/Firebase'
import firebase from 'firebase'
import useSnackbar from 'hooks/useSnackbar'
import PropTypes from 'prop-types'
import React, { useReducer } from 'react'

const styles = (theme) => ({
  main: {
    width: '86vw',
    minHeight: '73vh',
    margin: 'auto',
  },
  TechContainer: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    margin: 'auto',
  },
  Tech: {
    width: '100%',
  },
  Buttons: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  FormPrompts: {
    cursor: 'pointer',
    margin: '10px 0px',
  },
  SendEmailButton: {
    width: '60%',
  },
  EmailForm: {
    width: '60%',
  },
})

function reducer(state, { payload, type }) {
  switch (type) {
    case 'show-email':
      return { showEmailPrompt: true, email: '', err: null }
    case 'change-email':
      return { ...state, email: payload, err: null }
    case 'finish-send-email':
      return { showEmailPrompt: false, email: '', err: null }
    case 'error':
      return { ...state, err: payload }
    default:
      console.error('Bad action')
      return state
  }
}

const initState = {
  showEmailPrompt: false,
  email: '',
  err: null,
}

function AuthenticationPage({ classes = {} }) {
  const [state, dispatch] = useReducer(reducer, initState)
  const [SnackBar, enqueueSnackbar] = useSnackbar()
  const { isUserLoggedIn } = withFirebase()

  function handleEmailChange(e) {
    dispatch({ type: 'change-email', payload: e.target.value })
  }

  async function resetPassword() {
    try {
      await firebase.auth().sendPasswordResetEmail(state.email)
      dispatch({ type: 'finish-send-email' })
    } catch (err) {
      let message = 'Unknown Error'
      switch (err.code) {
        case 'auth/user-not-found':
          message = 'This user does not exist. Please register'
          break
        case 'auth/invalid-email':
          message = 'This is not a proper email'
          break
        default:
          break
      }
      enqueueSnackbar(message, 'error')
      dispatch({ type: 'error', payload: message })
    }
  }

  if (isUserLoggedIn) navigate('/')

  return (
    <Grid container spacing={24} className={classes.main}>
      <Grid item xs={12} md={4} className={classes.Buttons}>
        <Typography
          style={{ textAlign: 'center' }}
          variant='h3'
          component='h3'
          color='textPrimary'
        >
          Welcome!
        </Typography>
        <FirebaseAuthButtons />
        {state.showEmailPrompt ? (
          <React.Fragment>
            <TextField
              label='Email'
              className={classes.EmailForm}
              value={state.email}
              onChange={handleEmailChange}
              margin='normal'
            />
            <Button
              onClick={resetPassword}
              variant='contained'
              className={classes.SendEmailButton}
            >
              Send Email
            </Button>
            <Typography
              style={{ textAlign: 'center' }}
              className={classes.FormPrompts}
              variant='body2'
              color='textPrimary'
              onClick={() => dispatch({ type: 'finish-send-email' })}
            >
              Hide
            </Typography>
          </React.Fragment>
        ) : (
          <Typography
            style={{ textAlign: 'center' }}
            className={classes.FormPrompts}
            variant='body1'
            color='textPrimary'
            onClick={() => dispatch({ type: 'show-email' })}
          >
            Forgot Password?
          </Typography>
        )}
      </Grid>
      <Grid className={classes.TechContainer} item xs={8}>
        <img className={classes.Tech} src={Tech} alt='' />
      </Grid>
      <SnackBar />
    </Grid>
  )
}

AuthenticationPage.propTypes = {
  classes: PropTypes.shape({}),
}

export default withStyles(styles, { withTheme: true })(AuthenticationPage)
