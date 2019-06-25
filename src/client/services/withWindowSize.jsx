import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'

const withWindowSize = React.createContext()

function WindowSizeProvider({ children = [] }) {
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return (
    <withWindowSize.Provider value={{ width, height }}>
      {children}
    </withWindowSize.Provider>
  )
}

WindowSizeProvider.propTypes = {
  children: PropTypes.element,
}

function useWindowSize() {
  const ctx = useContext(withWindowSize)

  if (!ctx) {
    throw new Error('Cannot use `useWindowSize` outside of Provider')
  }

  return ctx
}

export default useWindowSize
export { withWindowSize, WindowSizeProvider }
