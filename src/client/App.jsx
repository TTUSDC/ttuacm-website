import React, { useContext } from 'react'
import { ConnectedRouter } from 'connected-react-router/immutable'
import { PropTypes } from 'prop-types'
import NavBar from 'pages/NavBar/NavBar.jsx'
import Footer from 'pages/Footer/Footer.jsx'
import { ConnectionString } from 'context/ConnectionStringContext'
import MaintenanceScreen from 'MaintenanceScreen.jsx'
import useEnvironment from 'hooks/useEnvironment'
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

  if (process.env.NODE_ENV === 'development') {
    // Changes this is you want to see the MaintenanceScreen
    return <Main history={history} />
  }
  const [env, err] = useEnvironment(connectionString)
  if (err) {
    return <MaintenanceScreen />
  } if (env.maintainance !== 'true') {
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
