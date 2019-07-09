import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import { withFirebase } from 'client/services/withFirebase'
import PropTypes from 'prop-types'
import React from 'react'

import TeamCard from './TeamCard'

const styles = () => ({
  Container: {
    textAlign: 'center',
    width: '86vw',
  },
})

function TeamsList({ teams, classes }) {
  const { isUserLoggedIn } = withFirebase()

  const teamCards = teams.map((team, i) => (
    <Grid
      key={`${team.name}-${i + 1}`}
      item
      xs={12}
      sm={6}
      md={4}
      style={{ textAlign: 'left' }}
    >
      <TeamCard {...team} preventJoin={!isUserLoggedIn} />
    </Grid>
  ))

  return (
    <Grid
      container
      spacing={24}
      justify='space-between'
      alignItems='flex-start'
      className={classes.Container}
    >
      {teamCards}
    </Grid>
  )
}

TeamsList.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.shape({})),
  classes: PropTypes.shape({}),
}

TeamsList.defaultProps = {
  classes: {},
}

export default withStyles(styles)(TeamsList)
