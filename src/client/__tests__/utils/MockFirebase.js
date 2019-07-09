import { FirebaseContext } from 'client/services/withFirebase'
import PropTypes from 'prop-types'
import React from 'react'

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

export function MockFirebaseProvider({ children = [], isLoggedIn = false }) {
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
