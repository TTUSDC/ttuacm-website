import { useEffect, useReducer } from 'react'
import axios from 'axios'

const devEnv = {
  env: 'development',
  maintainance: false,
  session_secret: 'Whatever',
}

function reducer(state, action) {
  return action
}

/**
 * Calls the environment provider to get all of the secrets from the API
 *
 * Other Secrets
 *
 * - maintainance: whether or not the app should be in maintainance mode or not
 * - host: URL of API
 * - protocol: protocol of API
 *
 */
export default function useEnvironment(connectionString) {
  const [state, dispatch] = useReducer(reducer, { env: devEnv, err: null })

  useEffect(() => {
    async function fetchEnv() {
      if (process.env.NODE_ENV !== 'production') {
        dispatch({ env: devEnv, err: null })
      } else {
        try {
          const { data } = await axios.get(`${connectionString}/environment`)
          dispatch({ env: data, err: null })
        } catch (error) {
          console.error(error)
          dispatch({ env: devEnv, err: error })
        }
      }
    }

    fetchEnv()
  }, [connectionString])

  return [state.env, state.err]
}
