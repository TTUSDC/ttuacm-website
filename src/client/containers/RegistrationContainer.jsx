import React, { useState, useContext } from 'react'
import RegistrationForm from 'components/RegistrationForm'
import { ConnectionString } from 'context/ConnectionStringContext'
import * as axios from 'axios'

import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import qs from 'querystring'

export function checkForErrors({ email = '', password = '', confirmPassword = '' }) {
  const currentErrors = { }

  // Email Error handling
  let emailErrorMsg = ''
  if(email === '') {
    emailErrorMsg = '';
  } else if(/@ttu.edu$/.test(email) !== true) {
    emailErrorMsg = 'Please use a TTU email address.';
  }

  currentErrors.emailError = emailErrorMsg !== ''
    ? new Error(emailErrorMsg)
    : null

  // Password Error handling, ordered by importance
  let passwordErrorMsg = ''
  if (password === '') {
    passwordErrorMsg = ''
  } else if (/^[\x00-\x7F]+$/.test(password) !== true) {
    // ASCII only
    passwordErrorMsg = 'Please use only ASCII characters.';
  } else if(password.length < 8) {
    // 8 characters long
    passwordErrorMsg = 'Please use at least 8 characters.';
  } else if(/[A-Z]/.test(password) !== true) {
    // 1 uppercase
    passwordErrorMsg = 'Please use at least one uppercase letter.';
  } else if(/[a-z]/.test(password) !== true) {
    // 1 lowercase
    passwordErrorMsg = 'Please use at least one lowercase letter.';
  } else if(/[0-9]/.test(password) !== true) {
    // 1 number
    passwordErrorMsg = 'Please use at least one number.';
  } else if(/[^A-Za-z0-9]/.test(password) !== true) {
    // 1 special character
    passwordErrorMsg = 'Please use at least one special character.';
  }

  currentErrors.passwordError = passwordErrorMsg !== ''
    ? new Error(passwordErrorMsg)
    : null

  let confirmPasswordErrorMsg = '';

  if (confirmPassword === '') {
    confirmPasswordErrorMsg = ''
  } else if (password === '' || confirmPassword === '') {
    confirmPasswordErrorMsg = '';
  } else if(password !== confirmPassword) {
    confirmPasswordErrorMsg = 'Please enter a matching password.';
  }

  currentErrors.confirmPasswordError = confirmPasswordErrorMsg !== ''
    ? new Error(confirmPasswordErrorMsg)
    : null

  return currentErrors
}

function RegistrationContainer({ navigateTo, switchForm }) {
  const initState = {
    firstName: '',
    lastName: '',
    email: '',
    emailError: null,
    password: '',
    passwordError: null,
    confirmPassword: '',
    confirmPasswordError: null,
    graduationDate: '',
    registrationError: null,
    loading: false,
  }

  const [registrationFormValues, setRegistrationFormValues] = useState(initState)
  const connectionString = useContext(ConnectionString)

  const handleChangeValues = (newValue, valueToChange) => {
    const currentValues = { ...registrationFormValues }
    currentValues[valueToChange] = newValue
    currentValues.loginError = null
    setRegistrationFormValues(currentValues)
  }

  const handleSubmit = () => {
    setRegistrationFormValues({
      ...registrationFormValues,
      loading: true,
    })
    axios.post(`${connectionString}/auth/register`, registrationFormValues)
      .then(({ data }) => {
        const querystring = qs.stringify({
          email: data.email,
          token: data.confirmEmailToken,
        })
        // Redirect to Verify Email Page
        navigateTo(`/verify?${querystring}`)
      })
      .catch((registrationError) => {
        console.error(registrationError)
        setRegistrationFormValues({
          ...registrationFormValues,
          password: '',
          passwordError: null,
          confirmPasswordError: null,
          registrationError,
          loading: false,
        })
      })
  }

  const handleErrors = () => {
    const currentErrors = checkForErrors(registrationFormValues)

    setRegistrationFormValues({
      ...registrationFormValues,
      ...currentErrors,
    })
  }

  return (
    <RegistrationForm
      handleChangeValues={handleChangeValues}
      handleSubmit={handleSubmit}
      checkForErrors={handleErrors}
      switchForm={switchForm}
      {...registrationFormValues}
    />
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  navigateTo: (location) => {
    dispatch(push(location))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer)
