import React from 'react' // eslint-disable-line
import ReactDOM from 'react-dom'
import './client/index.css'
import * as axios from 'axios'
import 'typeface-roboto'

import { AppContainer, setConfig } from 'react-hot-loader'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import { Provider } from 'react-redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import rootReducer from 'redux/reducers.js'

import { ConnectionStringProvider } from 'context/ConnectionStringContext'
import { WindowSizeProvider } from 'context/withWindowSize'
import MaintainanceContainer from 'containers/MaintainanceContainer.jsx'
import logger from './utils/logger'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

setConfig({
  pureSFC: true,
})

const { NODE_ENV } = process.env

if (NODE_ENV === 'development') logger.info('In development mode')

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#D63333',
    },
    secondary: red,
  },
})

const history = createBrowserHistory()

const store = createStore(
  connectRouter(history)(rootReducer),
  composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history))),
)

/**
 * Root of Component Tree
 * Router - connected-react-router
 * Theme - Material UI
 * ConnectionString
 */
function render() {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <ConnectionStringProvider>
            <WindowSizeProvider>
              <MaintainanceContainer history={history} />
            </WindowSizeProvider>
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
  module.hot.accept('./client/containers/MaintainanceContainer.jsx', () => {
    render()
  })

  // Reload reducers
  module.hot.accept('./client/redux/reducers.js', () => {
    store.replaceReducer(rootReducer(history))
  })
}
