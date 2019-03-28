import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import GitHubIconLogoSrc from 'assets/svg/GitHub.svg'
import SlackIconLogoSrc from 'assets/svg/Slack.svg'
import FacebookIconLogoSrc from 'assets/svg/Facebook.svg'
import LinkIcon from './LinkIcon'

const styles = {
  socialIcons: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
}

const Links = ({ classes = {} }) => (
  <div className={classes.socialIcons}>
    <LinkIcon
      src={GitHubIconLogoSrc}
      alt='GitHub'
      linkTo='https://github.com/TTUSDC/'
    />
    <LinkIcon
      src={SlackIconLogoSrc}
      alt='Slack'
      linkTo='http://ttucs.slack.com'
    />
    <LinkIcon
      src={FacebookIconLogoSrc}
      alt='Facebook'
      linkTo='https://www.facebook.com/SDCTTU/'
    />
  </div>
)

Links.propTypes = {
  classes: PropTypes.shape({}),
}

export default withStyles(styles)(Links)
