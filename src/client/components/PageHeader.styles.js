export default function getStyles(theme, windowWidth, windowHeight, color) {
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
