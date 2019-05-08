import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Officers from './Officers'
import OfficerCard from './OfficerCard'

const styles = {
  Container: {
    textAlign: 'center',
    margin: '60px 0px',
    width: '100%',
  },
  Item: {
    margin: '60px 0px',
  },
}

function OfficerCardsList({ classes }) {
  return (
    <Grid
      container
      spacing={24}
      justify='center'
      alignItems='center'
      className={classes.Container}
    >
      {Officers.map((officer, i) => (
        <Grid
          className={classes.Item}
          item
          xs={12}
          sm={6}
          key={`officer-${i + 0}`}
        >
          <OfficerCard {...officer} />
        </Grid>
      ))}
    </Grid>
  )
}

OfficerCardsList.propTypes = {
  classes: PropTypes.shape({}),
}

export default withStyles(styles, { withTheme: true })(OfficerCardsList)
