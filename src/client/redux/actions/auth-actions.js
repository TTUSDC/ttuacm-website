export const AuthConsts = {
  TOGGLE_ERR: 'TOGGLE_ERR',
  TOGGLE_AUTH_STATE: 'TOGGLE_AUTH_STATE',
}

export function toggleAuthState(loggedIn) {
  return ({
    type: AuthConsts.TOGGLE_AUTH_STATE,
    payload: { loggedIn },
  })
}

export function toggleError(errMsg) {
  return ({
    type: AuthConsts.TOGGLE_ERR,
    payload: { errMsg },
  })
}
