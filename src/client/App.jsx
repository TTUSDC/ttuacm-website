import React from 'react'
import { hot } from 'react-hot-loader'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { red, black } from '@material-ui/core/colors'
import { Provider } from 'react-redux'
import store from 'redux/store'

const style = {
  margin: 0,
  padding: 0,
  fontFamily: 'sans-serif',
}

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

/**
 * Root of Component Tree
 * Router - connected-react-router
 * Theme = Material UI
 */
const App = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <div style={{ style }}>ACM Texas Tech</div>
    </MuiThemeProvider>
  </Provider>
)

export default hot(module)(App)
