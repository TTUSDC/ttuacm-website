import React from 'react'

import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import PropTypes from 'prop-types'

/**
 * Basic Form Field
 */
const TextField = (props) => {
  const {
    title,
    hide,
    tag,
    error,
    onNewValue,
    currentValue,
  } = props

  const hasError = Boolean(error)

  return (
    <FormControl
      error={hasError}
    >
      <InputLabel htmlFor={tag}>{title}</InputLabel>
      <Input
        id={tag}
        value={currentValue}
        onChange={onNewValue(tag)}
        inputProps={{
          type: hide ? 'password' : null,
        }}
      />
      {/** Displays the error */}
      <FormHelperText id={`${tag}-error`} display={hasError ? 'none' : null}>
        {error}
      </FormHelperText>
    </FormControl>
  )
}

TextField.defaultProps = {
  hide: false,
  error: '',
}

TextField.propTypes = {
  title: PropTypes.string.isRequired,
  // Name of the value to change
  tag: PropTypes.string.isRequired,
  // Whether or not to hide the text inside the inputs
  hide: PropTypes.bool,
  // The role that is currently selected
  currentValue: PropTypes.string.isRequired,
  // A change handler for when the user changes value
  onNewValue: PropTypes.func.isRequired,
  // Whether or not there is an error
  error: PropTypes.string,
}

export default TextField
