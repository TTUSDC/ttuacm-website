import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import FirebaseAuthButtons from 'components/FirebaseAuthButtons'
import Tech from 'assets/Tech.png'

const styles = (theme) => ({
  main: {
    width: '86vw',
    minHeight: '73vh',
    margin: 'auto',
  },
  TechContainer: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    margin: 'auto',
  },
  Tech: {
    width: '100%',
  },
  Buttons: {
    margin: 'auto',
  },
})

function AuthenticationPage({ classes = {} }) {
  return (
    <Grid container spacing={24} className={classes.main}>
      <Grid item xs={12} md={4} className={classes.Buttons}>
        <Typography
          style={{ textAlign: 'center' }}
          variant='h3'
          component='h3'
          color='textPrimary'
        >
          Welcome!
        </Typography>
        <FirebaseAuthButtons />
      </Grid>
      <Grid className={classes.TechContainer} item xs={8}>
        <img className={classes.Tech} src={Tech} alt='' />
      </Grid>
    </Grid>
  )
}

AuthenticationPage.propTypes = {
  classes: PropTypes.shape({}),
}

export default withStyles(styles, { withTheme: true })(AuthenticationPage)
