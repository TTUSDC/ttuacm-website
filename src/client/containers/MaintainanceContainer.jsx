import React, { useContext } from 'react'
import { PropTypes } from 'prop-types'
import { ConnectionString } from 'context/ConnectionStringContext'
import MaintenanceScreen from 'pages/Maintainance/MaintenanceScreen.jsx'
import useEnvironment from 'hooks/useEnvironment'
import firebase from 'firebase'
import Main from 'Main'
import firebaseConfig from '../firebase_config.json'

function MaintainanceContainer({ history }) {
  const connectionString = useContext(ConnectionString)
  const [env, err] = useEnvironment(connectionString)

  // Initialize the Firebase App, but only do it if it has not been initialized before
  const config = {
    apiKey: firebaseConfig.apiKey,
    authDomain: firebaseConfig.authDomain,
    databaseURL: firebaseConfig.databaseURL,
    projectId: firebaseConfig.projectId,
    storageBucket: firebaseConfig.storageBucket,
    messagingSenderId: firebaseConfig.messageSenderId,
  }

  if (firebase.apps.length === 0) firebase.initializeApp(config)

  if (err) {
    console.error(err)
    return <MaintenanceScreen />
  }

  if (process.env.NODE_ENV === 'development') {
    // Changes this is you want to see the MaintenanceScreen
    return <Main history={history} />
  }

  if (env.maintainance !== 'true') {
    return <Main history={history} />
  }

  return <MaintenanceScreen />
}

MaintainanceContainer.propTypes = {
  history: PropTypes.shape({}),
}

export default MaintainanceContainer
