import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Cactus from 'assets/not_found_page/cactus.svg'

const styles = (theme) => ({
  Root: {
    minHeight: '86vh',
    [theme.breakpoints.up('md')]: {
      minHeight: '100vh',
    },
    color: 'white',
    textAlign: 'center',
    width: '86vw',
    alignSelf: 'center',
  },
  Number: {
    fontSize: '5rem',
    fontWeight: 'bold',
  },
  Message: {
    textAlign: 'left',
  },
  Item: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
})

const NotFoundPage = ({ classes }) => (
  <Grid container className={classes.Root} spacing={24}>
    <Grid className={classes.Item} item xs={12} sm={4}>
      <Typography className={classes.Number} variant='h1'>
        404
      </Typography>
    </Grid>
    <Grid item xs={12} sm={4} className={classes.Item}>
      <img src={Cactus} style={{ width: '100%' }} alt='Dead Cactus' />
    </Grid>
    <Grid item xs={12} sm={4} className={classes.Item}>
      <Typography className={classes.Message} variant='h5'>
        Segmentation Fault.
      </Typography>
    </Grid>
  </Grid>
)

NotFoundPage.propTypes = {
  classes: PropTypes.shape({}),
}

export default withStyles(styles)(NotFoundPage)
