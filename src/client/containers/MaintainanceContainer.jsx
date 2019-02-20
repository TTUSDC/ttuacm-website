import React, { useContext } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { PropTypes } from 'prop-types'
import { ConnectionString } from 'context/ConnectionStringContext'
import MaintenanceScreen from 'pages/Maintainance/MaintenanceScreen.jsx'
import useEnvironment from 'hooks/useEnvironment'
import firebase from 'firebase'
import Main from 'Main'

const MaintainanceContainer = ({ history }) => {
  const connectionString = useContext(ConnectionString)
  const [env, err] = useEnvironment(connectionString)

  // Initialize the Firebase App, but only do it if it has not been initialized before
  if (Object.keys(env).length) {
    const config = {
      apiKey: env.firebase.api_key,
      authDomain: env.firebase.auth_domain,
      databaseURL: env.firebase.database_url,
      projectId: env.firebase.project_id,
      storageBucket: env.firebase.storage_bucket,
      messagingSenderId: env.firebase.message_sender_id,
    }

    if (firebase.apps.length === 0) firebase.initializeApp(config)
  } else {
    // TODO: Make the loading more beautiful
    return <CircularProgress />
  }

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
