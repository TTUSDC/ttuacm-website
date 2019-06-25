import './client/index.css'
import 'typeface-roboto'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import MaintenanceContainer from 'client/containers/MaintenanceContainer.jsx'
import { FirebaseProvider } from 'client/context/Firebase'
import { WindowSizeProvider } from 'client/context/withWindowSize'
import React from 'react'
import ReactDOM from 'react-dom'

if (process.env.NODE_ENV !== 'production') console.log('In development mode')

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#D63333',
    },
    secondary: {
      main: '#253F51',
    },
  },
})

const rootEl = document.getElementById('root')

/**
 * Context needed for test:
 * - FirebaseProvider
 * - MuiThemeProvider
 * - WindowSizeProvider
 */
const render = (Component) => {
  ReactDOM.render(
    <FirebaseProvider>
      <MuiThemeProvider theme={theme}>
        <WindowSizeProvider>
          <Component />
        </WindowSizeProvider>
      </MuiThemeProvider>
    </FirebaseProvider>,
    rootEl,
  )
}

render(MaintenanceContainer)

if (module.hot) {
  // Reload components
  module.hot.accept('./client/containers/MaintenanceContainer.jsx', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./client/containers/MaintenanceContainer.jsx')
      .default
    render(NextApp)
  })
}
