import React, { Component } from 'react'
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
          <Dashboard />
        </SideBar>
      </div>
    )
  }
}

export default ConsoleBody
