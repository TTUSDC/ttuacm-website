/* eslint no-use-before-define: "off" */
import React, { useReducer } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'
import amber from '@material-ui/core/colors/amber'
import classNames from 'classnames'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/Warning'

const styles = (theme) => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
    color: 'white',
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
  },
})

useSnackbar.types = {
  showMessage: 'showMessage',
  closeMessage: 'closeMessage',
}

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
}

function reducer(state, action) {
  switch (action.type) {
    case useSnackbar.types.showMessage:
      return {
        open: true,
        message: action.payload.message,
        variant: action.payload.variant,
      }
    case useSnackbar.types.closeMessage:
      return { open: false, message: '', variant: 'info' }
    default:
      throw new Error(`Bad Action: ${action.type}`)
  }
}

export default function useSnackbar() {
  const [{ message, open, variant }, dispatch] = useReducer(reducer, {
    open: false,
    message: 'close',
    variant: 'info',
  })

  const handleClick = (msg, variantType) => {
    dispatch({ type: useSnackbar.types.closeMessage })
    dispatch({
      type: useSnackbar.types.showMessage,
      payload: { message: msg, variant: variantType },
    })
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    dispatch({ type: useSnackbar.types.closeMessage })
  }

  const Icon = variantIcon[variant]

  const CustomSnackbar = withStyles(styles)(({ classes }) => (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={1250}
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
    >
      <SnackbarContent
        message={
          <span id='client-snackbar' className={classes.message}>
            <Icon className={classNames(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        className={classNames(classes[variant])}
        action={[
          <IconButton
            key='close'
            aria-label='Close'
            color='inherit'
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  ))
  return [CustomSnackbar, handleClick, handleClose]
}
