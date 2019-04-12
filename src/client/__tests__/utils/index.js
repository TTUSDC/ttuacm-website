import React from 'react'
import { render } from 'react-testing-library'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { Provider as ReduxProvider } from 'react-redux'
import { createBrowserHistory } from 'history'

import { WindowSizeProvider } from 'context/withWindowSize'
import { store } from 'redux/store'
import { MockFirebaseProvider } from './MockFirebase'

const history = createBrowserHistory()

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
})

export function renderComponent(
  children,
  { isLoggedIn } = { isLoggedIn: false },
) {
  const MockProviders = () => (
    <MockFirebaseProvider isLoggedIn={isLoggedIn}>
      <ReduxProvider store={store(history)}>
        <MuiThemeProvider theme={theme}>
          <WindowSizeProvider>{children}</WindowSizeProvider>
        </MuiThemeProvider>
      </ReduxProvider>
    </MockFirebaseProvider>
  )
  return render(children, { wrapper: MockProviders })
}
