import IM from 'immutable'
import assert from 'assert'
import { TeamsConsts } from 'redux/actions/teams-actions'

const initialState = IM.fromJS({
  loading: false,
  loggedIn: false,
  errorMsg: '',
})

const TeamsReducer = (state = initialState, action) => {
  let newState = state
  switch (action) {
    case TeamsConsts.TOGGLE_ERR:
      newState = state.set('errorMsg', action.payload.errorMsg)
      break
    default:
      break
  }

  assert.ok(IM.Map.isMap(newState), 'You did not pass back an immutable object')

  return newState
}

export default TeamsReducer
