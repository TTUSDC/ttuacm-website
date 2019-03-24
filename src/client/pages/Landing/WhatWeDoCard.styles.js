export default function getStyles(theme, width, align) {
  let titleSize = theme.typography.h4
  let textSize = theme.typography.body1
  let imageSize = 100

  if (width > theme.breakpoints.values.sm) {
    titleSize = theme.typography.h2
    textSize = theme.typography.h6
    imageSize = 150
  }

  if (width > theme.breakpoints.values.md) {
    imageSize = 200
  }

  if (width > theme.breakpoints.values.lg) {
    imageSize = 300
  }

  const curr = {
    Image: {
      width: imageSize,
      height: imageSize,
    },
    ImageGrid: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#E9EBED',
    },
    Card: {
      display: 'flex',
      flexDirection: 'row',
      flexFlow: 'row',
      alignItems: 'stretch',
      width: '86vw',
      height: '37vh',
      margin: '0 auto 2em',
      padding: 10,
      backgroundColor: 'white',
    },
    Title: {
      ...titleSize,
      color: '#D63333',
    },
    Text: {
      ...textSize,
      color: '#333333',
      margin: '10px 0px',
    },
    Item: {
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      textAlign: 'left',
      padding: 25,
    },
    Tag: {
      ...textSize,
      color: '#D63333',
      textTransform: 'uppercase',
    },
    Container: {
      justifyContent: 'space-between',
    },
  }

  return curr
}
