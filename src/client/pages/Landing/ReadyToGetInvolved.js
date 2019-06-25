import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { navigate } from '@reach/router'
import Background from 'assets/home_page/Blur.png'
import PropTypes from 'prop-types'
import React from 'react'

import styles from './ReadyToGetInvolved.styles'

function ReadyToGetInvolved({ classes }) {
  const handleNav = () => {
    window.scrollTo(0, 0)
    navigate('/auth')
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
  classes: PropTypes.shape({}),
}

export default withStyles(styles, { withTheme: true })(ReadyToGetInvolved)
