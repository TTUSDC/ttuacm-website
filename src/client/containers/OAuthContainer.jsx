import React from 'react'
import { withFirebase } from 'context/Firebase'
import { getEndpoint } from 'hooks/useEndpoint'
import axios from 'axios'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

function createUserIfDoesNotExist(user) {
  if (!user.email || !user.emailVerified) return
  axios
    .post(`${getEndpoint()}/members`, { email: user.email })
    .catch((err) => console.error(err))
}

function OAuthContainer() {
  const { firebase } = withFirebase()

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
      signInSuccessWithAuthResult: (data) => {
        createUserIfDoesNotExist(data.user)
        return false
      },
    },
  }

  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth} />
}

export default OAuthContainer
