import { useState, useEffect } from 'react'
import axios from 'axios'

/**
 * Calls the environment provider to get all of the secrets from the API
 *
 * Firebase Secrets Provided
 *
 * - auth_provider_x509_cert_url
 * - auth_uri
 * - client_x509_cert_url
 * - private_key
 * - private_key_id
 * - project_id
 * - token_uri
 * - client_email
 * - client_id
 * - type
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
    if (connectionString) {
      axios.get(`${connectionString}/environment`).then(({ data }) => {
        const environment = data
        setEnv(environment)
      }).catch((error) => {
        setErr(error)
      })
    }
  }, [])

  return [env, err]
}
