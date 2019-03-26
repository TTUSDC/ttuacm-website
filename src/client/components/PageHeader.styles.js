export default function styles(theme) {
  return {
    PageHeader: {
      display: 'flex',
      color: 'white',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      textAlign: 'center',
    },
    title: {
      ...theme.typography.h2,
      [theme.breakpoints.down('xs')]: {
        ...theme.typography.h4,
      },
      fontWeight: 'bold',
    },
    info: {
      ...theme.typography.h6,
      width: '61%',
      [theme.breakpoints.down('xs')]: {
        ...theme.typography.body2,
        width: '80%',
      },
      display: 'flex',
      margin: 'auto',
      textAlign: 'center',
      justifyContent: 'center',
      wordWrap: 'break-word',
    },
  }
}
