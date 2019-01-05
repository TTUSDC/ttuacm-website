import React from 'react'
import PropTypes from 'prop-types'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

function OAuthContainer({ navigateTo }) {
  function handleSignInOAuth(user) {
    console.log(user)
    if (!user) return

    localStorage.setItem('oauth_user', true)
    navigateTo('/home')
  }

  firebase.auth().onAuthStateChanged(handleSignInOAuth)

  // Firebase
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  }

  return (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  )
}

OAuthContainer.propTypes = {
  navigateTo: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  navigateTo: (location) => {
    dispatch(push(location))
  },
})

export default connect(() => ({}), mapDispatchToProps)(OAuthContainer)
