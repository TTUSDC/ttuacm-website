import PropTypes from 'prop-types'
import React from 'react'
import logger from 'utils/logger.js'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

// Styles
import FormStyles from 'client/components/styles/FormStyles'

// Fields
import TextField from './TextField.jsx'

// Verification
import withInputValidation from './FormChecker.jsx'

/**
 * Registration form.
 * Contains:
 * - name
 * - email
 * - password
 * - confirm password
 * - classification
 */
export class RegisterForm extends React.Component {
  static propTypes = {
    // Handles a registration action
    handleRegister: PropTypes.func.isRequired,
    // Validation function to tell FormCheck what we are validating
    validate: PropTypes.func,

    // Styles
    classes: PropTypes.shape({}),

    // Registration/Network Error
    regErr: PropTypes.string.isRequired,
    // Email Error from FormChecker
    emailErr: PropTypes.string,
    // Password Error from FormChecker
    passErr: PropTypes.string,
    // Confirm Password Error from FormChecker
    confirmErr: PropTypes.string,

    // True: waiting for a network call to finish
    waiting: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    classes: {},
    emailErr: '',
    confirmErr: '',
    passErr: '',
    validate: () => logger.error('Validate not passed outside of test'),
  }

  state = {
    name: '',
    email: '',
    password: '',
    confirmPass: '',
    classification: '',
  }

  /**
   * Handles the changing values of the inputs
   * This is usually called in the TextFields in the form
   *
   * @param {string} name the name of the field to edit
   * @param {object} event event object for javascript
   */
  handleInputChange = name => (event) => {
    const { value } = event.target
    this.setState((prevState) => {
      const newState = prevState

      // Resets the confirmPass field
      if(name === 'password') {
        newState.confirmPass = ''
      }

      // Replace selected state with new value
      newState[name] = value

      this.props.validate(name, newState)

      return newState
    })
  }

  /**
   * Handles a submission while checking for errors
   *
   * - OnSuccess: Will call the handleRegister method passed to the component and return true
   * - OnFailure: Will return false
   *
   * @todo Add error handling through a modal instead of a console.error
   * @returns {boolean} returns a boolean value for ease in testing
   */
  handleSubmit = () => {
    const preventSubmit = (
      Boolean(this.props.regErr)
      || Boolean(this.props.emailErr)
      || Boolean(this.props.passErr)
      || Boolean(this.props.confirmErr)
      || this.state.password === ''
      || this.state.confirmPass === ''
      || this.state.name === ''
      || this.state.email === ''
    )

    // Checks for a preventSubmit flag
    if (preventSubmit === true) {
      logger.error(new Error('There are invalid values in the fields above'))
      return false
    }

    // Checks for a stalled server
    if (this.props.waiting === true) {
      logger.error(new Error('Server not ready'))
      return false
    }

    this.props.handleRegister({
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
    })
    return true
  }

  /**
   * Render
   *
   * @todo make the classification field a drop down
   */
  render() {
    const {
      name,
      email,
      password,
      confirmPass,
      classification,
    } = this.state

    const {
      emailErr,
      passErr,
      confirmErr,
      classes,
    } = this.props

    return (
      <form className={classes.container} noValidate autoComplete='off'>
        <TextField
          title='Name'
          tag='name'
          currentValue={name}
          onNewValue={this.handleInputChange}
          error=''
        />
        <TextField
          title='Email'
          tag='email'
          currentValue={email}
          onNewValue={this.handleInputChange}
          error={emailErr}
        />
        <TextField
          hide
          title='Password'
          tag='password'
          currentValue={password}
          onNewValue={this.handleInputChange}
          error={passErr}
        />
        <TextField
          hide
          title='Confirm Password'
          tag='confirmPass'
          currentValue={confirmPass}
          onNewValue={this.handleInputChange}
          error={confirmErr}
        />
        <TextField
          title='Classification'
          tag='classification'
          currentValue={classification}
          onNewValue={this.handleInputChange}
          error=''
        />
        <Button
          variant='raised'
          fullWidth
          color='primary'
          onClick={this.handleSubmit}
        >
          Sign Up
        </Button>
      </form>
    )
  }
}


export default withStyles(FormStyles)(withInputValidation(RegisterForm))
