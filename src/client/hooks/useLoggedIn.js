import { useState, useEffect } from 'react'
import * as jwtDecode from 'jwt-decode'

/**
 * Grabs the token from storage to check if the user is logged in or not
 *
 * @return [error, boolean for whether or not the user is logged in, current user]
 */
export default function useLoggedIn() {
  const [currentUser, setCurrentUser] = useState(null)
  const [error, setError] = useState(null)

  const token = localStorage.getItem('token')
  const OAuthUser = localStorage.getItem('oauth_user')

  useEffect(() => {
    if (OAuthUser) {
      // TODO Should fetch the actual user from mongo
      setCurrentUser(OAuthUser[0])
    } else if (token) {
      try {
        const { data: user } = jwtDecode(token)
        setCurrentUser(user)
      } catch (decodeError) {
        console.error(token)
        console.error(decodeError)
        localStorage.removeItem('token')
        setError(new Error('Bad Token'))
        setCurrentUser(null)
      }
    } else {
      setCurrentUser(null)
    }
  }, [token, OAuthUser])

  return [error, Boolean(currentUser), currentUser]
}
