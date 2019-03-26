import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { withWindowSize } from 'context/withWindowSize'
import { withStyles } from '@material-ui/core/styles'
import styles from './PageHeader.styles'

const PageHeader = ({
  title, info, color, classes,
}) => {
  const { height } = useContext(withWindowSize)

  return (
    <div className={classes.PageHeader} style={{ minHeight: height - 64, backgroundColor: color }}>
      <div><div className={classes.title}>{title}</div></div>
      <div><div className={classes.info}>{info}</div></div>
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
