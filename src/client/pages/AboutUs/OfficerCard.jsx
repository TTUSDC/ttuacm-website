import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import GithubCircleIcon from 'mdi-react/GithubCircleIcon'
import GmailIcon from 'mdi-react/GmailIcon'
import LinkedinBoxIcon from 'mdi-react/LinkedinBoxIcon'
import WebIcon from 'mdi-react/WebIcon'

const styles = (theme) => ({
  Paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  ProfilePicture: {
    width: '75%',
    borderRadius: '500px',
    transform: 'translate(0px, -75px)',
  },
  Info: {
    textAlign: 'left',
  },
  IconGroup: {
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: '15px 0px',
  },
  FunFacts: {
    margin: '15px 0px 0px 0px',
  },
})

function OfficerCard({
  description,
  Image,
  classes,
  name,
  role,
  socialLinks,
  funFacts,
}) {
  return (
    <Paper className={classes.Paper}>
      <img className={classes.ProfilePicture} src={Image} alt='' />
      <div className={classes.Info}>
        <Typography variant='h4'>{name}</Typography>
        <Typography variant='subtitle1'>{role}</Typography>
        <Typography variant='body1'>{description}</Typography>
        <Typography className={classes.FunFacts} variant='h4'>
          Fun Facts
        </Typography>
        <Typography variant='body1'>{funFacts[0]}</Typography>
        <Typography variant='body1'>{funFacts[1]}</Typography>
        <div className={classes.IconGroup}>
          <GmailIcon
            onClick={() => window.open(socialLinks.gmail, '_blank')}
            size={32}
          />
          <GithubCircleIcon
            onClick={() => window.open(socialLinks.github, '_blank')}
            size={32}
          />
          <LinkedinBoxIcon
            onClick={() => window.open(socialLinks.linkedin, '_blank')}
            size={32}
          />
          <WebIcon
            onClick={() => window.open(socialLinks.website, '_blank')}
            size={32}
          />
        </div>
      </div>
    </Paper>
  )
}

OfficerCard.propTypes = {
  name: PropTypes.string.isRequired,
  funFacts: PropTypes.arrayOf(PropTypes.string),
  Image: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  classes: PropTypes.shape({}),
  socialLinks: PropTypes.shape({
    github: PropTypes.string.isRequired,
    linkedIn: PropTypes.string.isRequired,
    gmail: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
  }),
}

export default withStyles(styles, { withTheme: true })(OfficerCard)
