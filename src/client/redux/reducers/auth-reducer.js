import IM from 'immutable'
import assert from 'assert'
import { AuthConsts } from 'redux/actions/auth-actions'

const initialState = IM.fromJS({
  loading: false,
  isLoggedIn: false,
  errorMsg: '',
})

const AuthReducer = (state = initialState, action) => {
  let newState = state
  switch (action.type) {
    case AuthConsts.TOGGLE_AUTH_STATE:
      newState = state.set(
        'isLoggedIn',
        ['true', true].includes(action.payload.isLoggedIn),
      )
      break
    default:
      break
  }

  assert.ok(IM.Map.isMap(newState), 'You did not pass back an immutable object')

  return newState
}

export default AuthReducer
