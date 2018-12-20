import React, { useState, useContext } from 'react'
import { ConnectionString } from 'context/ConnectionStringContext'
import LoginForm from 'components/LoginForm.jsx'
import * as axios from 'axios'

export default function LoginAuth() {
  const initState = {
    email: '',
    password: '',
    loginError: null,
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
    axios.post(`${connectionString}/auth/login`, { data: loginFormValues })
      .then(({ data }) => {
        localStorage.setItem('token', data.token)
      })
      .catch((loginError) => {
        console.error(loginError)
        setLoginFormValues({
          ...loginFormValues,
          password: '',
          loginError,
        })
      })
  }

  return (
    <LoginForm
      handleChangeValues={handleChangeValues}
      handleSubmit={handleSubmit}
      {...loginFormValues}
    />
  )
}
