import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import Firebase from './firebase'

const FirebaseContext = React.createContext(null)

function withFirebase() {
  const firebase = useContext(FirebaseContext)
  if (!firebase)
    throw new Error('Cannot use `withFirebase` outside of Provider')

  return firebase
}

function FirebaseProvider({ children = [] }) {
  // Used because Firebase may not finish initializing
  // Must listen for the auth state change and change states appropriately
  const [loggedIn, setLoggedIn] = useState(false)
  const firebase = React.useMemo(() => new Firebase(), [])
  firebase.auth.onAuthStateChanged((user) => {
    setLoggedIn(user !== null)
  })

  return (
    <FirebaseContext.Provider value={{ firebase, isUserLoggedIn: loggedIn }}>
      {children}
    </FirebaseContext.Provider>
  )
}

FirebaseProvider.propTypes = {
  children: PropTypes.element,
}

export { withFirebase, FirebaseProvider }
