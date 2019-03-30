import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { withFirebase } from 'context/Firebase'
import { Route, Redirect } from 'react-router'

function AuthRoute({ path, component }) {
  const firebase = useContext(withFirebase)

  if (firebase.isUserLoggedIn()) {
    return <Redirect to='/' />
  }
  return <Route path={path} component={component} />
}


AuthRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.node.isRequired,
}

export default AuthRoute
