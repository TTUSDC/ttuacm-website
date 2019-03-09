import IM from 'immutable'
import assert from 'assert'
import { EventsConsts } from 'redux/actions/events-actions'

const initialState = IM.fromJS({
  loading: false,
  events: [],
  errorMsg: '',
})

const EventsReducer = (state = initialState, action) => {
  let newState = state
  switch (action) {
    case EventsConsts.TOGGLE_ERR:
      newState = state.set('errorMsg', action.payload.errorMsg)
      break
    default:
      break
  }

  assert.ok(IM.Map.isMap(newState), 'You did not pass back an immutable object')

  return newState
}

export default EventsReducer
