import React from 'react'
import Grid from '@material-ui/core/Grid'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import FooterTopSection from './FooterTopSection'
import { sections } from './FooterInfo'

const styles = ({
  FooterTop: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '95%',
    margin: '18px auto 30px',
  },
})

const FooterTop = ({ classes = {}, currentPage, navigateTo }) => {
  const handleNavigation = nextPage => () => {
    if (currentPage !== nextPage) {
      navigateTo(nextPage)
    }
  }

  return (
    <Grid container className={classes.FooterTop} spacing={32} direction='row'>
      {sections.map((
        {
          title, description, containsAppLink, containsOutsideLink,
        },
      ) => (
        <FooterTopSection
          key={title}
          title={title}
          description={description}
          handleNavigation={containsAppLink ? handleNavigation : () => {}}
          containsAppLink={containsAppLink}
          containsOutLink={containsOutsideLink}
        />
      ))}
    </Grid>
  )
}

FooterTop.propTypes = {
  classes: PropTypes.shape({}),
  currentPage: PropTypes.string.isRequired,
  navigateTo: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  currentPage: state.router.getIn(['location', 'pathname']),
})

const mapDispatchToProps = dispatch => ({
  navigateTo: (location) => {
    dispatch(push(location))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FooterTop))
