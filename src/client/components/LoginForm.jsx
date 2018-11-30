import PropTypes from 'prop-types'
import React from 'react'

import Button from '@material-ui/core/Button'

import { withStyles } from '@material-ui/core/styles'

import FormStyles from 'client/components/styles/FormStyles'

import TextField from 'client/components/TextField.jsx'

export class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
  }

  handleInputChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    })
  }

  handleSubmit = () => {
    this.props.handleLogin(this.state.email, this.state.password)
  }

  render() {
    const { logErr, classes, waiting } = this.props
    const { email, password } = this.state

    return (
      <form className={classes.container} noValidate autoComplete='off'>
        <TextField
          title='Email'
          tag='email'
          currentValue={email}
          onNewValue={this.handleInputChange}
        />
        <TextField
          hide
          title='Password'
          tag='password'
          currentValue={password}
          onNewValue={this.handleInputChange}
          error={logErr}
        />
        <Button
          id='login-button'
          className={classes.button}
          fullWidth
          variant='contained'
          color='primary'
          disabled={waiting}
          onClick={this.handleSubmit}
        >
          Login
        </Button>
      </form>
    )
  }
}

LoginForm.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  handleLogin: PropTypes.func.isRequired,
  logErr: PropTypes.string.isRequired,
  waiting: PropTypes.bool.isRequired,
}

export default withStyles(FormStyles)(LoginForm)
