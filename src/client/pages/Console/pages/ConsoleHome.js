import React, { Component } from 'react'
import { Typography } from '@material-ui/core'
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
          <Typography
            variant='h2'
            style={{
              color: 'black',
              textEmphasis: 'true',
              textAlign: 'center',
              padding: 25,
            }}
          >
            Dashboard
          </Typography>
          <Dashboard />
        </SideBar>
      </div>
    )
  }
}

export default ConsoleBody
