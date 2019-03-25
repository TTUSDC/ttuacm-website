import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@material-ui/styles'
import useWindowSize from 'hooks/useWindowSize'
import Button from '@material-ui/core/Button'
import Background from 'assets/home_page/Blur.png'

import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import getStyle from './ReadyToGetInvolved.styles'

function ReadyToGetInvolved({ navigateTo }) {
  const theme = useTheme()
  const { width } = useWindowSize()
  const style = getStyle(theme, width, Background)

  const handleNav = () => {
    window.scrollTo(0, 0)
    navigateTo('/auth')
  }

  return (
    <div style={style.Container}>
      <p style={style.Text}>
        CREATE YOUR ACCOUNT AND JOIN US IN OUR ACTIVITIES
      </p>
      <Button
        variant='contained'
        onClick={() => handleNav()}
        color='primary'
        style={style.Button}
        size='large'
      >
        JOIN US
      </Button>
    </div>
  )
}

ReadyToGetInvolved.propTypes = {
  navigateTo: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  navigateTo: (location) => {
    dispatch(push(location))
  },
})

export default connect(
  () => ({}),
  mapDispatchToProps,
)(ReadyToGetInvolved)
