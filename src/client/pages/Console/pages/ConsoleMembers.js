import React, { Component } from 'react'
import SideNavBar from '../components/layout/SideNavBar'
import Table from '../components/layout/TableView'

const bodyStyle = {
  backgroundColor: 'white',
}

const columns = ['ID', 'Name', 'Email', 'Paying', 'Events Attended']
const data = []

export class ConsoleMembers extends Component {
  render() {
    return (
      <div style={bodyStyle}>
        <SideNavBar>
          <Table tableType='Members' data={data} columns={columns} />
        </SideNavBar>
      </div>
    )
  }
}

export default ConsoleMembers
