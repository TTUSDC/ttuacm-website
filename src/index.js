import React from 'react' // eslint-disable-line
import ReactDOM from 'react-dom'
import axios from 'axios'


import App from 'App.jsx'
import MaintenanceScreen from 'MaintenanceScreen.jsx'
import logger from './utils/logger'

const {
  NODE_ENV,
  REACT_APP_environment_connection,
} = process.env

if (NODE_ENV === 'development') logger.info('In development mode')

function ConditionalRender(Component) { // eslint-disable-line
  ReactDOM.render(<Component />, document.getElementById('root'))
}

// If we are in a production environment,
// we will build without environment variables
const connectionString = (
  REACT_APP_environment_connection
  || 'https://acm-texas-tech-web-app-2.firebaseapp.com/environment/get-environment'
)

if (process.env.NODE_ENV === 'development') {
  // Changes this is you want to see
  // the MaintenanceScreen
  ConditionalRender(App)
} else {
  // Calls the firebase environment service to
  // grab the env variables and checks for maintainance
  axios.get(connectionString).then(({ data }) => {
    // If we are not undergoing maintainance
    if (data.maintainance !== 'true') {
      ConditionalRender(App)
    } else {
      ConditionalRender(MaintenanceScreen)
    }
  }).catch(() => {
    ConditionalRender(MaintenanceScreen)
  })
}
