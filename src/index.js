import React from 'react' // eslint-disable-line
import ReactDOM from 'react-dom'
import './client/index.css'

import { AppContainer, setConfig } from 'react-hot-loader'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { red, black } from '@material-ui/core/colors'
import { Provider } from 'react-redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import rootReducer from 'redux/reducers.js'

import { ConnectionStringProvider } from 'context/ConnectionStringContext'
import App from 'App.jsx'
import logger from './utils/logger'

setConfig({
  pureSFC: true,
})

const {
  NODE_ENV,
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
function render() {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <ConnectionStringProvider>
            <App history={history} />
          </ConnectionStringProvider>
        </MuiThemeProvider>
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  )
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
