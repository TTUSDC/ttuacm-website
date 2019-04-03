import React from 'react'
import PropTypes from 'prop-types'
import MaintenanceScreen from 'pages/Maintenance/MaintenanceScreen.jsx'
import useEndpoint from 'hooks/useEndpoint'
import { useSnackbar } from 'notistack'
import Main from 'Main'

const devEnv = {
  env: 'development',
  maintainance: false,
}

function MaintenanceContainer({ history }) {
  const { enqueueSnackbar } = useSnackbar()
  const [err, loading, env] = useEndpoint(
    {
      path: '/environment',
    },
    devEnv,
  )

  if (loading) return <MaintenanceScreen />

  if (err) {
    console.error(err)
    enqueueSnackbar('Something went wrong...', { variant: 'error' })
    return <MaintenanceScreen />
  }

  // Changes this is you want to see the MaintenanceScreen
  if (process.env.NODE_ENV !== 'production') return <Main history={history} />

  if (env.maintainance !== 'true') return <Main history={history} />

  return <MaintenanceScreen />
}

MaintenanceContainer.propTypes = {
  history: PropTypes.shape({}),
}

export default MaintenanceContainer
