import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import qs from 'querystring'
import axios from 'axios'
import { ConnectionString } from 'context/ConnectionStringContext'
import CircularProgress from '@material-ui/core/CircularProgress'

function VerifyEmailContainer({ query, navigateTo }) {
  const [waiting, setWaiting] = useState(false)
  const connectionString = useContext(ConnectionString)
  let email
  let token

  const currentLocation = window.location.origin

  function resendEmail() {
    setWaiting(true)
    axios
      .post(`${connectionString}/email/confirm-email`, {
        email,
        token,
        redirectURLSuccess: `${currentLocation}/home`,
        fallback: `${currentLocation}/auth`,
      })
      .then(() => {
        // TODO show snackbar success
        setWaiting(false)
      })
      .catch((err) => {
        console.error(err)
        setWaiting(false)
      })
  }

  if (!query) {
    navigateTo('/')
    return null
  }

  email = qs.parse(query)['?email']
  token = qs.parse(query).token // eslint-disable-line
  return (
    <div>
      <h1>Check {email} for a verification email</h1>
      <Button
        data-testid='confirm-email-button'
        variant='contained'
        color='primary'
        onClick={() => resendEmail()}
      >
        {waiting ? (
          <CircularProgress data-testid='confirm-waiting-symbol' />
        ) : (
          'Resend Email'
        )}
      </Button>
    </div>
  )
}

VerifyEmailContainer.propTypes = {
  query: PropTypes.string,
  navigateTo: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  query: state.router.location.search,
})

const mapDispatchToProps = (dispatch) => ({
  navigateTo: (location) => {
    dispatch(push(location))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VerifyEmailContainer)
