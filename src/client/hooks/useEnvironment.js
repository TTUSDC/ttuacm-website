import { useState, useEffect } from 'react'
import axios from 'axios'

const devEnv = {
  env: 'dev',
  maintainance: false,
  session_secret: 'Whatever',
}

/**
 * Calls the environment provider to get all of the secrets from the API
 *
 * Other Secrets
 *
 * - maintainance: whether or not the app should be in maintainance mode or not
 * - session_secret: session secret for decrypting JWTs
 * - host: URL of API
 * - protocol: protocol of API
 *
 */
export default function useEnvironment(connectionString) {
  const [env, setEnv] = useState({})
  const [err, setErr] = useState(null)

  useEffect(() => {
    async function fetchEnv() {
      if (process.env.NODE_ENV !== 'production') {
        setEnv(devEnv)
        setErr(null)
      } else {
        try {
          const { data } = await axios.get(`${connectionString}/environment`)
          const environment = data
          setEnv(environment)
        } catch (error) {
          console.error(error)
          setErr(error)
        }
      }
    }

    fetchEnv()
  }, [connectionString])

  return [env, err]
}
