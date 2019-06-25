import firebase from 'firebase'
import app from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from 'client/firebase_config.json'

const config = {
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  databaseURL: firebaseConfig.databaseURL,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  messagingSenderId: firebaseConfig.messageSenderId,
}

class Firebase {
  constructor() {
    if (firebase.apps.length === 0) app.initializeApp(config)

    this.auth = app.auth()

    /**
     * 0Auth Providers
     */
    this.emailProvider = new app.auth.EmailAuthProvider()
    this.googleProvider = new app.auth.GoogleAuthProvider()
    this.facebookProvider = new app.auth.FacebookAuthProvider()
    this.githubProvider = new app.auth.GithubAuthProvider()
  }

  /**
   * Password reset and update
   */
  resetPassword = (email) => this.auth.sendPasswordResetEmail(email)

  updatePassword(password) {
    if (this.auth.currentUser) {
      this.auth.currentUser.updatePassword(password)
    } else {
      throw new Error(
        'You just tried to update the password of a user that is not logged in',
      )
    }
  }

  /**
   * User info
   */
  isUserLoggedIn = () => this.auth.currentUser !== null

  getUserEmail() {
    if (this.auth.currentUser) return this.auth.currentUser.email

    return null
  }

  getUserName() {
    if (this.auth.currentUser) return this.auth.currentUser.displayName

    return null
  }

  /**
   * Sign out
   */
  signOut = () => this.auth.signOut()
}

export default Firebase
