import React, { Component } from 'react'
import SideNavBar from '../components/layout/SideNavBar'
import Table from '../components/layout/TableView'

const columns = ['ID', 'Name', 'Email', 'Paying', 'Events Attended']
const data = []

export class ConsoleOfficers extends Component {
  render() {
    return (
      <div>
        <SideNavBar>
          <Table tableType='Officers' data={data} columns={columns} />
        </SideNavBar>
      </div>
    )
  }
}

export default ConsoleOfficers
