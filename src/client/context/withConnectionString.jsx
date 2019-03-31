import React, { useContext } from 'react'

const ConnectionStringContext = React.createContext()

function useConnectionString() {
  const connectionString = useContext(ConnectionStringContext)
  if (!connectionString) {
    throw new Error('Cannot use `useConnectionString` outside of ConnectionStringProvider')
  }
  return connectionString
}

function ConnectionStringProvider(props) {
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
    <ConnectionStringContext.Provider value={connectionString} {...props} />
  )
}

export { useConnectionString, ConnectionStringProvider }
