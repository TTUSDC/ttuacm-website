import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { getEndpoint } from 'hooks/useEndpoint'
import Firebase from './firebase'

export const FirebaseContext = React.createContext(null)

function withFirebase() {
  const firebase = useContext(FirebaseContext)
  if (!firebase)
    throw new Error('Cannot use `withFirebase` outside of Provider')

  return firebase
}

function FirebaseProvider({ children = [], firebase }) {
  // Used because Firebase may not finish initializing
  // Must listen for the auth state change and change states appropriately
  const [loggedIn, setLoggedIn] = useState(false)
  let defaultFirebase = firebase
  if (!defaultFirebase) {
    defaultFirebase = new Firebase()
  }
  defaultFirebase.auth.onAuthStateChanged(async (user) => {
    setLoggedIn(user !== null)
    if (!['development', 'test'].includes(process.env.NODE_ENV) && user) {
      await axios.post(`${getEndpoint()}/users`, {
        email: user.email,
      })
    }
  })

  return (
    <FirebaseContext.Provider
      value={{ firebase: defaultFirebase, isUserLoggedIn: loggedIn }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}

FirebaseProvider.propTypes = {
  children: PropTypes.element,
  firebase: PropTypes.func,
}

export { withFirebase, FirebaseProvider }
