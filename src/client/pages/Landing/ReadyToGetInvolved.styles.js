export default function styles(theme) {
  return {
    Container: {
      textAlign: 'center',
      height: '35vh',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      backgroundSize: 'cover',
      padding: '0px 40px',
      [theme.breakpoints.down('xs')]: {
        height: '30vh',
      },
    },
    Button: {
      marginTop: 35,
    },
    Text: {
      ...theme.typography.h4,
      [theme.breakpoints.down('xs')]: {
        ...theme.typography.h6,
      },
      color: 'white',
      fontWeight: 'bold',
    },
  }
}
