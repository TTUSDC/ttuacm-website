export default function styles(theme) {
  return {
    Image: {
      width: '95%',
      height: 'auto',
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
      minHeight: '37vh',
      margin: '0 auto 2em',
      padding: 10,
      backgroundColor: 'white',
    },
    Title: {
      ...theme.typography.h4,
      [theme.breakpoints.up('sm')]: {
        ...theme.typography.h2,
        color: theme.palette.primary.main,
      },
      color: theme.palette.primary.main,
    },
    Text: {
      ...theme.typography.body1,
      [theme.breakpoints.up('md')]: {
        ...theme.typography.h5,
        color: '#333333',
      },
      color: '#333333',
      margin: '10px 0px',
    },
    Item: {
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      textAlign: 'left',
      margin: '10px 0px',
    },
    Tag: {
      ...theme.typography.body1,
      [theme.breakpoints.up('sm')]: {
        ...theme.typography.h5,
        color: theme.palette.primary.main,
      },
      color: theme.palette.primary.main,
      textTransform: 'uppercase',
      cursor: 'pointer',
    },
  }
}
