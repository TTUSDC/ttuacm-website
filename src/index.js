import './client/index.css'
import 'typeface-roboto'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import MaintenanceContainer from 'containers/MaintenanceContainer.jsx'
import { FirebaseProvider } from 'context/Firebase'
import { WindowSizeProvider } from 'context/withWindowSize'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer, setConfig } from 'react-hot-loader'

// So that you can use hooks inside of react-hot-loader
setConfig({ pureSFC: true })

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

/**
 * Context needed for test:
 * - FirebaseProvider
 * - MuiThemeProvider
 * - WindowSizeProvider
 */
function render() {
  ReactDOM.render(
    <AppContainer>
      <FirebaseProvider>
        <MuiThemeProvider theme={theme}>
          <WindowSizeProvider>
            <MaintenanceContainer />
          </WindowSizeProvider>
        </MuiThemeProvider>
      </FirebaseProvider>
    </AppContainer>,
    document.getElementById('root'),
  )
}

render()

if (module.hot) {
  // Reload components
  module.hot.accept('./client/containers/MaintenanceContainer.jsx', () => {
    render()
  })
}
