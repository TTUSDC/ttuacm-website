import React from 'react' // eslint-disable-line
import ReactDOM from 'react-dom'
import './client/index.css'
import * as axios from 'axios'

import { AppContainer, setConfig } from 'react-hot-loader'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { red, black } from '@material-ui/core/colors'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router/immutable'

import { ConnectionStringProvider } from 'context/ConnectionStringContext'
import App from 'App.jsx'
import logger from './utils/logger'

import configureStore, { history } from './client/configureStore.js'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

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

const store = configureStore()
/**
 * Root of Component Tree
 * Router - connected-react-router/immutable
 * Theme = Material UI
 */
function render() {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={theme}>
            <ConnectionStringProvider>
              <App history={history} />
            </ConnectionStringProvider>
          </MuiThemeProvider>
        </ConnectedRouter>
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
}
