import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import WhatWeDoContainer from 'containers/WhatWeDoContainer'
import UpComingEventCard from 'components/UpComingEventCard'
import ReadyToGetInvolved from 'components/ReadyToGetInvolved'

const styles = (theme) => ({
  title: {
    color: 'white',
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      fontSize: '4em',
    },
  },
})

function Title({ title, classes }) {
  return <h1 className={classes.title}>{title}</h1>
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
