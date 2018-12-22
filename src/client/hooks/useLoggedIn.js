import { useState, useEffect } from 'react'
import * as jwtDecode from 'jwt-decode'

/**
 * Grabs the token from storage to check if the user is logged in or not
 *
 * @return [error, boolean for whether or not the user is logged in, current user]
 */
export default function useLoggedIn() {
  const [currentUser, setCurrentUser] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      let user = {}
      try {
        user = jwtDecode(token)
        setCurrentUser(user)
      } catch (decodeError) {
        localStorage.setItem('token', undefined)
        console.error(decodeError)
        setError(new Error('Bad Token'))
      }
    }
  })

  return [error, Boolean(currentUser), currentUser]
}
