import React from 'react'
import PropTypes from 'prop-types'

export class MockFirebase {
  /**
   * Password reset and update
   */
  resetPassword = (email) => () => console.log(email)

  updatePassword = (password) => console.log(password)

  /**
   * User info
   */
  isUserLoggedIn = (isLoggedIn) => isLoggedIn

  getUserEmail = (email) => email

  getUserName = (name) => name

  /**
   * Sign out
   */
  signOut = () => ({})
}

export function MockFirebaseProvider({ children = [], isLoggedIn = true }) {
  const FirebaseContext = React.createContext(null)

  return (
    <FirebaseContext.Provider
      value={{ firebase: new MockFirebase(), isUserLoggedIn: isLoggedIn }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}

MockFirebaseProvider.propTypes = {
  children: PropTypes.shape({}),
  isLoggedIn: PropTypes.bool,
}
