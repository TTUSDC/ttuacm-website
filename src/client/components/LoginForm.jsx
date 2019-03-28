import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types'

export function hasError({
  email = '',
  password = '',
  loginError = null,
  passwordError = null,
}) {
  return (
    email === '' ||
    password === '' ||
    loginError !== null ||
    passwordError !== null
  )
}

const LoginForm = ({
  handleChangeValues,
  handleSubmit,
  switchForm,
  email = '',
  password = '',
  passwordError = null,
  loginError = null,
  loading = false,
}) => (
  <div>
    <h1>Login</h1>
    <form
      data-testid='login-form'
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <TextField
        label='Email'
        inputProps={{
          'data-testid': 'Email',
        }}
        value={email}
        onChange={(e) => handleChangeValues(e.target.value, 'email')}
        error={Boolean(loginError)}
      />
      <TextField
        type='password'
        inputProps={{
          'data-testid': 'Password',
        }}
        label='Password'
        value={password}
        onChange={(e) => handleChangeValues(e.target.value, 'password')}
        error={Boolean(passwordError)}
        helperText={
          passwordError ? 'Incorrect username/password combination' : ''
        }
      />
      <Button
        data-testid='login-submit-button'
        disabled={
          hasError({
            email,
            password,
            loginError,
            passwordError,
          }) || loading
        }
        type='submit'
        variant='contained'
        color='primary'
      >
        {loading ? (
          <CircularProgress
            color='secondary'
            data-testid='login-loading-spinner'
          />
        ) : (
          'Login'
        )}
      </Button>
      <Button
        onClick={() => switchForm('registration')}
        data-testid='switch-to-registration'
        color='primary'
      >
        Create a new account
      </Button>
    </form>
  </div>
)

LoginForm.propTypes = {
  handleChangeValues: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  switchForm: PropTypes.func.isRequired,
  email: PropTypes.string,
  password: PropTypes.string,
  passwordError: PropTypes.shape({}),
  loginError: PropTypes.shape({}),
  loading: PropTypes.bool,
}

export default LoginForm
