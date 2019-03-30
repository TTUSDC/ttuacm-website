import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import OAuthContainer from 'containers/OAuthContainer'

const styles = (theme) => ({
  back: {
    backgroundColor: '#CCCCCC', // So we can play with the background
  },
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  root: {
    ...theme.mixins.gutters(),
    display: 'flex',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#253F51',
  },
  title: {
    [theme.breakpoints.down('xs')]: {
      ...theme.typography.h4,
    },
    fontWeight: 'bold',
    width: '70%',
    margin: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    display: 'flex',
    justifyContent: 'center',
  },
})

function AuthenticationPage({ classes = {} }) {
  return (
    <div className={classes.back}>
      <div className={classes.main}>
        <Paper className={classes.root} elevation={2}>
          <div className={classes.title}>
            <Typography
              variant='h3'
              component='h3'
              color='textPrimary'
            >
              SIGN IN
            </Typography>
          </div>
          <OAuthContainer />
        </Paper>
      </div>
    </div>
  )
}

AuthenticationPage.propTypes = {
  classes: PropTypes.shape({}),
}

export default withStyles(styles)(AuthenticationPage)
