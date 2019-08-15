import React, { Component } from 'react'
import SideNavBar from '../components/layout/SideNavBar'
import TableView from '../components/layout/TableView'

const bodyStyle = {
  backgroundColor: 'white',
}

export class ConsoleMembers extends Component {
  render() {
    return (
      <div style={bodyStyle}>
        <SideNavBar>
          <TableView />
        </SideNavBar>
      </div>
    )
  }
}

export default ConsoleMembers
