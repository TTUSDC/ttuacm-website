import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core'
import NumberOfMembers from './PieChart'

const paperStyle = {
  padding: 16 * 2,
  textAlign: 'center',
  backgroundColor: 'white',
  boxShadow: 'none',
}

export default function Dashboard() {
  return (
    <div className='dashboard'>
      <Grid container spacing={24}>
        <Grid item xs={6}>
          <Paper style={paperStyle}>
            <NumberOfMembers percentage={100} totalMembers={300} />
            <div className='progressBar' style={{ paddingTop: 30 }}>
              <Typography
                variant='h6'
                style={{ color: 'black', textEmphasis: 'true' }}
              >
                ACM Members
              </Typography>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper style={paperStyle}>
            <NumberOfMembers percentage={40} totalMembers={300} />
            <div className='progressBar' style={{ paddingTop: 30 }}>
              <Typography
                variant='h6'
                style={{ color: 'black', textEmphasis: 'true' }}
              >
                ACM Paying Members
              </Typography>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
