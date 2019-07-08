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
  const [currentUser, setCurrentUser] = useState(null)
  let defaultFirebase = firebase
  if (!defaultFirebase) {
    defaultFirebase = new Firebase()
  }

  // When a new user is logged in, we want to make sure that they have
  // a profile in the database that is separate from their Firebase Auth
  // information. We use the Firebase UID as the UID in the profile
  defaultFirebase.auth.onAuthStateChanged(async (user) => {
    setEmailVerified(!!user && user.emailVerified)
    setLoggedIn(!!user)
    setCurrentUser(user)
    if (!['development', 'test'].includes(process.env.NODE_ENV) && user) {
      try {
        // eslint-disable-next-line prefer-const
        let [firstName, ...lastName] = user.displayName.split(' ')
        lastName = lastName.join(' ')

        await axios.post(`${getEndpoint()}/members/${user.uid}`, {
          firstName,
          lastName,
        })
      } catch (err) {
        console.error(err)
      }
    }
  })

  return (
    <FirebaseContext.Provider
      value={{
        currentUser,
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
