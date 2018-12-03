import React from 'react'
import PropTypes from 'prop-types'
// import IconButton from '@material-ui/core/IconButton'
// import MenuIcon from '@material-ui/icons/Menu'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import Navigation from './Navigation.jsx'

const NavBar = (props) => {
  const handleNavigation = nextPage => () => {
    props.push(nextPage)
  }

  return (
    <Navigation
      handleNavigation={handleNavigation}
    />
  )
}

NavBar.propTypes = {
  push: PropTypes.func.isRequired,
}

export default connect(null, { push })(NavBar)
