import React from 'react'
import PropTypes from 'prop-types'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { Provider as ReduxProvider } from 'react-redux'
import { createBrowserHistory } from 'history'

import { WindowSizeProvider } from 'context/withWindowSize'
import { SnackbarProvider } from 'notistack'
import { store } from 'redux/store'
import { MockFirebaseProvider } from './MockFirebase'

const history = createBrowserHistory()

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
})

export default function AppContext({ children = [] }) {
  return (
    <SnackbarProvider
      maxSnack={3}
      preventDuplicate
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <MockFirebaseProvider>
        <ReduxProvider store={store(history)}>
          <MuiThemeProvider theme={theme}>
            <WindowSizeProvider>{children}</WindowSizeProvider>
          </MuiThemeProvider>
        </ReduxProvider>
      </MockFirebaseProvider>
    </SnackbarProvider>
  )
}

AppContext.propTypes = {
  children: PropTypes.element,
}
