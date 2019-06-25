import axios from 'axios'
import { getEndpoint } from 'client/services/useEndpoint'
import PropTypes from 'prop-types'
import React, { useContext, useState } from 'react'

import Firebase from './firebase'

export const FirebaseContext = React.createContext(null)

function withFirebase() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const firebase = useContext(FirebaseContext)
  if (!firebase)
    throw new Error('Cannot use `withFirebase` outside of Provider')

  return firebase
}

function FirebaseProvider({ children = [], firebase }) {
  // Used because Firebase may not finish initializing
  // Must listen for the auth state change and change states appropriately
  const [loggedIn, setLoggedIn] = useState(false)
  const [emailVerified, setEmailVerified] = useState(true)
  let defaultFirebase = firebase
  if (!defaultFirebase) {
    defaultFirebase = new Firebase()
  }

  defaultFirebase.auth.onAuthStateChanged(async (user) => {
    setEmailVerified(!!user && user.emailVerified)
    setLoggedIn(!!user)
    if (
      !['development', 'test'].includes(process.env.NODE_ENV) &&
      user &&
      user.emailVerified
    ) {
      try {
        await axios.post(`${getEndpoint()}/users`, {
          email: user.email,
        })
      } catch (err) {
        console.error(err)
      }
    }
  })

  return (
    <FirebaseContext.Provider
      value={{
        firebase: defaultFirebase,
        isUserLoggedIn: loggedIn,
        isVerified: emailVerified,
      }}
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
