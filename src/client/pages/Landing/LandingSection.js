import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import WhatWeDoContainer from './WhatWeDoContainer'
import UpComingEventCard from './UpComingEventCard'
import ReadyToGetInvolved from './ReadyToGetInvolved'

const styles = (theme) => ({
  title: {
    [theme.breakpoints.up('md')]: {
      ...theme.typography.h2,
      fontWeight: 'bold',
    },
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 20,
  },
})

function Title({ title, classes }) {
  return (
    <Typography variant='h4' className={classes.title}>
      {title}
    </Typography>
  )
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  classes: PropTypes.shape({}),
}

function Content({ content }) {
  return <div style={{ color: 'white' }}>{content}</div>
}

Content.propTypes = {
  content: PropTypes.node.isRequired,
}

function LandingSection({ classes }) {
  return [
    <Title classes={classes} key={1} title='UPCOMING EVENT' />,
    <Content key={2} content={<UpComingEventCard />} />,
    <Title classes={classes} key={3} title='WHAT WE DO' />,
    <Content key={4} content={<WhatWeDoContainer />} />,
    <Title classes={classes} key={5} title='READY TO GET INVOLVED?' />,
    <Content key={6} content={<ReadyToGetInvolved />} />,
  ]
}

export default withStyles(styles)(LandingSection)
