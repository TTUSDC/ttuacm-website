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

  useEffect(() => {
    if (token) {
      try {
        const { data: user } = jwtDecode(token)
        setCurrentUser(user)
      } catch (decodeError) {
        console.error(token)
        console.error(decodeError)
        localStorage.setItem('token', undefined)
        setError(new Error('Bad Token'))
        setCurrentUser(null)
      }
    }
  }, [token])

  return [error, Boolean(currentUser), currentUser]
}
