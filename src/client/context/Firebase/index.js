import React from 'react'
import PropTypes from 'prop-types'
import Firebase from './firebase'

const withFirebase = React.createContext(null);

function FirebaseProvider({ children = [] }) {
  return (
    <withFirebase.Provider value={new Firebase()}>
      {children}
    </withFirebase.Provider>
  )
}

FirebaseProvider.propTypes = {
  children: PropTypes.element,
}

export { withFirebase, FirebaseProvider }
