import React from 'react' // eslint-disable-line
import ReactDOM from 'react-dom'
import './client/index.css'
import 'typeface-roboto'

import { AppContainer, setConfig } from 'react-hot-loader'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { Provider as ReduxProvider } from 'react-redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import rootReducer from 'redux/reducers.js'

import { FirebaseProvider } from 'context/Firebase'
import { WindowSizeProvider } from 'context/withWindowSize'
import { SnackbarProvider } from 'notistack'

import MaintenanceContainer from 'containers/MaintenanceContainer.jsx'

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

const history = createBrowserHistory()

const store = createStore(
  connectRouter(history)(rootReducer),
  composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history))),
)

/**
 * Context needed for test:
 * - FirebaseProvider
 * - MuiThemeProvider
 * - WindowSizeProvider
 */
function render() {
  ReactDOM.render(
    <AppContainer>
      <SnackbarProvider
        maxSnack={3}
        preventDuplicate
        persist={false}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <FirebaseProvider>
          <ReduxProvider store={store}>
            <MuiThemeProvider theme={theme}>
              <WindowSizeProvider>
                <MaintenanceContainer history={history} />
              </WindowSizeProvider>
            </MuiThemeProvider>
          </ReduxProvider>
        </FirebaseProvider>
      </SnackbarProvider>
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

  // Reload reducers
  module.hot.accept('./client/redux/reducers.js', () => {
    store.replaceReducer(rootReducer(history))
  })
}
