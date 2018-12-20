import React, { useState, useContext } from 'react'
import RegistrationForm from 'components/RegistrationForm'
import { ConnectionString } from 'context/ConnectionStringContext'
import * as axios from 'axios'

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

function RegistrationContainer({ navigateTo, switchForm }) {
  const initState = {
    email: '',
    password: '',
    passwordError: null,
    confirmPassword: '',
    confirmPasswordError: null,
    graduationDate: '',
    registrationError: null,
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
    axios.post(`${connectionString}/auth/register`, { data: registrationFormValues })
      .then(({ data }) => {
        localStorage.setItem('token', data.token)
        // Redirect to Events Page
        navigateTo('/events')
      })
      .catch((registrationError) => {
        console.error(registrationError)
        setRegistrationFormValues({
          ...registrationFormValues,
          password: '',
          passwordError: null,
          confirmPasswordError: null,
          registrationError,
        })
      })
  }

  return (
    <RegistrationForm
      handleChangeValues={handleChangeValues}
      handleSubmit={handleSubmit}
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
