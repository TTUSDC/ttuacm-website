import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const withBox = {
  border: 'solid white 2px',
}

const Navigation = ({
  classes, handleNavigation, currentPage, routes,
}) => (
  <React.Fragment>
    {
      routes.map((route, key) => (
        <Typography
          key={`${route[0]}-${key + 1}`}
          variant='h6'
          style={route[0] === currentPage ? withBox : {}}
          onClick={handleNavigation(`${route[0]}`)}
          className={classes.nav}
        >
          {route[1]}
        </Typography>
      ))
    }
  </React.Fragment>
)

const style = () => ({
  nav: {
    padding: '5px',
    margin: '0px 5px',
    width: '85px',
    textAlign: 'center',
  },
})

Navigation.propTypes = {
  handleNavigation: PropTypes.func.isRequired,
}

export default withStyles(style)(Navigation)
