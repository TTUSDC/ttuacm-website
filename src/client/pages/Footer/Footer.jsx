import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import FooterBottom from './FooterBottom.jsx'
import FooterTop from './FooterTop.jsx'

const styles = (theme) => ({
  footer: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
})

const Footer = ({ classes = {} }) => (
  <footer className={classes.footer}>
    <FooterTop />
    <FooterBottom />
  </footer>
)

Footer.propTypes = {
  classes: PropTypes.shape({}),
}

export default withStyles(styles, { withTheme: true })(Footer)
