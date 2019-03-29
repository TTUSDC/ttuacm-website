import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TeamCard from './TeamCard'

const styles = () => ({
  Container: {
    textAlign: 'center',
    width: '86vw',
  },
})

function TeamsList({ teams, classes, isLoggedIn }) {
  const teamCards = teams.map((team, i) => (
    <Grid
      key={`${team.name}-${i + 1}`}
      item
      xs={12}
      sm={6}
      md={4}
      style={{ textAlign: 'left' }}
    >
      <TeamCard
        {...team}
        preventJoin={!isLoggedIn}
      />
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
  isLoggedIn: PropTypes.bool.isRequired,
}

TeamsList.defaultProps = {
  classes: {},
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.get('isLoggedIn'),
  }
}

export default connect(mapStateToProps, {})(withStyles(styles)(TeamsList))
