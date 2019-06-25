import React from 'react'
import { render } from 'react-testing-library'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

import { WindowSizeProvider } from 'client/context/withWindowSize'
import { MockFirebaseProvider } from './MockFirebase'

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
      <MuiThemeProvider theme={theme}>
        <WindowSizeProvider>{children}</WindowSizeProvider>
      </MuiThemeProvider>
    </MockFirebaseProvider>
  )
  return render(children, { wrapper: MockProviders })
}
