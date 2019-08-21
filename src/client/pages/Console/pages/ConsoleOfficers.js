import React, { Component } from 'react'
import axios from 'axios'
import SideNavBar from '../components/layout/SideNavBar'
import Table from '../components/layout/TableView'

const bodyStyle = {
  backgroundColor: 'white',
}

export class ConsoleOfficers extends Component {
  state = {
    columns: ['Name', 'Email', 'isActive'],
    data: [],
    hasErrors: false,
  }

  componentWillMount() {
    this.fetchData()
  }

  fetchData() {
    axios
      .get(
        'https://us-central1-acm-texas-tech-web-app-2-dev.cloudfunctions.net/api/members',
      )
      .then((response) => {
        if (response.status === 200 && response != null) {
          response.data = response.data.filter(
            (member) => member.isOfficer === 'Yes',
          )
          console.log(response.data)
          this.setState({ data: response.data })
        } else {
          throw new Error('Empty data')
        }
      })
      .catch((error) => {
        console.log(error)
        this.setState({ hasErrors: true })
      })
  }

  render() {
    return (
      <div style={bodyStyle}>
        <SideNavBar>
          <Table
            tableType='Officers'
            data={this.state.data.map((object) => [
              object.name,
              object.email,
              object.isActive,
            ])}
            columns={this.state.columns}
            error={this.state.hasErrors}
          />
        </SideNavBar>
      </div>
    )
  }
}

export default ConsoleOfficers
