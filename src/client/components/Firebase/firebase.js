import app from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../firebase_config.json'

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
    app.initializeApp(config);

    this.auth = app.auth();
  }

    // *** AUTH ***
    doCreateUserWithEmailAndPassword = (email, password) => // eslint-disable-next-line
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) => // eslint-disable-next-line
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}

export default Firebase;
