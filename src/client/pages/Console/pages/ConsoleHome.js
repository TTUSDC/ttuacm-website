import React, { Component } from 'react'
import { Grid, Typography } from '@material-ui/core'
import SideBar from '../components/layout/SideNavBar'
import Dashboard from '../components/dashboard/Dashboard'

const bodystyle = {
  backgroundColor: 'white',
}
export class ConsoleBody extends Component {
  render() {
    return (
      <div style={bodystyle}>
        <SideBar>
          <Grid container spacing={12}>
            <Grid item xs={4} />
            <Grid item xs={4} style={{ padding: 10 }}>
              <Typography
                variant='h2'
                style={{ color: 'black', textEmphasis: 'true' }}
              >
                Dashboard
              </Typography>
            </Grid>
            <Grid item xs={4} />
          </Grid>
          <Dashboard />
        </SideBar>
      </div>
    )
  }
}

export default ConsoleBody
