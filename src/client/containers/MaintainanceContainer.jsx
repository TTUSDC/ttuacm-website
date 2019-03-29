import React, { useContext } from 'react'
import { PropTypes } from 'prop-types'
import { ConnectionString } from 'context/ConnectionStringContext'
import MaintenanceScreen from 'pages/Maintainance/MaintenanceScreen.jsx'
import useEnvironment from 'hooks/useEnvironment'
// import firebase from 'firebase'
import Main from 'Main'


function MaintainanceContainer({ history }) {
  const connectionString = useContext(ConnectionString)
  const [env, err] = useEnvironment(connectionString)

  // TODO(@madewithsmiles) retrive the firebase instance from the context
  // and use it in the maintenance container
  // if (firebase.apps.length === 0) firebase.initializeApp(config)

  if (err) {
    return <MaintenanceScreen />
  }

  if (process.env.NODE_ENV !== 'production') {
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
