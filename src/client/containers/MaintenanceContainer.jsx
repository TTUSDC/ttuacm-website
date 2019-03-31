import React, { useContext } from 'react'
import { PropTypes } from 'prop-types'
import { ConnectionString } from 'context/ConnectionStringContext'
import MaintenanceScreen from 'pages/Maintenance/MaintenanceScreen.jsx'
import useEnvironment from 'hooks/useEnvironment'
import Main from 'Main'


function MaintenanceContainer({ history }) {
  const connectionString = useContext(ConnectionString)
  const [env, err] = useEnvironment(connectionString)

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

MaintenanceContainer.propTypes = {
  history: PropTypes.shape({}),
}

export default MaintenanceContainer
