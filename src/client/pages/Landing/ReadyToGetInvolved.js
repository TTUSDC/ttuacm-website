import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@material-ui/styles'
import useWindowSize from 'hooks/useWindowSize'
import Button from '@material-ui/core/Button'

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

const getStyle = (theme, windowWidth) => {
  let textSize = theme.typography.h4
  let containerSize = '35vh'

  if (windowWidth < theme.breakpoints.values.sm) {
    textSize = theme.typography.h6
    containerSize = '30vh'
  }

  return {
    Container: {
      textAlign: 'center',
      height: containerSize,
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#666666',
      padding: '0px 40px',
    },
    Button: {
      marginTop: 35,
    },
    Text: {
      ...textSize,
      color: 'white',
      fontWeight: 'bold',
    },
  }
}

function ReadyToGetInvolved({ navigateTo }) {
  const theme = useTheme()
  const { width } = useWindowSize()
  const style = getStyle(theme, width)

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
        style={style.Button}
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
