export default function getStyle(theme, windowWidth, picture) {
  let textSize = theme.typography.h4
  let containerSize = '35vh'

  if (windowWidth < theme.breakpoints.values.sm) {
    textSize = theme.typography.h6
    containerSize = '30vh'
  }

  return {
    Container: {
      textAlign: 'center',
      height: containerSize,
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      backgroundSize: 'cover',
      padding: '0px 40px',
      backgroundImage: `url(${picture})`,
    },
    Button: {
      marginTop: 35,
    },
    Text: {
      ...textSize,
      color: 'white',
      fontWeight: 'bold',
    },
  }
}
