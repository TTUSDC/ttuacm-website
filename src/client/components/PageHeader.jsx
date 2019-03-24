import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@material-ui/styles'
import useWindowSize from 'hooks/useWindowSize'

const getStyles = (theme, windowWidth, windowHeight, color) => {
  let titleSize = theme.typography.h2
  let infoSize = theme.typography.h6
  let infoWidth = '61%'

  if (windowWidth < theme.breakpoints.values.sm) {
    titleSize = theme.typography.h4
    infoSize = theme.typography.body2
    infoWidth = '80%'
  }

  const curr = {
    PageHeader: {
      display: 'flex',
      color: 'white',
      width: '100%',
      minHeight: windowHeight - 64,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      textAlign: 'center',
      backgroundColor: color,
    },
    title: {
      ...titleSize,
      fontWeight: 'bold',
    },
    info: {
      ...infoSize,
      display: 'flex',
      width: infoWidth,
      margin: 'auto',
      textAlign: 'center',
      justifyContent: 'center',
      wordWrap: 'break-word',
    },
  }

  return curr
}

const PageHeader = ({
  title, info, color,
}) => {
  const theme = useTheme()
  const { width, height } = useWindowSize()

  const classes = getStyles(theme, width, height, color)

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
