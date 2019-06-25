import React from 'react'
import PropTypes from 'prop-types'
import useWindowSize from 'client/services/withWindowSize'
import { withStyles } from '@material-ui/core/styles'
import Desert from 'client/assets/shared/desert.png'
import DesertNight from 'client/assets/shared/desert-night.png'

const styles = (theme) => ({
  PageHeader: {
    display: 'flex',
    color: 'white',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'bottom',
  },
  title: {
    ...theme.typography.h2,
    [theme.breakpoints.down('xs')]: {
      ...theme.typography.h4,
    },
    fontWeight: 'bold',
    width: '70%',
  },
  info: {
    ...theme.typography.h6,
    width: '61%',
    [theme.breakpoints.down('xs')]: {
      ...theme.typography.body2,
      width: '80%',
    },
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    wordWrap: 'break-word',
  },
})

const PageHeader = ({ title, info, classes }) => {
  const { width, height } = useWindowSize()
  const time = new Date().getHours()
  let backgound = Desert

  if (time < 6 || time > 18) backgound = DesertNight

  const headerSizeReduction = width > 600 ? 44 : 118

  return (
    <div
      className={classes.PageHeader}
      style={{
        minHeight: height - headerSizeReduction,
        backgroundImage: `url(${backgound})`,
      }}
    >
      <div className={classes.title}>{title}</div>
      <div className={classes.info}>{info}</div>
    </div>
  )
}

PageHeader.propTypes = {
  title: PropTypes.string,
  info: PropTypes.string,
  classes: PropTypes.shape({}),
}

export default withStyles(styles, { withTheme: true })(PageHeader)
