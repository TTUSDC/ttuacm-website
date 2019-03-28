import * as React from 'react'
import PropTypes from 'prop-types'

const ConnectionString = React.createContext()

function ConnectionStringProvider({ children = [] }) {
  let connectionString = `${
    process.env.REACT_APP_environment_connection
  }/api/v2`
  const { origin } = window.location
  if (origin === 'https://acm-texas-tech-web-app-2-beta.firebaseapp.com') {
    connectionString =
      'https://us-central1-acm-texas-tech-web-app-2-beta.cloudfunctions.net/api/v2'
  } else if (
    origin === 'https://acm-texas-tech-web-app-2.firebaseapp.com' ||
    origin.includes('acmttu')
  ) {
    connectionString =
      'https://us-central1-acm-texas-tech-web-app-2.cloudfunctions.net/api/v2'
  }

  return (
    <ConnectionString.Provider value={connectionString}>
      {children}
    </ConnectionString.Provider>
  )
}

ConnectionStringProvider.propTypes = {
  children: PropTypes.element,
}

const ConnectionStringConsumer = ConnectionString.Consumer

export { ConnectionString, ConnectionStringProvider, ConnectionStringConsumer }
