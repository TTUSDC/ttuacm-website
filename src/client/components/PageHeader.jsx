import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { withWindowSize } from 'context/withWindowSize'
import { withStyles } from '@material-ui/core/styles'
import Desert from 'assets/shared/desert.png'
import DesertNight from 'assets/shared/desert-night.png'
import styles from './PageHeader.styles'

const PageHeader = ({ title, info, color, classes }) => {
  const { height } = useContext(withWindowSize)
  const time = new Date().getHours()
  let backgound = Desert

  if (time < 6 || time > 18) backgound = DesertNight

  return (
    <div
      className={classes.PageHeader}
      style={{
        minHeight: height - 64,
        backgroundImage: `url(${backgound})`,
        backgroundColor: color,
      }}
    >
      <div className={classes.title}>{title}</div>
      <div className={classes.info}>{info}</div>
    </div>
  )
}

PageHeader.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  info: PropTypes.string,
  classes: PropTypes.shape({}),
}

PageHeader.defaultProps = {
  color: '#253F51',
}

export default withStyles(styles, { withTheme: true })(PageHeader)
