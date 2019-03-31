import { useReducer, useEffect } from 'react'
import axios from 'axios'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

const initState = {
  err: null,
  isLoading: false,
  data: [{}],
}

function reducer(state, action) {
  switch (action.type) {
    case 'start':
      return { err: null, isLoading: true, data: [{}] }
    case 'finish':
      return { err: null, isLoading: false, data: action.payload.data }
    case 'error':
      return { err: action.payload.error, isLoading: false, data: [{}] }
    default:
      throw new Error(`${action.type} unsupported`)
  }
}

export default function useEndpoint(
  { body = {}, method = 'get', headers = {}, params = {}, path = '/' },
  defaultOrDevelopmentValues,
) {
  if (process.env.NODE_ENV === 'development')
    return [null, false, defaultOrDevelopmentValues]
  const [state, dispatch] = useReducer(reducer, {
    ...initState,
    data: defaultOrDevelopmentValues,
  })

  // Checks where the client should connect to
  let connectionString = `${
    process.env.REACT_APP_environment_connection
  }/api/v2`
  const { origin } = window.location
  if (origin === 'https://acm-texas-tech-web-app-2-beta.firebaseapp.com') {
    connectionString =
      'https://us-central1-acm-texas-tech-web-app-2-beta.cloudfunctions.net/api/v2'
  } else if (
    origin === 'https://acm-texas-tech-web-app-2.firebaseapp.com' ||
    origin.includes('acmttu')
  ) {
    connectionString =
      'https://us-central1-acm-texas-tech-web-app-2.cloudfunctions.net/api/v2'
  }

  useEffect(() => {
    async function fetchData() {
      const instance = axios.create({
        baseURL: connectionString,
        url: path,
        method: method.toLowerCase(),
        headers,
        params,
        data: body,
      })

      dispatch({ type: 'start' })

      try {
        const { data } = await instance()
        dispatch({ type: 'finish', payload: { data } })
      } catch (err) {
        dispatch({ type: 'error', payload: { error: err } })
      }
    }

    fetchData()
  }, [])

  return [state.err, state.isLoading, state.data]
}
