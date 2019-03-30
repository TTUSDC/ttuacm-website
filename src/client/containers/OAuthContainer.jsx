import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { withFirebase } from 'context/Firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

function OAuthContainer({ navigateTo }) {
  const firebase = useContext(withFirebase)

  function handleSignInOAuth(user) {
    if (!user) return

    navigateTo('/home')
  }

  firebase.auth.onAuthStateChanged(handleSignInOAuth)

  // Firebase
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    /**
     * Supported Authentication:
     * Email
     * Google
     * GitHub
     * Facebook
     * Local
     */
    signInOptions: [
      firebase.emailProvider.providerId,
      firebase.googleProvider.providerId,
      firebase.githubProvider.providerId,
      firebase.facebookProvider.providerId,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  }

  return (
    <StyledFirebaseAuth
      uiConfig={uiConfig}
      firebaseAuth={firebase.auth}
    />
  )
}

OAuthContainer.propTypes = {
  navigateTo: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  navigateTo: (location) => {
    dispatch(push(location))
  },
})

export default connect(
  () => ({}),
  mapDispatchToProps,
)(OAuthContainer)
