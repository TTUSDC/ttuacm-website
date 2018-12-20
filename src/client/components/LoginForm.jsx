import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'

export default function LoginForm({
  handleChangeValues,
  handleSubmit,
  switchForm,
  email,
  password,
  loginError,
}) {
  const handleSubmitButtonClick = (e) => {
    e.preventDefault()
    handleSubmit()
  }

  const handleNewFormValue = target => e => handleChangeValues(e.target.value, target)

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmitButtonClick}>
        <TextField
          cypress='email'
          label='Email'
          value={email}
          onChange={handleNewFormValue('email')}
          error={Boolean(loginError)}
        />
        <TextField
          cypress='password'
          label='Password'
          value={password}
          onChange={handleNewFormValue('password')}
          error={Boolean(loginError)}
          helperText={loginError ? 'Incorrect username/password combination' : ''}
        />
        <Button cypress='login-submit-button' type='submit' variant='contained' color='primary'>
          Login
        </Button>
        <Button onClick={() => switchForm('registration')} cypress='switch-to-registration' color='primary'>
          Create a new account
        </Button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleChangeValues: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  switchForm: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  loginError: PropTypes.shape({}),
}
