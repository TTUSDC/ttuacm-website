import PropTypes from 'prop-types'
import React from 'react'

import Auth from './Auth.jsx'

/**
 * Handles requests to the server during production and fetching mocks in development
 */
class AuthContainer extends React.Component {
  state = {
    // Login Error
    logErr: '',
    // Registration Error
    regErr: '',
    // Flag for when we are waiting for an async request to finish
    waiting: false,
  }

  /**
   * Handles login form submission
   */
  handleLogin = () => {
    console.log(this.state)
    return null
  }

  /**
   * Handle register form submission
   */
  handleRegister = () => {
    console.log(this.state)
    return null
  }

  /**
   * Render
   */
  render() {
    return (
      <Auth
        handleRegister={this.handleRegister}
        handleLogin={this.handleLogin}
        authCancelled={this.props.authCancelled}
        regErr={this.state.regErr}
        logErr={this.state.logErr}
        waiting={this.state.waiting}
      />
    )
  }
}

AuthContainer.propTypes = {
  authCancelled: PropTypes.func.isRequired,
}

export default AuthContainer
