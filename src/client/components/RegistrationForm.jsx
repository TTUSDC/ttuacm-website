import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types'

export function hasErrors({
  email, emailError, password, passwordError, confirmPassword, confirmPasswordError, graduationDate,
}) {
  return (
    email === ''
    || password === ''
    || confirmPassword === ''
    || graduationDate === ''
    || emailError !== null
    || passwordError !== null
    || confirmPasswordError !== null
  )
}

/**
 * Presentation Component for the Registration Form
 *
 * @todo handle network errors with a snackbar
 */
const RegistrationForm = ({
  handleChangeValues,
  handleSubmit,
  checkForErrors,
  switchForm,
  email = '',
  emailError = null,
  password = '',
  passwordError = null,
  confirmPassword = '',
  confirmPasswordError = null,
  graduationDate = '',
  loading = false,
}) => (
  <div>
    <h1>Register</h1>
    <form
      id='registration-form'
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <TextField
        inputProps={{
          'data-testid': 'Email',
        }}
        label='Email'
        value={email}
        onChange={e => handleChangeValues(e.target.value, 'email')}
        onBlur={() => checkForErrors()}
        error={Boolean(emailError)}
        helperText={emailError ? emailError.message : ''}
      />
      <TextField
        inputProps={{
          'data-testid': 'Password',
        }}
        label='Password'
        type='password'
        value={password}
        onChange={e => handleChangeValues(e.target.value, 'password')}
        onBlur={() => checkForErrors()}
        error={Boolean(passwordError)}
        helperText={passwordError ? passwordError.message : ''}
      />
      <TextField
        inputProps={{
          'data-testid': 'ConfirmPassword',
        }}
        label='Confirm Your Password'
        type='password'
        value={confirmPassword}
        onChange={e => handleChangeValues(e.target.value, 'confirmPassword')}
        onBlur={() => checkForErrors()}
        error={Boolean(confirmPasswordError)}
        helperText={confirmPasswordError ? confirmPasswordError.message : ''}
      />
      <TextField
        inputProps={{
          'data-testid': 'GraduationDate',
        }}
        label='Graduation Date'
        value={graduationDate}
        type='date'
        onChange={e => handleChangeValues(e.target.value, 'graduationDate')}
        onBlur={() => checkForErrors()}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button
        data-testid='registration-submit-button'
        type='submit'
        disabled={
          hasErrors({
            email, password, confirmPassword, graduationDate, emailError, passwordError, confirmPasswordError,
          } || loading)
        }
        variant='contained'
        color='primary'
      >
        {
          loading
            ? <CircularProgress color='secondary' data-testid='sign-up-loading-spinner' />
            : 'Sign Up'
        }
      </Button>
      <Button
        onClick={() => switchForm('login')}
        data-testid='switch-to-login'
        color='primary'
      >
          Already have an account?
      </Button>
    </form>
  </div>
)

RegistrationForm.propTypes = {
  handleChangeValues: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  checkForErrors: PropTypes.func.isRequired,
  switchForm: PropTypes.func.isRequired,
  email: PropTypes.string,
  emailError: PropTypes.shape({}),
  password: PropTypes.string,
  passwordError: PropTypes.shape({}),
  confirmPassword: PropTypes.string,
  confirmPasswordError: PropTypes.shape({}),
  graduationDate: PropTypes.string,
  registrationError: PropTypes.shape({}),
  loading: PropTypes.bool,
}

export default RegistrationForm
