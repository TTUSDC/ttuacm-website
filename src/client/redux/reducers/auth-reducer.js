import IM from 'immutable'
import assert from 'assert'
import { AuthConsts } from 'redux/actions/auth-actions'

const initialState = IM.fromJS({
  loading: false,
  loggedIn: false,
  errorMsg: '',
})


const AuthReducer = (state = initialState, action) => {
  let newState = state
  switch(action) {
    case(AuthConsts.TOGGLE_ERR):
      newState = state.set('errorMsg', action.payload.errorMsg)
      break
    default:
      break
  }

  assert.ok(IM.Map.isMap(newState), 'You did not pass back an immutable object')

  return newState
}

export default AuthReducer
