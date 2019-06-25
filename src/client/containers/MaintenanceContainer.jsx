import Main from 'client/Main'
import useEndpoint from 'client/hooks/useEndpoint'
import MaintenanceScreen from 'client/pages/Maintenance/MaintenanceScreen.jsx'
import PropTypes from 'prop-types'
import React from 'react'

const devEnv = {
  env: 'development',
  maintainance: false,
}

function MaintenanceContainer() {
  const [err, loading, env] = useEndpoint(
    {
      path: '/environment',
    },
    devEnv,
  )

  if (loading) return <MaintenanceScreen />

  if (err) {
    console.error(err)
    return <MaintenanceScreen />
  }

  // Changes this is you want to see the MaintenanceScreen
  if (process.env.NODE_ENV !== 'production') return <Main />

  if (env.maintainance !== 'true') return <Main />

  return <MaintenanceScreen />
}

MaintenanceContainer.propTypes = {
  history: PropTypes.shape({}),
}

export default MaintenanceContainer
