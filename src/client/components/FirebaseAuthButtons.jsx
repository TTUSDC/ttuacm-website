import React from 'react'
import { withFirebase } from 'context/Firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

const style = {
  main: {
    margin: 0,
  },
}

function FirebaseAuthButtons() {
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
      signInSuccessWithAuthResult: () => false,
    },
  }

  return (
    <StyledFirebaseAuth
      style={style.main}
      uiConfig={uiConfig}
      firebaseAuth={firebase.auth}
    />
  )
}

export default FirebaseAuthButtons
