import React, { useState, useContext } from 'react'
import LoginForm from 'components/LoginForm.jsx'
import { ConnectionString } from 'context/ConnectionStringContext'
import * as axios from 'axios'

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

export function LoginContainer({ navigateTo, switchForm }) {
  const initState = {
    email: '',
    password: '',
    passwordError: null,
    loginError: null,
    loading: false,
  }

  const [loginFormValues, setLoginFormValues] = useState(initState)
  const connectionString = useContext(ConnectionString)

  const handleChangeValues = (newValue, valueToChange) => {
    const currentValues = { ...loginFormValues }
    currentValues[valueToChange] = newValue
    currentValues.loginError = null
    setLoginFormValues(currentValues)
  }

  const handleSubmit = () => {
    setLoginFormValues({
      ...loginFormValues,
      loading: true,
    })

    axios.post(`${connectionString}/auth/login`, loginFormValues)
      .then(({ data }) => {
        const token = data.token.split(' ')[1]
        localStorage.setItem('token', token)
        navigateTo('/events')
      })
      .catch((loginError) => {
        console.error(loginError)
        setLoginFormValues({
          ...loginFormValues,
          password: '',
          loginError,
          loading: false,
        })
      })
  }

  return (
    <LoginForm
      handleChangeValues={handleChangeValues}
      handleSubmit={handleSubmit}
      switchForm={switchForm}
      {...loginFormValues}
    />
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  navigateTo: (location) => {
    dispatch(push(location))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
