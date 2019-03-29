import firebase from 'firebase'
import app from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../firebase_config.json'

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
    if (firebase.apps.length === 0)
      app.initializeApp(config);

    this.auth = app.auth();

    /**
     * 0Auth Providers
     */
    this.emailProvider = new app.auth.EmailAuthProvider();
    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.githubProvider = new app.auth.GithubAuthProvider();
  }

  // *** AUTH ***
    /**
     * Email and password
     */
    doCreateUserWithEmailAndPassword = (email, password) => // eslint-disable-next-line
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) => // eslint-disable-next-line
        this.auth.signInWithEmailAndPassword(email, password);

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

    /**
     * Google Login
     */
    doSignInWithGoogle = () =>
      this.auth.signInWithPopup(this.googleProvider);

    /**
     * Facebook Login
     */
    doSignInWithFacebook = () =>
      this.auth.signInWithPopup(this.facebookProvider);

    /**
     * GitHub Login
     */
    doSignInWithGitHub = () =>
      this.auth.signInWithPopup(this.githubProvider);

    /**
     * Sign out
     */
    doSignOut = () => this.auth.signOut();
}

export default Firebase;
