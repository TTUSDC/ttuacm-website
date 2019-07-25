import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core'
import NumberOfMembers from './PieChart'

export default function Dashboard() {
  return (
    <div className='dashboard'>
      <Grid container spacing={24}>
        <Grid item xs={6}>
          <Paper
            style={{
              padding: 16 * 2,
              textAlign: 'center',
              backgroundColor: 'white',
            }}
          >
            <NumberOfMembers percentage={100} totalMembers={300} />
            <Typography variant='h3' style={{ color: 'black' }}>
              ACM Members
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            style={{
              padding: 16 * 2,
              textAlign: 'center',
              backgroundColor: 'white',
            }}
          >
            <NumberOfMembers percentage={40} totalMembers={300} />
            <Typography variant='h3' style={{ color: 'black' }}>
              ACM Paying Members
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
