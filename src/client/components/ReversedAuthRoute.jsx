import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router'
import { connect } from 'react-redux'

function ReversedAuthRoute({ isLoggedIn, path, component }) {
  if (isLoggedIn) {
    return <Redirect to='/' />
  }
  return <Route path={path} component={component} />
}

function mapStateToProps(state) {
  return ({
    isLoggedIn: state.auth.get('isLoggedIn'),
  })
}

ReversedAuthRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  component: PropTypes.node.isRequired,
}

export default connect(mapStateToProps, {})(ReversedAuthRoute)
