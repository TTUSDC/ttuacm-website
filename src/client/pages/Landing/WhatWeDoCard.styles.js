const imageSize = {
  xs: 100,
  sm: 150,
  md: 200,
  lg: 300,
}

export default function styles(theme) {
  return {
    Image: {
      width: imageSize.xs,
      height: imageSize.xs,
      [theme.breakpoints.up('md')]: {
        width: imageSize.lg,
        height: imageSize.lg,
      },
      [theme.breakpoints.up('sm')]: {
        width: imageSize.md,
        height: imageSize.md,
      },
      [theme.breakpoints.up('xs')]: {
        width: imageSize.sm,
        height: imageSize.sm,
      },
      [theme.breakpoints.down('xs')]: {
        width: imageSize.xs,
        height: imageSize.xs,
      },
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
      ...theme.typography.h4,
      color: '#D63333',
    },
    Text: {
      ...theme.typography.body1,
      color: '#333333',
      margin: '10px 0px',
    },
    Item: {
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      textAlign: 'left',
    },
    Tag: {
      ...theme.typography.body1,
      color: '#D63333',
      textTransform: 'uppercase',
    },
  }
}
