import React from 'react' // eslint-disable-line
import ReactDOM from 'react-dom'
import axios from 'axios'
import './client/index.css'

import { AppContainer } from 'react-hot-loader'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { red, black } from '@material-ui/core/colors'
import { Provider } from 'react-redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import rootReducer from 'redux/reducers.js'

import MaintenanceScreen from 'MaintenanceScreen.jsx'
import App from './client/App.jsx'
import logger from './utils/logger'

const {
  NODE_ENV,
  REACT_APP_environment_connection,
} = process.env

if (NODE_ENV === 'development') logger.info('In development mode')

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'dark',
    primary: black,
    secondary: red,
  },
})

const history = createBrowserHistory()

const store = createStore(
  connectRouter(history)(rootReducer),
  composeWithDevTools(
    applyMiddleware(
      thunk,
      routerMiddleware(history),
    ),
  ),
)
/**
 * Root of Component Tree
 * Router - connected-react-router
 * Theme = Material UI
 */
const Index = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App history={history} />
    </MuiThemeProvider>
  </Provider>
)

function ConditionalRender(Component) { // eslint-disable-line
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  )
}

// If we are in a production environment,
// we will build without environment variables
const connectionString = (
  REACT_APP_environment_connection
  || 'https://acm-texas-tech-web-app-2.firebaseapp.com/api/v2/environment'
)

const render = () => {
  if (process.env.NODE_ENV === 'development') {
    // Changes this is you want to see
    // the MaintenanceScreen
    ConditionalRender(Index)
  } else {
    // Calls the firebase environment service to
    // grab the env variables and checks for maintainance
    axios.get(connectionString).then(({ data }) => {
      // If we are not undergoing maintainance
      if (data.maintainance !== 'true') {
        ConditionalRender(Index)
      } else {
        ConditionalRender(MaintenanceScreen)
      }
    }).catch(() => {
      ConditionalRender(MaintenanceScreen)
    })
  }
}

render()

if (module.hot) {
  // Reload components
  module.hot.accept('./client/App.jsx', () => {
    render()
  })

  // Reload reducers
  module.hot.accept('./client/redux/reducers.js', () => {
    store.replaceReducer(rootReducer(history))
  })
}
