import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Firebase from './firebase'

const withFirebase = React.createContext(null)

function FirebaseProvider({ children = [] }) {
  // Used because Firebase may not finish initializing
  // Must listen for the auth state change and change states appropriately
  const [loggedIn, setLoggedIn] = useState(false)
  const firebase = new Firebase()
  firebase.auth.onAuthStateChanged((user) => {
    setLoggedIn(user !== null)
  })

  return (
    <withFirebase.Provider
      value={{ firebase: new Firebase(), isUserLoggedIn: loggedIn }}
    >
      {children}
    </withFirebase.Provider>
  )
}

FirebaseProvider.propTypes = {
  children: PropTypes.element,
}

export { withFirebase, FirebaseProvider }
