import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Background from 'assets/home_page/Blur.png'

import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { withStyles } from '@material-ui/core/styles'
import styles from './ReadyToGetInvolved.styles'

function ReadyToGetInvolved({ navigateTo, classes }) {
  const handleNav = () => {
    window.scrollTo(0, 0)
    navigateTo('/auth')
  }

  return (
    <div
      className={classes.Container}
      style={{ backgroundImage: `url(${Background})` }}
    >
      <p className={classes.Text}>
        CREATE YOUR ACCOUNT AND JOIN US IN OUR ACTIVITIES
      </p>
      <Button
        variant='contained'
        onClick={() => handleNav()}
        color='primary'
        className={classes.Button}
        size='large'
      >
        JOIN US
      </Button>
    </div>
  )
}

ReadyToGetInvolved.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  classes: PropTypes.shape({}),
}

const mapDispatchToProps = (dispatch) => ({
  navigateTo: (location) => {
    dispatch(push(location))
  },
})

export default connect(
  () => ({}),
  mapDispatchToProps,
)(withStyles(styles, { withTheme: true })(ReadyToGetInvolved))
