import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'

export default function RegistrationForm({
  handleChangeValues,
  handleSubmit,
  switchForm,
  email,
  password,
  passwordError,
  confirmPassword,
  confirmPasswordError,
  graduationDate,
  registrationError,
}) {
  const handleSubmitButtonClick = (e) => {
    e.preventDefault()
    handleSubmit()
  }

  const handleNewFormValue = target => e => handleChangeValues(e.target.value, target)

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmitButtonClick}>
        <TextField
          cypress='email'
          label='Email'
          value={email}
          onChange={handleNewFormValue('email')}
          error={Boolean(registrationError)}
        />
        <TextField
          cypress='password'
          label='Password'
          value={password}
          onChange={handleNewFormValue('password')}
          error={Boolean(passwordError)}
          helperText={passwordError}
        />
        <TextField
          cypress='confirmPassword'
          label='Confirm Your Password'
          value={confirmPassword}
          onChange={handleNewFormValue('confirmPassword')}
          error={Boolean(confirmPasswordError)}
          helperText={confirmPasswordError}
        />
        <TextField
          id='graduationDate'
          label='Graduation Date'
          value={graduationDate}
          type='date'
          onChange={handleNewFormValue('graduationDate')}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button cypress='login-submit-button' type='submit' variant='contained' color='primary'>
          Register
        </Button>
        <Button onClick={() => switchForm('login')} cypress='switch-to-registration' color='primary'>
          Already have an account?
        </Button>
      </form>
    </div>
  )
}

RegistrationForm.propTypes = {
  handleChangeValues: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  switchForm: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordError: PropTypes.shape({}),
  confirmPassword: PropTypes.string.isRequired,
  confirmPasswordError: PropTypes.shape({}),
  graduationDate: PropTypes.string.isRequired,
  registrationError: PropTypes.shape({}),
}
