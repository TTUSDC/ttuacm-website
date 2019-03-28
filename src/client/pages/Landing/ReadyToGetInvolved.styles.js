export default function styles(theme) {
  return {
    Container: {
      textAlign: 'center',
      minHeight: '35vh',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      backgroundSize: 'cover',
      padding: '30px 40px',
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
