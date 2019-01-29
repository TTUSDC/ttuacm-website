import * as jwtDecode from 'jwt-decode'

export const AuthConsts = {
  TOGGLE_ERR: 'TOGGLE_ERR',
  TOGGLE_AUTH_STATE: 'TOGGLE_AUTH_STATE',
}

export function toggleAuthState() {
  const token = localStorage.getItem('token')
  const OAuthUser = localStorage.getItem('oauth_user')

  let user

  if (OAuthUser) {
    user = OAuthUser
  } else if (token) {
    try {
      jwtDecode(token)
      user = true
    } catch (decodeErr) {
      console.error(token)
      console.error(decodeErr)
      localStorage.removeItem('token')
      user = false
    }
  } else {
    user = false
  }

  return ({
    type: AuthConsts.TOGGLE_AUTH_STATE,
    payload: { isLoggedIn: user },
  })
}
