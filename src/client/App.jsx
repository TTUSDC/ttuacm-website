import React, { useContext } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { ConnectedRouter } from 'connected-react-router/immutable'
import { PropTypes } from 'prop-types'
import NavBar from 'pages/NavBar/NavBar.jsx'
import Footer from 'pages/Footer/Footer.jsx'
import { ConnectionString } from 'context/ConnectionStringContext'
import MaintenanceScreen from 'MaintenanceScreen.jsx'
import useEnvironment from 'hooks/useEnvironment'
import firebase from 'firebase'
import Routes from 'Routes'

const Main = ({ history }) => (
  <React.Fragment>
    <NavBar />
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
    <Footer />
  </React.Fragment>
)

const App = ({ history }) => {
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
    return <CircularProgress />
  }

  if (process.env.NODE_ENV === 'development') {
    // Changes this is you want to see the MaintenanceScreen
    return <Main history={history} />
  }

  if (err) {
    console.error(err)
    return <MaintenanceScreen />
  }

  if (env.maintainance !== 'true') {
    return <Main history={history} />
  }

  return <MaintenanceScreen />
}

App.propTypes = {
  history: PropTypes.shape({}),
}

Main.propTypes = {
  history: PropTypes.shape({}),
}

export default App
