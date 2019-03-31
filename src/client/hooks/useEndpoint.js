import { useReducer } from 'react'
import { useConnectionString } from 'context/withConnectionString'
import axios from 'axios'

const initState = {
  err: null,
  isLoading: false,
  data: [{}],
}

function reducer(state, action) {
  switch(action.type) {
    case ('start'):
      return { err: null, isLoading: true, data: [{}] }
    case ('finish'):
      return { err: null, isLoading: false, data: action.payload.data }
    case ('error'):
      return { err: action.payload.error, isLoading: false, data: [{}] }
    default:
      throw new Error(`${action.type} unsupported`)
  }
}

export default function useEndpoint({ body = {}, method = 'get', headers = {}, params = {}, path = '/' }, defaultOrDevelopmentValues) {
  if (process.env.NODE_ENV === 'development') return [null, false, defaultOrDevelopmentValues]
  const connectionString = useConnectionString()

  const [state, dispatch] = useReducer(reducer, { ...initState, data: defaultOrDevelopmentValues })

  const instance = axios.create({
    baseURL: connectionString,
    url: path,
    method: method.toLowerCase(),
    headers,
    params,
    data: body,
  })

  // Start Fetch
  dispatch({ type: 'start' })

  instance().then(({ data }) => {
    dispatch({ type: 'finish', payload: { data } })
  }).catch((err) => {
    dispatch({ type: 'error', payload: { error: err } })
  })

  return [state.err, state.isLoading, state.data]
}
