import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@material-ui/styles'
import useWindowSize from 'hooks/useWindowSize'
import createStyles from './PageHeader.styles'

const PageHeader = ({
  title, info, color,
}) => {
  const theme = useTheme()
  const { width, height } = useWindowSize()

  const classes = createStyles(theme, width, height, color)

  return (
    <div style={classes.PageHeader}>
      <div><div style={classes.title}>{title}</div></div>
      <div><div style={classes.info}>{info}</div></div>
    </div>
  )
}

PageHeader.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  info: PropTypes.string,
}

PageHeader.defaultProps = {
  color: '#253F51',
}

export default PageHeader
